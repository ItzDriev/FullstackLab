const API_URL = import.meta.env.VITE_API_URL;

export async function login(username: string, password: string) {
  //Check that all fields are filled
  if (username.trim() === "" || password.trim() === "") {
    return { success: false, error: "All fields are required" };
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
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
