import { findClientAction } from "@/entities/client/api/actions";
import { FullScreenContainer } from "@/shared/ui/fullscreen-container";
import { DashboardClients } from "@/widgets/dashboard-clients/dashboard-clients";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientPage(props: Props) {
  const params = await props.params;

  const client = await findClientAction(params.id);

  if (!client) return notFound();

  return (
    <FullScreenContainer className="flex h-full">
      <DashboardClients />
    </FullScreenContainer>
  );
}
