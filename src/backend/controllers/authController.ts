import type { Request, Response } from "express";
import { User } from "../models/User";

interface Props {
  req: Request;
  res: Response;
}

export async function register({ req, res }: Props): Promise<void> {
  try {
    const { fullName, username, email, password } = req.body;

    //All fields required

    if (!fullName || !username || !email || !password) {
      res
        .status(400)
        .json({ success: false, error: "All fields are required" });
      return;
    }

    //Fullname must be a string of letters and not less than 2 characters

    if (typeof fullName !== "string" || fullName.trim().length < 2) {
      res.status(400).json({
        success: false,
        error: "Fullname must be less than 2 characters",
      });
      return;
    }

    //Username must be string and at least 2 characters

    if (typeof username !== "string" || username.trim().length < 2) {
      res.status(400).json({
        success: false,
        error: "Fullname must be less than 2 characters",
      });
      return;
    }

    //Email must properly fulfill email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, error: "Invalid email format" });
      return;
    }

    //password must be returned as a string and at least 8 charcters
    if (typeof password !== "string" || password.length < 8) {
      res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters",
      });
      return;
    }

    //Check if user exists

    //Encrypt passwword

    //Create user
  } catch (error) {}
  console.log(req.body);
}
export async function login({ req, res }: Props): Promise<void> {
  try {
  } catch (error) {}
  console.log(req.body);
}
export async function logout({ req, res }: Props): Promise<void> {
  try {
  } catch (error) {}
  console.log(req.body);
}
