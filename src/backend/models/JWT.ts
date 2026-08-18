import jwt from "jsonwebtoken";

const JWTModel = {
  sign(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "24h" });
  },

  verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  },
};

export default JWTModel;
