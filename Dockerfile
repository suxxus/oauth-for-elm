FROM node:18-alpine3.15 

WORKDIR /app

COPY package*.json ./

COPY index.js ./index.js
COPY ./public ./public

RUN npm install
RUN ls -a

CMD ["npm", "start"]

