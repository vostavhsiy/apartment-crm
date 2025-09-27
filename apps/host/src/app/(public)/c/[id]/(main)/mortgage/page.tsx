import { findCollectionClientLinkAction } from "@/entities/client/api/actions";
import { CollectionClientMortgage } from "@/widgets/collection-client-overview/collection-client-mortgage/collection-client-mortgage";
import { notFound } from "next/navigation";

export const revalidate = 3600;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PublicCollectionMortgagePage(props: Props) {
  const params = await props.params;

  const collectionClientLink = await findCollectionClientLinkAction(params.id);

  if (!collectionClientLink) return notFound();

  return (
    <div className="w-full">
      <CollectionClientMortgage />
    </div>
  );
}
