import {Router} from 'express';
import {pages} from "../db.js"
import {ObjectId} from "mongodb"

const router = Router();
export default router;

router.get("/getMentorshipInfo",  async (req, res) => {
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


router.get("/getApplicationsInfo",  async (req, res) => {
  try {
    const mentorshipInfo = await pages.findOne({"page": "applications"})
    res.json(mentorshipInfo)
  } catch (error) {
    console.log(error)
  }
})

router.put("/updateApplicationsInfo",   async (req, res) => {
  console.log("updating applicationsInfo")
  try {
    const newMessage = req.body.message
    const newLink = req.body.link
    await pages.updateOne({"page": "applications"}, {
        $set: {
          "message": newMessage,
          "link": newLink,
        }
      }
    )
    res.send('Success!')

  } catch (error) {
    console.log(error)
  }
})


router.get("/getAboutInfo",  async (req, res) => {
  try{
    const info = await pages.findOne({"page": "about"})
    res.json(info)
  }  catch (error) {
    console.log(error)
  }
})

router.put("/updateAboutInfo",  async (req, res) => {
  console.log("updating aboutInfo")
  try {
    const newDescription = req.body.description
    const newMembers = req.body.members
    const newPhotoURL = req.body.teamPhotoURL
    const newCaption = req.body.caption
    pages.updateOne({"page": "about"}, {
      $set: {
        "description": newDescription,
        "members": newMembers,
        "teamPhotoURL": newPhotoURL,
        "caption": newCaption,
      }
    })
  } catch (error) {
    console.log(error)
  }
  res.send('Success!')
})
