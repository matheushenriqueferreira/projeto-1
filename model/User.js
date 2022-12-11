import { MongoClient } from "mongodb";

export const userInsert = async (content) => {
  const conn = await MongoClient.connect('mongodb://127.0.0.1/projeto');
  const db = conn.db();
  db.collection('user').insertOne({ 
    email: content.userEmail,
    password: content.userPassword
  })
  .then(() => {
    conn.close();
  })
}