FROM node:6-alpine

ADD controllers /app/controllers
ADD services /app/services
ADD package.json /app
ADD router.js /app
ADD index.js /app

RUN cd /app; npm install

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

WORKDIR "/app"
CMD [ "npm", "start" ]