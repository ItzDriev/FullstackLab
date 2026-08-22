const API_URL = import.meta.env.VITE_API_URL;

/*
  Shape of a booking as returned by GET /api/booking/all.
  userId is populated by the backend, so it arrives as an object
  rather than a bare id. It can be null if the user was removed.
*/
interface AdminBooking {
  _id: string;
  userId: {
    _id: string;
    username: string;
    fullName: string;
  } | null;
  serviceId: {
    _id: string;
    name: string;
    durationMinutes: number;
    priceSek: number;
  } | null;
  requestedTime: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
  createdAt: string;
}

export async function fetchAllBookings() {
  try {
    const response = await fetch(`${API_URL}/api/booking/all`, {
      method: "GET",
      credentials: "include",
    });
    const res = await response.json();
    if (res.success) {
      return { success: true, data: res.data as AdminBooking[] };
    } else {
      return { success: false, error: res.error };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to contact server" };
  }
}

export async function updateBookingStatus(bookingId: string, status: string) {
  try {
    const response = await fetch(`${API_URL}/api/booking/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
      credentials: "include",
    });
    const res = await response.json();
    if (res.success) {
      return { success: true, data: res.data as AdminBooking };
    } else {
      return { success: false, error: res.error };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to contact server" };
  }
}

export type { AdminBooking };

interface NewService {
  name: string;
  description: string;
  priceSek: number;
  durationMinutes: number;
  deliverables: string[];
}

export async function createService(service: NewService) {
  try {
    const response = await fetch(`${API_URL}/api/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
      credentials: "include",
    });
    const res = await response.json();
    if (res.success) {
      return { success: true, data: res.data };
    } else {
      return { success: false, error: res.error };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to contact server" };
  }
}

export type { NewService };

export async function deleteService(serviceId: string) {
  try {
    const response = await fetch(`${API_URL}/api/services/${serviceId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const res = await response.json();
    if (res.success) {
      return { success: true, data: res.data };
    } else {
      return { success: false, error: res.error };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to contact server" };
  }
}
