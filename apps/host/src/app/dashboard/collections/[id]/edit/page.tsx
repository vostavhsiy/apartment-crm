import { findCollectionAction } from "@/entities/collection/api/actions";
import { FullScreenContainer } from "@/shared/ui/fullscreen-container";
import { EditCollectionForm } from "@/widgets/edit-collection-form/edit-collection-form";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCollectionPage(props: Props) {
  const params = await props.params;

  const collection = await findCollectionAction(params.id);

  if (!collection) return notFound();

  return (
    <FullScreenContainer className="flex">
      <EditCollectionForm collectionId={params.id} />
    </FullScreenContainer>
  );
}
