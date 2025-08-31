import {Router} from 'express';
import {photos} from "../db.js"
import {ObjectId} from "mongodb"

const router = Router();
export default router;

router.get("/getPhotoCards", async (req, res) => {
  const skip = Number(req.query.skip ?? 0)
  const limit = Number(req.query.limit ?? 3)
  try {
    const expiredPosts = await photos.find({})
      .sort({ eventDate: -1 }) // sorting by most recent event that happened
      .skip(skip) //skipping the first offset number of results
      .limit(limit)
      .toArray();
    res.json(expiredPosts);
  } catch (err) {
    console.log(err)
  }
})

router.post("/newPhotoCard" , async (req, res) => {
  const newPhotoCard = {
    title: req.body.title?.trim() || null,
    folderLink: req.body.folderLink.trim(),
    imageURL: req.body.imageURL?.trim() || null,
    createdAt: new Date(req.body.createdAt),
    eventDate: new Date(req.body.eventDate)
  }
  try {
    await photos.insertOne(newPhotoCard)
  } catch (err) {
    console.error(err)
  }
  res.send('Success!')
})

router.put("/editPhotoCard", async (req, res) => {
  console.log("the card data received to edit: ", req.body)
  const postId = new ObjectId(req.body.id)
  console.log("id of photo card im aboutta edit ", postId)
  const title = req.body.title?.trim() || ""
  const folderLink = req.body.folderLink.trim()
  const imageURL = req.body.imageURL?.trim() || ""
  const eventDate = new Date(req.body.eventDate)

  try {
    await photos.updateOne(
      {_id: postId},
      {$set: {
          title: title,
          folderLink: folderLink,
          imageURL: imageURL,
          eventDate: eventDate,
        }
      }
    )
  } catch (err) {
    console.log(err)
  }
  res.send('Success!')

})

router.delete('/deletePhotoCard/:id', async (req, res) => {
  const id = new ObjectId(req.params.id)
  console.log("deleting this photo card:  ", id)
  try {
    await photos.deleteOne({"_id": id})
  } catch (err) {
    console.log(err)
  }
  res.send('Success!')
})