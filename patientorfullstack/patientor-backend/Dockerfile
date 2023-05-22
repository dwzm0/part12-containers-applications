FROM node:18
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run tsc
CMD ["npm", "start"]
