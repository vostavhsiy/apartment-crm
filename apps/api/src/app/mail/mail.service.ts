import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {}

  async sendMail(to: string, subject: string, html?: string): Promise<void> {
    try {
      const info = await this.mailer.sendMail({
        to,
        subject,
        html,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
