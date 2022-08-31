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
WORKDIR /app/client/public
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY elements elements
COPY img img
COPY src src
COPY index.html .
COPY index.js .

WORKDIR /app
RUN npm run dist
COPY controllers controllers
COPY lib lib
COPY index.js .

CMD [ "node", "index.js" ]