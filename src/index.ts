import express, { Router, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { DataObjectService } from "./services/DataObjectService"
import { LabelDetectorService } from "./services/LabelDetectorService"
import multer from "multer"
import { ApiServiceException, UnprocessableEntityException } from "./exceptions/ApiServiceException"

dotenv.config()

const PORT = process.env.PORT || 8000
const LABEL_DETECTOR_TARGET = process.env.LABEL_DETECTOR_TARGET as string
const DATA_OBJECT_TARGET = process.env.DATA_OBJECT_TARGET as string

const upload = multer()
const app = express()

app.use(cors())
app.use(express.json({ limit: "50mb" }))

const router = Router()

router.post("/analyse", upload.single("file"), async (req: Request, res: Response) => {
  const file = req.file ? new Blob([req.file.buffer]) : undefined
  const fileName = req.file ? req.file.originalname : "undefined"
  const maxResults: number = req.body.maxResults
  const minConfidenceLevel: number = req.body.minConfidenceLevel

  const dataObjectService = new DataObjectService(DATA_OBJECT_TARGET)
  const labelDetectorService = new LabelDetectorService(LABEL_DETECTOR_TARGET)

  try {
    const { name } = await dataObjectService.upload({ file, name: fileName })
    const { url } = await dataObjectService.publish(name)
    const labels = await labelDetectorService.analyse({ image: url, maxResults, minConfidenceLevel })
    return res.json(labels)
  } catch (err: unknown) {
    if (err instanceof UnprocessableEntityException) {
      return res.status(err.status).send(err.errors)
    } else if (err instanceof ApiServiceException) {
      return res.status(err.status).send({ error: err.message })
    }
    return res.status(500).send({ error: "Unknown error" })
  }
})

app.use("/api/v1", router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
