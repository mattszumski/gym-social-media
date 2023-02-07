import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

export default (passport) => {
  passport.use(
    new JwtStrategy(options, function (payload, done) {
      //find user, by extracting id from token
      //check for db error
      //check if user exists
      //return error otherwise
    })
  );
};
