const API_URL = import.meta.env.VITE_API_URL;

interface Service {
  _id: string;
  name: string;
  slug: string;
  description: string;
  deliverables: string[];
  priceSek: number;
  durationMinutes: number;
}

export async function fetchServices() {
  try {
    const response = await fetch(`${API_URL}/api/services`, { method: "GET" });
    const res = await response.json();
    if (res.success) {
      return { success: true, data: res.data as Service[] };
    } else {
      return { success: false, error: res.error };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to contact server" };
  }
}

export async function fetchServiceBySlug(slug: string) {
  try {
    const response = await fetch(`${API_URL}/api/services/${slug}`, {
      method: "GET",
    });
    const res = await response.json();
    if (res.success) {
      return { success: true, data: res.data as Service };
    } else {
      return { success: false, error: res.error };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to contact server" };
  }
}

export type { Service };
