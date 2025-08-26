"use server";

import { ClientApi } from "./api";

export async function findClientAction(id: string) {
  try {
    return await ClientApi.findOne(id);
  } catch (e) {
    return null;
  }
}
