const API_URL = import.meta.env.VITE_API_URL;
export async function register(
  fullName: string,
  username: string,
  email: string,
  password: string,
) {
  //const emailRegex =
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:(?:\\[\x00-\x7F]|[^\\"]))*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:\d{1,3}\.){3}\d{1,3}\]))$/;

  //Check if all fields are filled
  if (
    fullName.trim() === "" ||
    username.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return {
      success: false,
      error: "All fields are required",
    };
  }

  //Check password length
  if (password.trim().length <= 8) {
    return {
      success: false,
      error: "Password must be longer than 8 characters",
    };
  }

  //Check password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      success: false,
      error: "Password must contain at least one uppercase letter",
    };
  }

  //Check password contains at least one number
  if (!/[0-9]/.test(password)) {
    return {
      success: false,
      error: "Password must contain at least one number",
    };
  }

  try {
    //response object
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, username, email, password }),
      credentials: "include",
    });

    //parse to json
    const res = await response.json();

    if (res.success) {
      return { success: true, data: res.data };
    } else {
      return { success: false, error: res.error };
    }
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Error registering, probably failed to contact server",
    };
  }
}
