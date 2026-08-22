# Driev Coaching

**Driev Coaching lets World of Warcraft players browse coaching services and request one-on-one sessions, and gives the coach a single place to review, confirm and manage every booking.**

Live at [coaching.driev.dev](https://coaching.driev.dev).

Players sign up, pick a service (VOD review, live raid coaching, UI and macro help, and so on), propose a time and add context for the coach. The coach signs in as an admin and works through the incoming requests, moving each one between pending, confirmed, completed and cancelled, and can add or remove the services on offer without touching any code.

---

## Stack

| Layer    | Technology                                                |
| -------- | --------------------------------------------------------- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, React Router |
| Backend  | Express 5, TypeScript, Mongoose                           |
| Database | MongoDB                                                   |
| Auth     | JWT in an httpOnly cookie, bcrypt password hashing        |

The backend TypeScript is **not compiled**. It runs directly on Node using native type stripping, which is why imports carry explicit `.ts` extensions.

---

## Requirements

- **Node 22.18 or newer** (24 recommended) — required for running the backend's TypeScript without a build step
- A MongoDB instance you can connect to

Check your version:

```bash
node --version
```

---

## Setup

### 1. Clone and install

```bash
git clone <repo-url>
```

```bash
cd Coaching.Driev.dev && npm install
```

If `bcrypt` fails to build, install the toolchain it needs (`build-essential` and `python3` on Debian/Ubuntu, Build Tools for Visual Studio on Windows) and run `npm install` again.

### 2. Create `.env` in the project root

This holds the backend secrets and is gitignored.

```
DB_HOST=127.0.0.1
DB_PORT=27017
DB_USER=your-mongo-user
DB_PWD=your-mongo-password
DB_NAME=DrievDEV
PORT=5000
NODE_ENV=development
JWT_SECRET=any-long-random-string
```

Generate a secret with:

```bash
openssl rand -hex 32
```

`NODE_ENV=production` makes the auth cookie `Secure`, so leave it as `development` when running over plain HTTP locally.

### 3. Check the frontend environment files

`.env.development` and `.env.production` are committed and should already be correct:

```
VITE_DEV=true
VITE_API_URL=http://localhost:5000
```

Vite only exposes variables prefixed with `VITE_` to the browser, which is why the backend secrets live in a separate file.

### 4. Seed the database

```bash
npm run seed
```

This creates 5 services, 5 users and 8 bookings spread across every status, with dates either side of today so both the upcoming and past session lists have content.

> **This wipes the `users`, `services` and `bookings` collections first.** It points at whatever `DB_HOST` your `.env` names, so never run it against a database with real data you want to keep.

The script prints the admin login when it finishes. Change that password after signing in.

### 5. Run it

```bash
npm run concurrent
```

Frontend on `http://localhost:5173`, API on `http://localhost:5000`.

---

## Scripts

| Command               | What it does                                     |
| --------------------- | ------------------------------------------------ |
| `npm run concurrent`  | Frontend and backend together                    |
| `npm run dev`         | Vite dev server only                             |
| `npm run dev:backend` | Express API only, with reload on change          |
| `npm run seed`        | Reset and repopulate the database                |
| `npm run build`       | Type-check and build the frontend for production |
| `npm run lint`        | ESLint                                           |

---

## Project structure

One repository holds both halves of the app.

```
src/
├── backend/
│   ├── config/         database connection options
│   ├── controllers/    request handlers
│   ├── middleware/     JWT verification, role checks
│   ├── models/         Mongoose schemas
│   ├── routes/         Express routers
│   ├── services/       database connection
│   ├── seed.ts         seed script
│   └── server.ts       entry point
└── frontend/
    ├── components/     shared UI (buttons, inputs)
    ├── context/        auth context
    ├── features/       one folder per page
    ├── hooks/
    └── layouts/        navbar, footer
```

Each feature folder follows the same shape — `index.tsx` for the page shell, `components/` for the UI, `backend/` for the `fetch` wrappers that talk to the API.

The backend follows **Router → Controller → Model**: a router maps a path to a controller, the controller validates input and talks to a Mongoose model, and the model owns the schema and its validation.

---

## Data model

Three collections, related by `ObjectId` reference.

```
users                    services
  _id ◄──────┐             _id ◄──────┐
  fullName   │             name       │
  username   │             slug       │
  email      │             description│
  password   │             deliverables
  role       │             priceSek   │
             │             durationMinutes
             │             active     │
             │             displayOrder
             │                        │
          bookings                    │
            _id                       │
            userId ───────────────────┘ (ref: User)
            serviceId ────────────────── (ref: Service)
            requestedTime
            status        pending | confirmed | cancelled | completed
            notes
```

A booking stores only the _ids_ of its user and service. Names and prices are read back with `.populate()` at query time, so renaming a service can never leave old bookings showing a stale name.

---

## API

All paths are prefixed with `/api`. Authenticated routes read a JWT from an httpOnly cookie; admin routes additionally require `role: "admin"`.

### Auth

| Method | Path             | Access | Purpose                  |
| ------ | ---------------- | ------ | ------------------------ |
| POST   | `/auth/register` | public | Create an account        |
| POST   | `/auth/login`    | public | Sign in, sets the cookie |
| POST   | `/auth/logout`   | public | Clears the cookie        |
| GET    | `/auth/me`       | user   | The signed-in user       |

### Services

| Method | Path              | Access | Purpose             |
| ------ | ----------------- | ------ | ------------------- |
| GET    | `/services`       | public | All active services |
| GET    | `/services/:slug` | public | One service         |
| POST   | `/services`       | admin  | Create a service    |
| DELETE | `/services/:id`   | admin  | Remove a service    |

### Bookings

| Method | Path             | Access     | Purpose                                   |
| ------ | ---------------- | ---------- | ----------------------------------------- |
| POST   | `/booking`       | user       | Request a session                         |
| GET    | `/booking/me`    | user       | Own bookings, service populated           |
| GET    | `/booking/stats` | user       | Aggregated stats for the signed-in user   |
| GET    | `/booking/all`   | admin      | Every booking, user and service populated |
| PATCH  | `/booking/:id`   | admin      | Change status                             |
| DELETE | `/booking/:id`   | user/admin | Remove — own booking, or any if admin     |

### Users

| Method | Path               | Access | Purpose        |
| ------ | ------------------ | ------ | -------------- |
| GET    | `/users/:username` | public | Public profile |

### Example — create a booking

`POST /api/booking`

```json
{
  "serviceSlug": "vod-review",
  "requestedTime": "2026-09-14T18:00:00.000Z",
  "notes": "Ragnaros attempt from Tuesday, I keep dying to Sons."
}
```

`201 Created`

```json
{
  "success": true,
  "data": {
    "_id": "66f1c2a4e3b1c40012a8f9d2",
    "userId": "66f1b0f1e3b1c40012a8f9c1",
    "serviceId": "66f1b0f1e3b1c40012a8f9b7",
    "requestedTime": "2026-09-14T18:00:00.000Z",
    "status": "pending",
    "notes": "Ragnaros attempt from Tuesday, I keep dying to Sons."
  }
}
```

The service is identified by its slug, not its id — the slug is what appears in the booking URL. The server resolves it to a real service and rejects an unknown one with `404`, so the client can never invent a service.

### Example — booking statistics

`GET /api/booking/stats`

```json
{
  "success": true,
  "data": {
    "total": 12,
    "byStatus": {
      "pending": 2,
      "confirmed": 3,
      "cancelled": 1,
      "completed": 6
    },
    "byService": [
      { "serviceType": "VOD Review", "count": 7 },
      { "serviceType": "Hands-On Session", "count": 5 }
    ]
  }
}
```

Built with a single MongoDB aggregation: `$match` narrows to the signed-in user, `$facet` runs the total, per-status and per-service pipelines over those documents in one round trip, and `$lookup` resolves service ids to names.

### Errors

Failures return a consistent JSON body:

```json
{ "success": false, "error": "Username already in use" }
```

| Code | Meaning                              |
| ---- | ------------------------------------ |
| 400  | Invalid or missing input             |
| 401  | Not signed in, or an expired token   |
| 403  | Signed in but lacking the role       |
| 404  | Not found                            |
| 409  | Conflicts with something that exists |
| 500  | Server error                         |

---

## Authentication

Signing in returns a JWT in an **httpOnly** cookie, so JavaScript cannot read it and the token is not exposed to XSS. Every request from the frontend sends `credentials: "include"` so the browser attaches it.

The token carries the user's id, username and role. `authenticate` verifies it and attaches the payload to the request; `requireRole("admin")` then checks the role on admin-only routes. Because the role is baked into the token, changing someone's role in the database takes effect the next time they sign in.

Passwords are hashed with bcrypt and never returned by any endpoint.
