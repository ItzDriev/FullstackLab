import type { Request, Response } from "express";
import { User } from "../models/User.ts";
export async function getProfile(req: Request, res: Response) {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username }).select("username fullName");
    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }
    res.status(200).json({
      profile: {
        username: user.username,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
