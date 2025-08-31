import {MongoClient} from "mongodb"
import dotenv from 'dotenv'
dotenv.config()
const mongoUri = process.env.MONGODB_URI
console.log(mongoUri)
const client = new MongoClient(mongoUri)

export let posts
export let photos
export async function connectDB() {
  try {
    await client.connect()
    const db = await client.db("bandex")
    posts = await db.collection("posts")
    photos = await db.collection("photos")
    return db
  } catch (error) {
    console.log(error)
  }
}

