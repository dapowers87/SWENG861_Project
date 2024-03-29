FROM nginx AS base
    EXPOSE 443
    ENV TZ=America/Chicago
    ENV DOLLAR $
    RUN apt-get update
    RUN apt-get install -y curl

# build environment
FROM node:14.15.5-buster as build
    WORKDIR /app
    ENV PATH /app/node_modules/.bin:$PATH
    COPY /package.json /app/package.json
    RUN npm install husky
    RUN npm install --silent
    RUN npm install react-scripts -g --silent
    COPY . /app
    RUN npm run build

# production environment
FROM base AS final
    COPY --from=build /app/build /usr/share/nginx/html

    WORKDIR /usr/share/nginx/html
    COPY env.sh /usr/share/nginx/html
    COPY .env /usr/share/nginx/html
    RUN chmod +x /usr/share/nginx/html/env.sh

    CMD ["/bin/bash", "-c", "./env.sh && nginx -g \"daemon off;\""]