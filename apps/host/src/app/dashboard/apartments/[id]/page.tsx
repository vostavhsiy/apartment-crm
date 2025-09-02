import { findApartmentAction } from "@/entities/apartment/api/actions";
import { ApartmentOverview } from "@/widgets/apartment-overview";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DashboardApartmentPage(props: Props) {
  const params = await props.params;

  const apartment = await findApartmentAction(params.id);

  if (!apartment) return notFound();

  return (
    <div className="flex flex-col w-full h-full pt-5 sm:px-20">
      <ApartmentOverview apartmentId={apartment.id} inAdmin />
    </div>
  );
}
