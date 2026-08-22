const API_URL = import.meta.env.VITE_API_URL;
export async function createBooking(
  serviceType: string,
  requestedTime: string,
  notes?: string,
) {
  try {
    const response = await fetch(`${API_URL}/api/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceType, requestedTime, notes }),
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

export async function fetchMyBookings() {
  try {
    const response = await fetch(`${API_URL}/api/booking/me`, {
      method: "GET",
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
