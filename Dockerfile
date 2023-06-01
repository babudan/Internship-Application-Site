FROM node:alpine

WORKDIR /src/index

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "start"]