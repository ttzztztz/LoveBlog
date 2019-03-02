FROM node:alpine

RUN mkdir -p /var/love
COPY . .

RUN yarn 
RUN yarn run compile

ENTRYPOINT [ "yarn","start" ]