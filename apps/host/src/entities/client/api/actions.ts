"use server";

import { ClientApi } from "./api";

export async function findCollectionClientLinkAction(id: string) {
  try {
    return await ClientApi.findCollectionLink(id);
  } catch (e) {
    return null;
  }
}

export async function findClientAction(id: string) {
  try {
    return await ClientApi.findOne(id);
  } catch (e) {
    return null;
  }
}
