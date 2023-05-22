FROM node:16
WORKDIR /usr/src/app
COPY . .
ENV PORT=3001
RUN npm ci --only=production
CMD ["npm", "start" ]