import { findCollectionClientLinkAction } from "@/entities/client/api/actions";
import { ClientCollectionApartments } from "@/widgets/client-collection-apartments/client-collection-apartments";
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
      <ClientCollectionApartments collectionClientLink={collectionClientLink} />
    </div>
  );
}
