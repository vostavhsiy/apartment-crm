import { useToggleApartmentToClient } from "@/entities/client/api/hooks";
import { ClientWithRelations } from "@/entities/client/model/client-with-relations";
import { Button } from "@/shared/ui/button";
import { Heart, HeartCrack } from "lucide-react";

import { FC } from "react";

interface Props {
  client: ClientWithRelations;
  apartmentId: string;
}

export const ApartmentLikeButton: FC<Props> = ({ client, apartmentId }) => {
  const { mutate: toggleLike, isPending } = useToggleApartmentToClient();

  const connect = client.apartments.some((a) => a.id === apartmentId);

  const handleLike = () => {
    if (isPending) return;
    toggleLike({
      id: client.id,
      dto: {
        apartmentId,
        connect: !connect,
      },
    });
  };

  return (
    <Button disabled={isPending} onClick={handleLike}>
      {connect ? <HeartCrack /> : <Heart />}
      {connect ? "Мне не нравится" : "Мне нравится"}
    </Button>
  );
};
