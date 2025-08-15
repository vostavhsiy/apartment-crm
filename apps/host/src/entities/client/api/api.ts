import { ROUTES } from "@/shared/lib/api/routes";
import { authInstance, publicInstance } from "@/shared/lib/axios";
import { PaginatedResult } from "@apartment-crm/helpers";

import { Client } from "../model/client";
import { ClientWithRelations } from "../model/client-with-relations";

export interface CreateClientDto {
  name: string;

  phone: string;

  avatarUrl?: string;
}

export interface FindClientsForUser extends PaginatedResult<Client> {}

export interface CreateClientResponse extends ClientWithRelations {}

export interface UpdateClientDto extends Partial<CreateClientDto> {}

export interface UpdateClientResponse extends ClientWithRelations {}

export interface FindClientsForCollectionResponse
  extends PaginatedResult<ClientWithRelations> {}

export interface FindClientResponse extends ClientWithRelations {}

export interface ToggleClientToCollectionDto {
  collectionId: string;
  connect?: boolean;
  order?: number;
}

export interface ToggleClientToCollectionResponse extends Client {}

export interface ToggleApartmentToClientDto {
  apartmentId: string;
  connect?: boolean;
}

export interface ToggleApartmentToClientResponse extends Client {}

export interface DeleteClientResponse extends Client {}

export class ClientApi {
  static async createClient(data: CreateClientDto) {
    const res = await authInstance.post<CreateClientResponse>(
      ROUTES.clients.create.path,
      data,
    );
    return res.data;
  }

  static async findForUser() {
    const res = await publicInstance.get<FindClientsForUser>(
      ROUTES.clients.findForUser.path,
    );
    return res.data;
  }

  static async findOne(id: string) {
    const res = await publicInstance.get<FindClientResponse>(
      ROUTES.clients.findOne(id).path,
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

  static async delete(id: string) {
    const res = await authInstance.delete<DeleteClientResponse>(
      ROUTES.clients.delete(id).path,
    );
    return res.data;
  }
}
