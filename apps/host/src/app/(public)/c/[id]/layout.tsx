import { findCollectionClientLinkAction } from "@/entities/client/api/actions";
import { CollectionClientHeader } from "@/widgets/collection-client-overview";
import { notFound } from "next/navigation";

export default async function CollectionClientLinklayout(props: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const collectionClientLink = await findCollectionClientLinkAction(params.id);

  if (!collectionClientLink) return notFound();

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-tr from-teal-400 to-yellow-200">
      <CollectionClientHeader collectionClientLinkId={params.id} />
      <div className="flex-1 bg-muted/90 rounded-t-[2.5rem] pt-10 pb-24 px-10">
        <div className="max-w-7xl w-full mx-auto">{props.children}</div>
      </div>
    </div>
  );
}
