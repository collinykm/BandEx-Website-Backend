const express = require('express')
const app = express()
const port = 3000
const { MongoClient } = require("mongodb")
const cors = require("cors")

app.use(cors())
app.use(express.json())

const mongoUri = "mongodb+srv://collinykm:rgGHTSqA2DqV9Tzq@placeholder.wpsth.mongodb.net/?retryWrites=true&w=majority&appName=placeholder"
const client = new MongoClient(mongoUri)
let posts
async function run() {
  try {
    await client.connect()
    const db = await client.db("bandex")
    return collection = await db.collection("posts")

  } catch (error) {
    console.log(error)
  }
}
run().then(collection => posts = collection)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/newPost', (req, res) => {
  const newPost = {
    title: req.body.title.trim(),
    message: req.body.message.trim(),
    imageURL: req.body.imageURL,
    createdAt: new Date(req.body.createdAt) ,
    expirationDate: new Date(req.body.expirationDate)
  }
  try {
    posts.insertOne(newPost)
  } catch (err) {
    console.error(err)
  }
  res.send('Success!')
})

app.get('/getRecentPosts', async (req, res) => {
  try {
    console.log('Getting recent posts')
    const now = new Date();

    // Non-expired
    const activePosts = await posts.find({expirationDate: {$gte: new Date()}}).sort({expirationDate: 1}).toArray()
    console.log(`found active posts:`, activePosts);
    // Expired (just 2)
    const expiredPosts = await posts.find({
      expirationDate: { $lt: now }
    })
      .sort({ expirationDate: -1 }) // most recently expired
      .limit(2)
      .toArray();

    // Merge + sort by expirationDate ascending
    const allPosts = {
      upcoming: activePosts,
      expired: expiredPosts
    }

    res.json(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
});


app.listen(port, "192.168.1.72", () => {
  console.log(`Server running on http://192.168.1.72:${port}`);
});