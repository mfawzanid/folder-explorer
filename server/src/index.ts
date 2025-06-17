import express from "express";
import cors from "cors";
import itemRoute from "./routes/itemRoute";
import { asyncHandler } from "./utils/asyncHandler";

const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

app.use("/items", itemRoute);
app.use("/", asyncHandler(async (req, res) => res.send("Status is ok")));

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
