FROM node:16
WORKDIR /usr/src/app
COPY . .
ENV PORT=3001
RUN npm install
CMD ["npm", "run", "dev"]
