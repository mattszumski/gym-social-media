import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { checkIfTokenOnBlacklist } from "../services/TokenService.js";
import { getBearerTokenFromReq } from "../utils/AuthUtils.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  passReqToCallback: true,
};

export default (passport) => {
  passport.use(
    new JwtStrategy(options, async function (req, payload, done) {
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

      //find user, by extracting id from token
      //check for db error
      //check if user exists
      //return error otherwise
    })
  );
};
