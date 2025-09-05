import { FullScreenContainer } from "@/shared/ui/fullscreen-container";
import { ClientOverview } from "@/widgets/client-overview/client-overview";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientPage(props: Props) {
  const params = await props.params;

  return (
    <FullScreenContainer className="flex h-full">
      <ClientOverview clientId={params.id} />
    </FullScreenContainer>
  );
}
