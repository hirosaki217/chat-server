FROM node:16

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4000

CMD [ "node", "src/index.js" ]