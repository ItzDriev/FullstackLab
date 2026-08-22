import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/jwtMiddleware.ts";
import { User } from "../models/User.ts";
import JWTModel from "../models/JWT.ts";
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
      res.status(409).json({ success: false, error: "Email already in use" });
      return;
    }

    // Check if username is available
    const usernameInUse = await User.findOne({ username });
    if (usernameInUse) {
      res
        .status(409)
        .json({ success: false, error: "Username already in use" });
      return;
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

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    //Form checks
    if (!username || !password) {
      res
        .status(400)
        .json({ success: false, error: "Username and password are required" });
      return;
    }

    if (typeof username !== "string" || typeof password !== "string") {
      res.status(400).json({ success: false, error: "Invalid input format" });
      return;
    }

    const user = await User.findOne({ username });

    //Username check
    if (!user) {
      res
        .status(401)
        .json({ success: false, error: "Invalid username or password" });
      return;
    }

    //Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(401)
        .json({ success: false, error: "Invalid username or password" });
    }

    //Create the JWT

    const token = JWTModel.sign({
      userId: user._id,
      username: user.username,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      //Prevent production from sending cookie of https but allow it locally
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      //maxAge is in miliseconds so this is 24hrs
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Login failed" });
  }
}
export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
}

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;
    const user = await User.findById(userId).select("username role");

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      user: {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
}
