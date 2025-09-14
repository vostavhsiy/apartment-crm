import { findApartmentAction } from "@/entities/apartment/api/actions";
import { findCollectionClientLinkAction } from "@/entities/client/api/actions";
import { CollectionClientApartment } from "@/widgets/collection-client-overview/collection-client-apartment/collection-client-apartment";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string; apartmentId: string }>;
}

export default async function PublicApartmentPage(props: Props) {
  const params = await props.params;

  const collectionClientLink = await findCollectionClientLinkAction(params.id);

  if (!collectionClientLink) return notFound();

  const apartment = await findApartmentAction(params.apartmentId);

  if (!apartment) return notFound();

  return (
    <div className="flex flex-1 bg-muted/90 py-10 px-5">
      <div className="max-w-7xl w-full mx-auto flex flex-1">
        <CollectionClientApartment
          apartmentId={apartment.id}
          clientId={collectionClientLink.client.id}
          collectionClientLinkId={collectionClientLink.id}
        />
      </div>
    </div>
  );
}
