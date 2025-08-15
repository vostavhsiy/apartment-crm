"use server";

import { ApartmentApi } from "./api";

export async function findForCollectionAction(collectionId: string) {
  try {
    return await ApartmentApi.findForCollection(collectionId);
  } catch (e) {
    return null;
  }
}

export async function findApartmentAction(id: string) {
  try {
    return await ApartmentApi.findOne(id);
  } catch (e) {
    return null;
  }
}
