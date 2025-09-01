import express from "express"
import cors from "cors"
import {connectDB} from "./db.js";
import postsRouter from "./routes/postsRouter.js"
import photosRouter from "./routes/photosRouter.js"
import pagesRouter from "./routes/pagesRouter.js"

const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())


await connectDB()
app.use("/posts", postsRouter)
app.use("/photos", photosRouter)
app.use("/pages", pagesRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log("Server running");
});