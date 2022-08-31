FROM node:18

ARG APP_ENV
ENV APP_ENV $APP_ENV
ARG CLIENT_ENV
ENV CLIENT_ENV $CLIENT_ENV

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

RUN mkdir -p client/public
WORKDIR /app/client
COPY client/dist.sh .
COPY client/webpack-dist.config.js .
COPY client/webpack-watch.config.js .

WORKDIR /app/client/public
COPY client/public/package.json .
COPY client/public/package-lock.json .
RUN npm install

COPY client/public/elements elements
COPY client/public/img img
COPY client/public/src src
COPY client/public/index.html .
COPY client/public/index.js .

WORKDIR /app
RUN npm run dist
COPY controllers controllers
COPY lib lib
COPY index.js .

CMD [ "node", "index.js" ]