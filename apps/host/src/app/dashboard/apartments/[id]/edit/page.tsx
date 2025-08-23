import { findApartmentAction } from "@/entities/apartment/api/actions";
import { FullScreenContainer } from "@/shared/ui/fullscreen-container";
import { EditApartmentForm } from "@/widgets/edit-apartment-form/edit-apartment-form";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditApartmentPage(props: Props) {
  const params = await props.params;

  const apartment = await findApartmentAction(params.id);

  if (!apartment) return notFound();

  return (
    <FullScreenContainer className="flex">
      <EditApartmentForm apartmentId={params.id} />
    </FullScreenContainer>
  );
}
