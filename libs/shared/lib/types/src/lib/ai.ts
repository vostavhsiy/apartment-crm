export interface GetApartmentInfoFromAiResponse {
  title: string;
  subtitle: string;
  description: string;
  address: string;
  price: string;
  features: { name: string; value: string }[];
}
