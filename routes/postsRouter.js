import {Router} from 'express';
import {posts} from "../db.js"
import {ObjectId} from "mongodb"

const router = Router();
export default router;

router.post('/newPost', async (req, res) => {
  const newPost = {
    title: req.body.title?.trim() || null,
    message: req.body.message.trim(),
    imageURL: req.body.imageURL,
    createdAt: new Date(req.body.createdAt) ,
    expirationDate: new Date(req.body.expirationDate)
  }
  try {
    await posts.insertOne(newPost)
  } catch (err) {
    console.error(err)
  }
  res.send('Success!')
})

router.put("/editPost", async (req, res) => {
  const postId = new ObjectId(req.body.id)
  console.log("postId ", postId)
  const title = req.body.title.trim()
  const message = req.body.message.trim()
  const imageURL = req.body.imageURL
  const expirationDate = new Date(req.body.expirationDate)

  try {
    await posts.updateOne(
      {_id: postId},
      {$set: {
          title: title,
          message: message,
          imageURL: imageURL,
          expirationDate: expirationDate,
        }
      }
    )
  } catch (err) {
    console.log(err)
  }
  res.send('Success!')

})

router.delete('/deletePost/:id', async (req, res) => {
  const id = new ObjectId(req.params.id)
  console.log("deleting this post:  ", id)
  try {
    await posts.deleteOne({"_id": id})
  } catch (err) {
    console.log(err)
  }
  res.send('Success!')
})

router.get('/getRecentPosts', async (req, res) => {
  try {
    const now = new Date();

    const activePosts = await posts.find({expirationDate: {$gte: new Date()}}).sort({expirationDate: 1}).toArray()

    const expiredPosts = await posts.find({expirationDate: { $lt: now }})
      .sort({ expirationDate: -1 }) // most recently expired
      .limit(2)
      .toArray();

    // Merge + sort by expirationDate ascending
    const allPosts = {upcoming: activePosts, expired: expiredPosts}

    res.json(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
});

router.get('/getMorePosts', async (req, res) => {
  const skip = Number(req.query.skip)
  const limit = Number(req.query.limit)
  try {
    const expiredPosts = await posts.find({})
      .sort({ expirationDate: -1 }) // sorting by most future
      .skip(skip) //skipping the first offset number of results
      .limit(limit)
      .toArray();
    res.json(expiredPosts);
  } catch (err) {
    console.log(err)
  }
})