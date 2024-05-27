FROM node:alpine
WORKDIR /pigeon-bot
COPY . .
RUN npm install
CMD ["node", "index.js"]