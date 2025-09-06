"use server";

import { revalidatePath } from "next/cache";

export const revalidate = (path: string, type: "layout" | "page") => {
  return revalidatePath(path, type);
};
