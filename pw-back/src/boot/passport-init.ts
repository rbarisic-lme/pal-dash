import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { env } from '@/config.ts';
import { Express } from 'express-serve-static-core';

// Export the initialize function
export const initializeAuth = (app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());
  
  const jwtSecret = env.appSecret;

  // Set up a local strategy
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.appSecret,
  };

  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    // Verify admin credentials based on environment variables
    // In a future version, we can use a database.
    // HOWEVER, I'd like to use an as light as possible database,
    // so even server owners who don't want to install a DB can use PalDash
    if (jwt_payload.user === env.admin.username) {
      return done(null, { id: jwt_payload.sub, username: jwt_payload.sub });
    }

    return done(null, false);
  }));
}

// Generate a JWT token
export function generateToken(user: any): string {
  return jwt.sign({ user }, env.appSecret, { expiresIn: '2h' }); // Adjust the expiration time as needed
}
