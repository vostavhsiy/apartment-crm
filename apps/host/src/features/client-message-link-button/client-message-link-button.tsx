import { Button, ButtonProps } from "@/shared/ui/button";
import { TelegramIcon } from "@/shared/ui/icons/telegram";
import { WhatsAppIcon } from "@/shared/ui/icons/whatsapp";
import { Mail } from "lucide-react";
import Link from "next/link";

import { FC } from "react";

interface Props extends ButtonProps {
  phone: string;
  collectionLink: string;
  linkType: "whatsapp" | "telegram" | "email";
  message?: string;
}

const getLinkMessage = (collectionLink: string) => {
  return `Для Вас подготовлена презентация объектов недвижимости. Для просмотра перейдите по ссылке ${collectionLink}`;
};

export const ClientMessageLinkButton: FC<Props> = ({
  linkType,
  phone,
  collectionLink,
  message,
  ...props
}) => {
  const getLink = () => {
    const formattedPhone = phone[0] === "8" ? "+7" + phone.slice(1) : phone;
    const linkMessage = message || getLinkMessage(collectionLink);
    switch (linkType) {
      case "whatsapp":
        return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(linkMessage)}`;
      case "telegram":
        return `https://t.me/${formattedPhone}?text=${encodeURIComponent(linkMessage)}`;
      case "email":
        return `mailto:${formattedPhone}?subject=${encodeURIComponent("Презентация объектов недвижимости")}&body=${encodeURIComponent(linkMessage)}`;
    }
  };

  return (
    <Button size="icon" variant="outline" asChild {...props}>
      <Link href={getLink()} target="_blank">
        {linkType === "whatsapp" && <WhatsAppIcon className="size-6" />}
        {linkType === "telegram" && <TelegramIcon className="size-6" />}
        {linkType === "email" && <Mail />}
      </Link>
    </Button>
  );
};
