import { findCollectionAction } from "@/entities/collection/api/actions";
import { FullScreenContainer } from "@/shared/ui/fullscreen-container";
import { DashboardCollectionApartments } from "@/widgets/dashboard-collection-apartments/dashboard-apartments";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CollectionPage(props: Props) {
  const params = await props.params;

  const collection = await findCollectionAction(params.id);

  if (!collection) return notFound();

  return (
    <FullScreenContainer className="flex h-full">
      <DashboardCollectionApartments collectionId={collection.id} />
    </FullScreenContainer>
  );
}
