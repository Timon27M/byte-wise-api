import { JwtUser } from "src/auth/types/jwt-user.type";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}
