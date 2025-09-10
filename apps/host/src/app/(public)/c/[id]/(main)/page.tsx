import { findCollectionClientLinkAction } from "@/entities/client/api/actions";
import { CollectionClientApartments } from "@/widgets/collection-client-overview";
import { notFound } from "next/navigation";

export const revalidate = 3600;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PublicCollectionPage(props: Props) {
  const params = await props.params;

  const collectionClientLink = await findCollectionClientLinkAction(params.id);

  if (!collectionClientLink) return notFound();

  return (
    <div className="w-full">
      <CollectionClientApartments collectionClientLink={collectionClientLink} />
    </div>
  );
}
