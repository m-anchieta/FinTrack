import { db } from "./database";
import { User } from "../types/users";

export const createUser = (
  id: string,
  name: string,
  email: string,
  password: string,
) => {
  console.log("SALVANDO USUARIO", email);

  db.runSync(
    `
      INSERT INTO users
      (id,name,email,password)
      VALUES (?,?,?,?)
    `,
    [id, name, email, password],
  );

  console.log("USUARIO SALVO");
};

export const getUserByEmail = (email: string): User | null => {
  const user = db.getFirstSync<User>(
    `
      SELECT *
      FROM users
      WHERE email = ?
    `,
    [email],
  );

  return user ?? null;
};

export const getUserByCredentials = (
  email: string,
  password: string,
): User | null => {
  const user = db.getFirstSync<User>(
    `
      SELECT *
      FROM users
      WHERE email = ?
      AND password = ?
    `,
    [email, password],
  );

  return user ?? null;
};
