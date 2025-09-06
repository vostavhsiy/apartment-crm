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
        "group rounded-full grayscale-100 hover:grayscale-0",
        props.className,
      )}
    >
      <Link href={getLink()} target="_blank">
        {linkType === "whatsapp" && <WhatsAppIcon className="size-6" />}
        {linkType === "telegram" && <TelegramIcon className="size-6" />}
        {linkType === "email" && (
          <Mail className="opacity-50 group-hover:opacity-100" />
        )}
      </Link>
    </Button>
  );
};
