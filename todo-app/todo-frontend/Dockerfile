# The first FROM is now a stage called build-stage
FROM node:16 AS build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm ci

RUN npm run build


FROM build-stage as test
RUN CI=true npm ci
COPY . .
CMD ["npm", "run", "test"]

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html