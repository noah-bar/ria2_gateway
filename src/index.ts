import express from 'express'
import dotenv from 'dotenv'
import { setupProxies } from './proxy';
import { routes } from './config/routes';

dotenv.config()

const PORT = process.env.PORT || 6000
const app = express()

setupProxies(app, routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})