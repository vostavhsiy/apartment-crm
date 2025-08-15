"use server";

import { CollectionApi } from "./api";

export async function findCollectionAction(id: string) {
  try {
    return await CollectionApi.findOne(id);
  } catch (e) {
    return null;
  }
}
