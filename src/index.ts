import express, {Request, Response, Router} from 'express'
import { resolve } from "path";
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 4000
const app = express()
const router = Router()