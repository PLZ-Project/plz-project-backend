FROM node:latest

ARG ENV_FILE=.env

ENV ENV_FILE=${ENV_FILE}

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package.json yarn.lock ./

COPY ${ENV_FILE} .env

COPY . .

RUN yarn

EXPOSE 3000  

CMD [ "yarn", "start"]