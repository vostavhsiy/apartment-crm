import { FullScreenContainer } from "@/shared/ui/fullscreen-container";
import { EditClientForm } from "@/widgets/edit-client-form/edit-client-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditClientPage(props: Props) {
  const params = await props.params;

  return (
    <FullScreenContainer className="flex">
      <EditClientForm clientId={params.id} />
    </FullScreenContainer>
  );
}
