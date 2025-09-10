import { findCollectionClientLinkAction } from "@/entities/client/api/actions";
import { CollectionClientMap } from "@/widgets/collection-client-overview/collection-client-map/collection-client-map";
import { notFound } from "next/navigation";

export const revalidate = 3600;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PublicCollectionMapPage(props: Props) {
  const params = await props.params;

  const collectionClientLink = await findCollectionClientLinkAction(params.id);

  if (!collectionClientLink) return notFound();

  return <CollectionClientMap collectionClientLink={collectionClientLink} />;
}
