import { Express } from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
import { Route } from "./config/routes"

export const setupProxies = (app: Express, routes: Route[]) => {
  routes.forEach((route) => {
    app.use(`/api/v1${route.url}`, createProxyMiddleware(route.proxy))
  })
}
