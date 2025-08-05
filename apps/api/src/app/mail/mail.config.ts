import { MailerOptions } from "@nestjs-modules/mailer";

import {
  SMTP_APP_NAME,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
} from "./mail.constants";

export const mailConfig: MailerOptions = {
  transport: {
    host: SMTP_HOST,
    port: +SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  },
  defaults: {
    from: `"${SMTP_APP_NAME}" <${SMTP_USER}>`,
  },
};
