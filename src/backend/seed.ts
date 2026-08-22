import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { connectDB } from "./services/DBConnection.ts";
import { User } from "./models/User.ts";
import { Service } from "./models/Service.ts";
import { Booking } from "./models/Booking.ts";

const services = [
  {
    name: "VOD Review",
    slug: "vod-review",
    description:
      "In-depth analysis of your recorded gameplay. Will identify critical mistakes in positioning, cooldown usage and general awareness that are holding you back.",
    deliverables: [
      "Timestamped Actionable Feedback",
      "Keybind Feedback",
      "Written Summary & Goals",
    ],
    priceSek: 350,
    durationMinutes: 60,
    displayOrder: 1,
  },
  {
    name: "Hands-On Session",
    slug: "hands-on-session",
    description:
      "Real-time guidance during a live raid. We will focus on applying proper fundamentals and adapting to whats happening in the raid.",
    deliverables: [
      "Voice Comms During Raid",
      "Live Feedback",
      "Post Session Q&A",
    ],
    priceSek: 600,
    durationMinutes: 180,
    displayOrder: 2,
  },
  {
    name: "Macro & UI Assistance",
    slug: "macro-ui-assistance",
    description:
      "I will help you setup your UI, Macros and Keybinds in accordance to your wishes, as well as provide suggestions for what I think could be changed.",
    deliverables: [
      "Addon Recommendations & Setup",
      "Keybind Feedback",
      "Macro Guide",
    ],
    priceSek: 250,
    durationMinutes: 45,
    displayOrder: 3,
  },
  {
    name: "Gear & Stat Optimisation",
    slug: "gear-stat-optimisation",
    description:
      "A full pass over your current gear, enchants and consumables. We work out which upgrades are actually worth chasing for your spec and raid role.",
    deliverables: [
      "Best-in-Slot Path",
      "Enchant & Consumable Checklist",
      "Stat Weight Explanation",
    ],
    priceSek: 300,
    durationMinutes: 45,
    displayOrder: 4,
  },
  {
    name: "Warrior Fundamentals",
    slug: "warrior-fundamentals",
    description:
      "A structured walkthrough of Warrior rotation, rage management and tank swapping. Built for players who want the reasoning, not just a rotation to copy.",
    deliverables: [
      "Rotation Priority Breakdown",
      "Rage Management Drills",
      "Follow-Up Homework",
    ],
    priceSek: 450,
    durationMinutes: 90,
    displayOrder: 5,
  },
];

const users = [
  {
    fullName: "Anton Andersson",
    username: "Driev",
    email: "anton@driev.dev",
    password: "TempPass123",
    role: "admin" as const,
  },
  {
    fullName: "Marcus Lindqvist",
    username: "Thundergut",
    email: "marcus.lindqvist@gmail.com",
    password: "RaidNight88",
    role: "user" as const,
  },
  {
    fullName: "Sofia Bergström",
    username: "Sofsy",
    email: "sofia.bergstrom@outlook.com",
    password: "NaxxClear41",
    role: "user" as const,
  },
  {
    fullName: "Erik Nilsson",
    username: "Bonkzz",
    email: "erik.nilsson@hotmail.com",
    password: "ArmsWarrior7",
    role: "user" as const,
  },
  {
    fullName: "Jonas Falk",
    username: "Grimfang",
    email: "jonas.falk@gmail.com",
    password: "Shockadin55",
    role: "user" as const,
  },
];

//Offsets in days from today, so seeded data always straddles "now"
const bookingPlan = [
  {
    user: "Thundergut",
    service: "vod-review",
    days: 4,
    status: "confirmed",
    notes: "Ragnaros attempt from Tuesday, I keep dying to Sons.",
  },
  {
    user: "Thundergut",
    service: "warrior-fundamentals",
    days: -12,
    status: "completed",
    notes: "Wanted to understand rage dumping better.",
  },
  {
    user: "Sofsy",
    service: "hands-on-session",
    days: 9,
    status: "pending",
    notes: "First time main tanking Naxx, very nervous about Patchwerk.",
  },
  {
    user: "Sofsy",
    service: "macro-ui-assistance",
    days: -3,
    status: "completed",
  },
  {
    user: "Bonkzz",
    service: "gear-stat-optimisation",
    days: 2,
    status: "confirmed",
    notes: "Sitting on two trinkets and no idea which to use.",
  },
  {
    user: "Bonkzz",
    service: "vod-review",
    days: -20,
    status: "cancelled",
    notes: "Had to reschedule, guild raid got moved.",
  },
  { user: "Grimfang", service: "vod-review", days: 6, status: "pending" },
  {
    user: "Grimfang",
    service: "hands-on-session",
    days: -30,
    status: "completed",
    notes: "Loatheb strat walkthrough.",
  },
];

function daysFromNow(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(19, 0, 0, 0);
  return d;
}

async function seed(): Promise<void> {
  await connectDB();

  console.log("Clearing existing documents...");
  await Promise.all([
    User.deleteMany({}),
    Service.deleteMany({}),
    Booking.deleteMany({}),
  ]);

  console.log("Inserting services...");
  const createdServices = await Service.insertMany(services);
  const serviceBySlug = new Map(createdServices.map((s) => [s.slug, s]));

  console.log("Inserting users...");
  const createdUsers = await User.insertMany(
    await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10),
      })),
    ),
  );
  const userByName = new Map(createdUsers.map((u) => [u.username, u]));

  console.log("Inserting bookings...");
  const bookings = bookingPlan.map((b) => ({
    userId: userByName.get(b.user)!._id,
    serviceId: serviceBySlug.get(b.service)!._id,
    requestedTime: daysFromNow(b.days),
    status: b.status,
    notes: b.notes,
  }));
  await Booking.insertMany(bookings);

  console.log(
    `Done. ${createdServices.length} services, ${createdUsers.length} users, ${bookings.length} bookings.`,
  );
  //Read straight off the seed data so this can never go stale
  const admin = users.find((u) => u.role === "admin");
  if (admin) {
    console.log(`Admin login: ${admin.username} / ${admin.password}`);
  }

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
