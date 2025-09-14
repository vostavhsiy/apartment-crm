import { ApartmentWithRelations } from "@/entities/apartment/model/apartment-with-relations";
import { useToggleApartmentToClient } from "@/entities/client/api/hooks";
import { cn } from "@/shared/lib/utils";
import { Button, ButtonProps } from "@/shared/ui/button";
import { Heart } from "lucide-react";

import { FC, MouseEvent } from "react";

interface Props extends ButtonProps {
  apartment: ApartmentWithRelations;
  clientId: string;
}

export const ApartmentLikeButton: FC<Props> = ({
  apartment,
  clientId,
  ...props
}) => {
  const { mutate: toggleLike, isPending } = useToggleApartmentToClient();

  const connect = apartment.clientsLikes?.some(
    (like) => like.clientId === clientId,
  );

  const handleLike = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isPending) return;
    toggleLike({
      id: clientId,
      dto: {
        apartmentId: apartment.id,
        connect: !connect,
      },
    });
  };

  return (
    <Button
      disabled={isPending}
      size={"lg"}
      variant={"outline"}
      {...props}
      className={cn(
        "group text-red-500 hover:text-red-500 hover:shadow-lg hover:bg-transparent",
        props.size !== "icon" && "w-full",
        connect && "bg-red-100 hover:bg-red-200/80",
        props.className,
      )}
      onClick={handleLike}
    >
      <Heart
        className={cn(
          "transition-all duration-500 size-5 group-hover:scale-110  group-hover:fill-red-500",
          (connect || isPending) && "fill-red-500 scale-110",
        )}
      />
      {props.size !== "icon" && "Мне нравится"}
    </Button>
  );
};
