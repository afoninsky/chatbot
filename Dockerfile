FROM node:11.9-alpine
LABEL Author Andrey Afoninsky
ENV NODE_DIR /home/nodejs/app
WORKDIR $NODE_DIR
COPY package.json $NODE_DIR
RUN yarn install --production
COPY . $NODE_DIR

CMD ["node", "src/server.js"]
