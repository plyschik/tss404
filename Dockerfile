FROM node:10.15.3-alpine
WORKDIR /home/tss404
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "start:dev"]