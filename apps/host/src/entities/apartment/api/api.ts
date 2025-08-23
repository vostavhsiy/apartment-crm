import { ROUTES } from "@/shared/lib/api/routes";
import { authInstance, publicInstance } from "@/shared/lib/axios";
import { getFormDataFromObject } from "@/shared/lib/utils";
import { PaginatedResult, PaginationQueryDto } from "@apartment-crm/helpers";
import { GetApartmentInfoFromAiResponse } from "@apartment-crm/types";
import { Prisma } from "@prisma/client";

import { Apartment } from "../model/apartment";
import { ApartmentWithRelations } from "../model/apartment-with-relations";

export interface CreateApartmentDto {
  title: string;

  subtitle?: string;

  description?: string;

  address?: string;

  price?: string;

  features?: Omit<Prisma.FeatureUncheckedCreateInput, "apartmentId">[];

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
    const formData = getFormDataFromObject(data);
    const res = await authInstance.post<CreateApartmentResponse>(
      ROUTES.apartments.create.path,
      formData,
    );
    return res.data;
  }

  static async findForUser(dto: Partial<PaginationQueryDto>) {
    const res = await authInstance.get<FindApartmentsForCollectionResponse>(
      ROUTES.apartments.findForUser.path,
      {
        params: dto,
      },
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

  static async getApartmentInfoFromAi(url: string) {
    const res = await authInstance.get<GetApartmentInfoFromAiResponse>(
      ROUTES.apartments.getInfoFromAi.path,
      {
        params: {
          url,
        },
      },
    );
    return res.data;
  }
}
