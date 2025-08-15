import { ROUTES } from "@/shared/lib/api/routes";
import { authInstance, publicInstance } from "@/shared/lib/axios";
import { PaginatedResult } from "@apartment-crm/helpers";
import { Prisma } from "@prisma/client";

import { Apartment } from "../model/apartment";
import { ApartmentWithRelations } from "../model/apartment-with-relations";

export interface CreateApartmentDto {
  title: string;

  subtitle?: string;

  description?: string;

  address?: string;

  price?: string;

  features?: Prisma.FeatureCreateInput[];

  files?: File[];
}

export interface CreateApartmentResponse extends ApartmentWithRelations {}

export interface UpdateApartmentDto extends Partial<CreateApartmentDto> {
  published?: boolean;
}

export interface UpdateApartmentResponse extends ApartmentWithRelations {}

export interface FindApartmentsForCollectionResponse
  extends PaginatedResult<ApartmentWithRelations> {}

export interface FindApartmentResponse extends ApartmentWithRelations {}

export interface ToggleApartmentToCollectionDto {
  collectionId: string;
  connect?: boolean;
  order?: number;
}

export interface ToggleApartmentToCollectionResponse extends Apartment {}

export interface DeleteApartmentResponse extends Apartment {}

export class ApartmentApi {
  static async createApartment(data: CreateApartmentDto) {
    const res = await authInstance.post<CreateApartmentResponse>(
      ROUTES.apartments.create.path,
      data,
    );
    return res.data;
  }

  static async findForCollection(collectionId: string) {
    const res = await publicInstance.get<FindApartmentsForCollectionResponse>(
      ROUTES.apartments.findForCollection.path,
      {
        params: {
          collectionId,
        },
      },
    );
    return res.data;
  }

  static async findOne(id: string) {
    const res = await publicInstance.get<FindApartmentResponse>(
      ROUTES.apartments.findOne(id).path,
    );
    return res.data;
  }

  static async update(id: string, dto: UpdateApartmentDto) {
    const res = await authInstance.patch<UpdateApartmentResponse>(
      ROUTES.apartments.update(id).path,
      dto,
    );
    return res.data;
  }

  static async toggleApartmentToCollection(
    id: string,
    dto: ToggleApartmentToCollectionDto,
  ) {
    const res = await authInstance.patch<ToggleApartmentToCollectionResponse>(
      ROUTES.apartments.toggleApartmentToCollection(id).path,
      dto,
    );
    return res.data;
  }

  static async delete(id: string) {
    const res = await authInstance.delete<DeleteApartmentResponse>(
      ROUTES.apartments.delete(id).path,
    );
    return res.data;
  }
}
