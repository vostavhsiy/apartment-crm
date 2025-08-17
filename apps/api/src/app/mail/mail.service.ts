import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name, { timestamp: true });

  constructor(private mailer: MailerService) {}

  async sendMail(to: string, subject: string, html?: string) {
    try {
      const info = await this.mailer.sendMail({
        to,
        subject,
        html,
      });
      return info;
    } catch (error) {
      this.logger.error("Send mail error:", error);
      throw new BadRequestException();
    }
  }
}
