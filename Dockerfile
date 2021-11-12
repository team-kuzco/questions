FROM node:7
WORKDIR /questions
COPY package.json /questions
RUN npm install
COPY . /questions
CMD node server/index.js
EXPOSE 8082