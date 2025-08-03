import { compare } from "bcrypt";

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string,
) {
  try {
    const isMatch = await compare(plainTextPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    return false;
  }
}
