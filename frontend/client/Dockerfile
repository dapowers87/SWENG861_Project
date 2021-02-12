FROM nginx AS base
    EXPOSE 80
    EXPOSE 443
    RUN apt-get update
    RUN apt-get install -y curl
    HEALTHCHECK --start-period=15s --interval=1m --timeout=30s CMD curl -k --fail 'https://localhost' || exit 1

# build environment
FROM node:14-alpine as build
    WORKDIR /app
    ENV PATH /app/node_modules/.bin:$PATH
    COPY /package.json /app/package.json
    RUN npm install --silent
    RUN npm install react-scripts -g --silent
    COPY . /app
    RUN npm run build

# production environment
FROM base AS final
    COPY --from=build /app/build /usr/share/nginx/html

    CMD ["nginx", "-g", "daemon off;"]