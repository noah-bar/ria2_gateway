import express from "express"
import dotenv from "dotenv"
import { setupProxies } from "./proxy"
import { routes } from "./config/routes"
import cors from "cors"

dotenv.config()

const PORT = process.env.PORT || 8000
const app = express()
app.use(cors())
setupProxies(app, routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
