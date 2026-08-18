import type { Request, Response } from "express";
import { User } from "../models/User.ts";
import bcrypt from "bcrypt";

export async function register(req: Request, res: Response): Promise<void> {
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

    //Check if email is available
    const emailInUse = await User.findOne({ email });

    if (emailInUse) {
      res.status(400).json({ success: false, error: "Email already in use" });
    }

    // Check if username is available
    const usernameInUse = await User.findOne({ username });
    if (usernameInUse) {
      res
        .status(400)
        .json({ success: false, error: "Username already in use" });
    }

    //Encrypt passwword
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      data: { userId: user._id, username: user.username },
    });
  } catch (error) {}
  console.log(req.body);
}

/* 
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
*/
