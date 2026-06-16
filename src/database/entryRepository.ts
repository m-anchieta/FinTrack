import { db } from "./database";
import { Entry } from "../types/finance";

export const addEntry = (entry) => {
  db.runSync(
    `
      INSERT INTO entries
      (
        id,
        userId,
        title,
        amount,
        type,
        category,
        date
      )
      VALUES
      (?,?,?,?,?,?,?)
    `,
    [
      entry.id,
      entry.userId,
      entry.title,
      entry.amount,
      entry.type,
      entry.category,
      entry.date,
    ],
  );
};

export const getEntriesByUser = (userId: string): Entry[] => {
  return db.getAllSync<Entry>(
    `
      SELECT *
      FROM entries
      WHERE userId = ?
      ORDER BY date DESC
    `,
    [userId],
  );
};


export const deleteEntry = (
  id: string
) => {

  db.runSync(
    `
      DELETE FROM entries
      WHERE id = ?
    `,
    [id]
  );

};


export const updateEntry = (
  entry: Entry
) => {

  db.runSync(
    `
      UPDATE entries
      SET
        title = ?,
        amount = ?,
        type = ?,
        category = ?,
        date = ?
      WHERE id = ?
    `,
    [
      entry.title,
      entry.amount,
      entry.type,
      entry.category,
      entry.date,
      entry.id,
    ]
  );

};