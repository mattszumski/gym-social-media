import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

export default (passport) => {
  passport.use(
    new JwtStrategy(options, async function (payload, done) {
      try {
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
