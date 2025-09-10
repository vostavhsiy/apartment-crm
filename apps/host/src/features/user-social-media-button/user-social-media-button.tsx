import { User } from "@/entities/user/model/user";
import { cn } from "@/shared/lib/utils";
import { Button, ButtonProps } from "@/shared/ui/button";
import { TelegramIcon } from "@/shared/ui/icons/telegram";
import { WhatsAppIcon } from "@/shared/ui/icons/whatsapp";
import { Mail } from "lucide-react";
import Link from "next/link";

import { FC } from "react";

interface Props extends ButtonProps {
  user: User;
  collectionLink: string;
  linkType: "whatsapp" | "telegram" | "email";
}

const getLinkMessage = (collectionLink: string) => {
  return `Здравствуйте, меня заинтересовало предложение объектов ${collectionLink}`;
};

export const UserSocialMediaButton: FC<Props> = ({
  user,
  collectionLink,
  linkType,
  ...props
}) => {
  const getLink = () => {
    const email = user.email;
    const phone = user.phone || "";
    const formattedPhone = phone[0] === "8" ? "+7" + phone.slice(1) : phone;
    const linkMessage = getLinkMessage(collectionLink);
    switch (linkType) {
      case "whatsapp":
        return `https://wa.me/${formattedPhone}`;
      case "telegram":
        return `https://t.me/${formattedPhone}`;
      case "email":
        return `mailto:${email}?subject=${encodeURIComponent("У вас новое сообщение по предложению")}&body=${encodeURIComponent(linkMessage)}`;
    }
  };

  return (
    <Button
      size="icon"
      variant="outline"
      asChild
      {...props}
      className={cn(
        "group max-md:w-full max-md:justify-start max-md:h-14 max-md:px-3 max-md:bg-muted max-md:border-none rounded-full md:grayscale-100 md:hover:grayscale-0",
        props.className,
      )}
    >
      <Link href={getLink()} target="_blank" className={cn("")}>
        <span className="max-md:flex max-md:items-center max-md:rounded-full max-md:size-9 max-md:border max-md:bg-background max-md:shadow-xs max-md:hover:bg-accent max-md:hover:text-accent-foreground max-md:dark:border-input max-md:dark:hover:bg-background/70 max-md:justify-center">
          {linkType === "whatsapp" && <WhatsAppIcon className="size-6" />}
          {linkType === "telegram" && <TelegramIcon className="size-6" />}
          {linkType === "email" && (
            <Mail className="md:opacity-50 md:group-hover:opacity-100" />
          )}
        </span>
        <span className="md:hidden">
          Написать {linkType === "whatsapp" && "в WhatsApp"}
          {linkType === "telegram" && "в Telegram"}
          {linkType === "email" && "на почту"}
        </span>
      </Link>
    </Button>
  );
};
