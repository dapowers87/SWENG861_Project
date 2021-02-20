FROM nginx AS base
    EXPOSE 443
    ENV TZ=America/Chicago
    ENV DOLLAR $
    RUN apt-get update
    RUN apt-get install -y curl
    HEALTHCHECK --start-period=15s --interval=1m --timeout=30s CMD curl -k --fail 'https://localhost' || exit 1

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

    COPY nginx/default.conf.template /etc/nginx/conf.d/default.conf.template

    CMD ["/bin/bash", "-c", "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && ./env.sh && nginx -g \"daemon off;\""]