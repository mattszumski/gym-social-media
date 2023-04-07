import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { checkIfTokenOnBlacklist } from "../services/TokenService.js";
import { getBearerTokenFromReq } from "../utils/AuthUtils.js";
import { PassportStatic } from "passport";
import { Request } from "express";
import { VerifiedCallback } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  passReqToCallback: true,
};

export default (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, async function (req: Request, payload: any, done: VerifiedCallback) {
      try {
        const isExpired = await checkIfTokenOnBlacklist(getBearerTokenFromReq(req));
        if (isExpired) {
          return done(JSON.stringify({ success: false, reason: "expired" }), false);
        }
        return done(null, payload.userId);
      } catch (error) {
        console.log(error);
        done(error);
      }
    })
  );
};
