import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.LUCIA_AUTH_HOST}/signin/google/callback`
);
google.options({ auth: oauth2Client });
export const gmailClient = google.gmail("v1");
