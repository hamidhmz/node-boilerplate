FROM node:14.15-alpine

# add bash
RUN apk update
RUN apk add bash

WORKDIR /app

COPY . /app

COPY ./docker/wait-for-it.sh /usr/local

RUN chmod +x /usr/local/wait-for-it.sh

CMD ["sh","-c","ls && /usr/local/wait-for-it.sh postgres-prisma-graphql:5432 && npm install && npm run nodemon "]