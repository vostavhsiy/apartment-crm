import { FullScreenContainer } from "@/shared/ui/fullscreen-container";
import { EditApartmentForm } from "@/widgets/edit-apartment-form/edit-apartment-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditApartmentPage(props: Props) {
  const params = await props.params;

  return (
    <FullScreenContainer className="flex">
      <EditApartmentForm apartmentId={params.id} />
    </FullScreenContainer>
  );
}
