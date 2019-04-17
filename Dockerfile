FROM node:10.15.3-alpine
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g
WORKDIR /home/tss404
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]