import {Filter, Options} from "http-proxy-middleware"
import dotenv from 'dotenv'

dotenv.config();

export type Route = {
    url: string,
    proxy: Filter | Options
}

export const routes: Route[] = [
    {
        url: "/analyse",
        proxy: {
            target: process.env.LABEL_DETECTOR_TARGET,
            changeOrigin: true,
        },
    },
    {
        url: '/upload',
        proxy: {
            target: process.env.DATA_OBJECT_TARGET,
            changeOrigin: true,
        }
    },
    {
        url: '/publish/:name',
        proxy: {
            target: process.env.DATA_OBJECT_TARGET,
            changeOrigin: true,
        }
    }
]
