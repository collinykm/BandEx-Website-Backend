import express from "express"
import cors from "cors"
import {connectDB} from "./db.js";
import postsRouter from "./routes/postsRouter.js"
import dotenv from "dotenv"
import photosRouter from "./routes/photosRouter.js"

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

dotenv.config()

await connectDB()
app.use("/posts", postsRouter)
app.use("/photos", photosRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, process.env.BACKEND_URL, () => {
  console.log(`Server running on http://${process.env.BACKEND_URL}:${port}`);
});