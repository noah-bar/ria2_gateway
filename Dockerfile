FROM node:21-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm i --production
COPY . .
RUN npm run build

FROM node:21-alpine
WORKDIR /app
COPY --from=build ./app/node_modules ./node_modules
COPY --from=build ./app/dist ./
COPY .env ./
CMD ["node", "index.js"]
EXPOSE 8000

# BUILD
# docker build . -f Dockerfile -t gateway:prod

# RUN
# docker run -d -p 8000:8000 --name gateway_prod gateway:prod
