import { hash } from "bcrypt";

export async function hashPassword(password: string) {
  try {
    return await hash(password, 10);
  } catch (error) {
    return null;
  }
}
