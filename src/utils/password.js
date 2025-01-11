import { compare, hash } from "bcryptjs";

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  try {
    const isValid = await compare(password, hashedPassword);
    return isValid;
  } catch (err) {
    return false;
  }
}

export { hashPassword, verifyPassword };
