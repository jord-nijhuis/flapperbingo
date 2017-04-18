# This Dockerfile is only for building the project. If you want to host the site, see ./Dockerfile, which is a
# NGINX-based container that takes the output of ./dist and hosts it.
# To use this container, simply run the container, and copy the files from /var/ww/eventzor/main_webapp/dist to
# ./dist for ./Dockerfile

# For development, simply use "docker-compose up"

FROM node:7.7

# Copy the files
COPY . /var/www/flapper_bingo
WORKDIR /var/www/flapper_bingo
# Ugly workaround. We cannot add the dist folder to Dockerignore, since the other Dockerfile requries it, so we
# will just remove it
RUN rm -rf /var/www/eventzor/flapper_bingo/dist

# Install dependencies
RUN npm install && \
    npm shrinkwrap

ENV NODE_ENV=production

# Build project
ENTRYPOINT ["npm"]
CMD ["run-script", "build"]
