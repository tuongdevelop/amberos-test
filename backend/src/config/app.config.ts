import 'dotenv/config';
export const appConfig = {
  port: process.env.PORT || 5001,
  jwt: { secret: process.env.JWT_SECRET!, expiresIn: process.env.JWT_EXPIRES_IN! },
};
