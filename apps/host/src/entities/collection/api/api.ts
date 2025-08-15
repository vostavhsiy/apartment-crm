import { ROUTES } from "@/shared/lib/api/routes";
import { authInstance, publicInstance } from "@/shared/lib/axios";
import { PaginatedResult } from "@apartment-crm/helpers";

import { Collection } from "../model/collection";
import { CollectionWithRelations } from "../model/collection-with-relations";

export interface CreateCollectionDto {
  title: string;
  description?: string;
}

export interface CreateCollectionResponse extends CollectionWithRelations {}

export interface UpdateCollectionDto extends Partial<CreateCollectionDto> {
  published?: boolean;
}

export interface UpdateCollectionResponse extends CollectionWithRelations {}

export interface FindCollectionsForUserResponse
  extends PaginatedResult<CollectionWithRelations> {}

export interface FindCollectionResponse extends CollectionWithRelations {}

export interface DeleteCollectionResponse extends Collection {}

export class CollectionApi {
  static async createCollection(data: CreateCollectionDto) {
    const res = await authInstance.post<CreateCollectionResponse>(
      ROUTES.collections.create.path,
      data,
    );
    return res.data;
  }

  static async findForUser() {
    const res = await publicInstance.get<FindCollectionsForUserResponse>(
      ROUTES.collections.findForUser.path,
    );
    return res.data;
  }

  static async findOne(id: string) {
    const res = await publicInstance.get<FindCollectionResponse>(
      ROUTES.collections.findOne(id).path,
    );
    return res.data;
  }

  static async update(id: string, dto: UpdateCollectionDto) {
    const res = await authInstance.patch<UpdateCollectionResponse>(
      ROUTES.collections.update(id).path,
      dto,
    );
    return res.data;
  }

  static async delete(id: string) {
    const res = await authInstance.delete<DeleteCollectionResponse>(
      ROUTES.collections.delete(id).path,
    );
    return res.data;
  }
}
