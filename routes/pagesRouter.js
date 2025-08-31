import {Router} from 'express';
import {pages} from "../db.js"
import {ObjectId} from "mongodb"

const router = Router();
export default router;

router.get("/getMentorshipDescriptions",  async (req, res) => {
  try {
    const mentorshipInfo = await pages.findOne({"page": "mentorship"})
    res.json(mentorshipInfo)
  } catch (error) {
    console.log(error)
  }
})

router.put("/updateMentorshipDescription",   async (req, res) => {
  console.log("updateMentorshipDescription")
  try {
    const newMenteeDescription = req.body.menteeDescription
    const newMentorDescription = req.body.mentorDescription
    const newProgramDescription = req.body.programDescription
    const newMenteeLink = req.body.menteeLink
    const newMentorLink = req.body.mentorLink
    await pages.updateOne({"page": "mentorship"}, {
      $set: {
        "menteeDescription": newMenteeDescription,
        "mentorDescription": newMentorDescription,
        "mentorLink": newMentorLink,
        "menteeLink": newMenteeLink,
        "programDescription": newProgramDescription,
      }
      }
    )
    res.send('Success!')

  } catch (error) {
    console.log(error)
  }
})

