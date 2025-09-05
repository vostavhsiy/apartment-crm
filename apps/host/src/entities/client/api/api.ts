import { ROUTES } from "@/shared/lib/api/routes";
import { authInstance } from "@/shared/lib/axios";
import { PaginatedResult, PaginationQueryDto } from "@apartment-crm/helpers";
import { ClientApartmentView, Prisma } from "@prisma/client";

import { Client } from "../model/client";
import { ClientWithRelations } from "../model/client-with-relations";

export interface CreateClientDto {
  name: string;

  phone: string;

  avatarUrl?: string;
}

export interface FindClientsForUser
  extends PaginatedResult<ClientWithRelations> {}

export interface CreateClientResponse extends ClientWithRelations {}

export interface UpdateClientDto extends Partial<CreateClientDto> {}

export interface UpdateClientResponse extends ClientWithRelations {}

export interface FindClientsForCollectionResponse
  extends PaginatedResult<ClientWithRelations> {}

export interface FindClientResponse extends ClientWithRelations {}

export interface FindClientStatsResponse {
  totalObjectsCount: number;
  unseenApartementsCount: number;
  totalViewsCount: number;
  totalLikesCount: number;
}

export interface ToggleClientToCollectionDto {
  collectionId: string;
  connect?: boolean;
  order?: number;
}

export type ToggleClientToCollectionResponse =
  Prisma.CollectionClientGetPayload<{
    include: { client: true; collection: true };
  }>;

export interface ToggleApartmentToClientDto {
  apartmentId: string;
  connect?: boolean;
}

export interface ToggleApartmentToClientResponse extends Client {}

export interface DeleteClientResponse extends Client {}

export interface SeeApartmentDto {
  clientId: string;
  apartmentId: string;
}
export interface SeeApartmentResponse extends ClientApartmentView {}

export class ClientApi {
  static async createClient(data: CreateClientDto) {
    const res = await authInstance.post<CreateClientResponse>(
      ROUTES.clients.create.path,
      data,
    );
    return res.data;
  }

  static async findForUser(dto: Partial<PaginationQueryDto>) {
    const res = await authInstance.get<FindClientsForUser>(
      ROUTES.clients.findForUser.path,
      {
        params: dto,
      },
    );
    return res.data;
  }

  static async findOne(id: string) {
    const res = await authInstance.get<FindClientResponse>(
      ROUTES.clients.findOne(id).path,
    );
    return res.data;
  }

  static async findClientStats(id: string) {
    const res = await authInstance.get<FindClientStatsResponse>(
      ROUTES.clients.findClientStats(id).path,
    );
    return res.data;
  }

  static async update(id: string, dto: UpdateClientDto) {
    const res = await authInstance.patch<UpdateClientResponse>(
      ROUTES.clients.update(id).path,
      dto,
    );
    return res.data;
  }

  static async toggleClientToCollection(
    id: string,
    dto: ToggleClientToCollectionDto,
  ) {
    const res = await authInstance.patch<ToggleClientToCollectionResponse>(
      ROUTES.clients.toggleCollectionToClient(id).path,
      dto,
    );
    return res.data;
  }

  static async toggleApartmentToClient(
    id: string,
    dto: ToggleApartmentToClientDto,
  ) {
    const res = await authInstance.patch<ToggleApartmentToClientResponse>(
      ROUTES.clients.toggleApartmentToClient(id).path,
      dto,
    );
    return res.data;
  }

  static async seeApartment(dto: SeeApartmentDto) {
    const res = await authInstance.post<SeeApartmentResponse>(
      ROUTES.clients.seeApartment(dto.clientId, dto.apartmentId).path,
      dto,
    );
    return res.data;
  }

  static async delete(id: string) {
    const res = await authInstance.delete<DeleteClientResponse>(
      ROUTES.clients.delete(id).path,
    );
    return res.data;
  }
}
