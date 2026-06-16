import { Category } from '../types/category';
import { db } from './database';

export const addCategory = (category: Category) => {
  db.runSync(
    `
      INSERT INTO categories
      (id, userId, name, color)
      VALUES (?, ?, ?, ?)
    `,
    [
      category.id,
      category.userId,
      category.name.trim(),
      category.color,
    ]
  );
};

export const getCategoriesByUser = (
  userId: string
): Category[] => {
  return db.getAllSync(
    `
      SELECT *
      FROM categories
      WHERE userId = ?
    `,
    [userId]
  ) as Category[];
};

export const deleteCategory = (id: string) => {
  db.runSync(
    `
      DELETE FROM categories
      WHERE id = ?
    `,
    [id]
  );
};

export const updateCategory = (
  id: string,
  name: string,
  color: string
) => {
  db.runSync(
    `
      UPDATE categories
      SET
        name = ?,
        color = ?
      WHERE id = ?
    `,
    [name.trim(), color, id]
  );
};