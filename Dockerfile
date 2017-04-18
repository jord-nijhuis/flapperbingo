# This Dockerfile is only for hosting the webapp. If you want to build the webapp, see ./dev.Dockerfile.
# It is required that there is a ./dist folder containing all the files before building this Dockerfile, so please use
# ./BuildDockerfile first.

# We do not recommend using this Dockerfile for development, as it does not contain things as hot-reloading.
# It is recommended to use "docker-compose up" which makes use of ./BuildDockerfile.

FROM nginx:1.10.3-alpine

ARG version
ARG environment
ARG main_api

LABEL flapper_bingo.version=$version
LABEL flapper_bingo.environment=$environment

# Remove the default NGINX site
RUN rm /etc/nginx/conf.d/default.conf

# Copy the Dist folder to NGINX
COPY dist /var/www/html/

# Copy the Eventzor NGINX Configuration
COPY config/nginx.conf /etc/nginx/conf.d/flapper_bingo.conf

EXPOSE 80