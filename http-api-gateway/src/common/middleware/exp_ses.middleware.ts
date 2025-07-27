import * as session from 'express-session';

export function sessionMiddleware() {
  return session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  });
}
