FROM node:14.16.0
MAINTAINER name <chiron8963@gmail.com>


WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .
#ENV NODE_ENV development

EXPOSE 3000

CMD ["npm","run","start"]