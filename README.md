# Eventzor Main Webapp

**NOTE**: This whole document assumes that you use Linux, or at least a UNIX-like, if you are running Windows,
changes are that some thing are not going to work for you.

This app is the main entry point for all our users. It is a Webapp built on top of React, Redux and Bootstrap.
Since we use ES2015 features that are not supported by all the browsers. We use a combination of WebPack + Babel to
generate bundles that the browser can use.

Since we are a young startup, we use bleeding technology, as such a large part of the process is through Docker (All
kidding aside, Docker is a fantastic piece of software that makes sure that everybody runs the software on the same
environment). You can build/develop the webapp without Docker, but this is not recommended.

## Installation

All the released versions of the webapp can be found in our Docker Registry. Simply pull `eventzor/main_webapp:latest`
for the last released version (**Warning**: this does not necessary have to be the newest version), alternately you can
pull a specific version: `eventzor/main_webapp:1.0.0` for example. If you want to build an image yourself, take a look 
at "[Building](#building)"

## Development

### Installation

To install this piece of software, run `docker-compose run webapp install`. This will call npm install within the
container, but with a host volume that will place the node_modules in the root directory.

Alternately you can run `npm install`, but again, this is not recommended.

### Running the Webpack Dev Server

We use the Webpack Dev Server for our development server, since it provides hot reloading. This will inject the 
new code you've written inside the existing web page while remembering the state. To start the server, just type 
`docker-compose up`. This will start a webserver at http://localhost:80 with the API endpoint pointed towards 
http://localhost:8080 and in a development environment. If you want to change any of these settings, look at 
`docker-compose.yml`.

Whenever you install a new dependency, make sure to run `docker-compose run webapp shrinkwrap` or `npm shrinkwrap`
to generate a new `npm-shrinkwrap.json`.

If you (still) do not use Docker, you can use `npm start`, but you have to set the NODE_ENV end MAIN_API yourself
trough environment variables.

### Testing

WIP. It will probably be `docker-compose run webapp test` and `npm test`. But who needs testing anyway ¯\\\_(ツ)_/¯.

### Building

#### The Recommended Way (Docker)

Whenever you commit to the origin, a build process gets automatically triggered to build the containers. You can however
manually build the images by following the steps below

As you probably noticed by now, there are two Dockerfiles:
 - `dev.Dockerfile`: This file does only get used for building/developing of the webapp, and does not get released.
 - `Dockerfile`: A NGINX-based image, that simply hosts the webapp and nothing more. This is the file that finally sits
   in the repository.

The advantage of separating these two files, is that this greatly improves the size of the NGINX-container, since we 
do not need Node/NPM/100+ dependencies/etc.

If you want to build the image the same way as our automatic build process does, follow these steps:

1. There are two ways to create the `./dist` folder with all the contents.
    - The easiest way is using Docker Compose: Just run  `docker-compose run -e NODE_ENV=production \
      -e MAIN_API=https://eventzor.net/api webapp run-script build`and the dist folder should appear.
        
    - Alternatively you can do it without Docker Compose, this means that you do need to build the build-image yourself:
      `docker build -f dev.Dockerfile -t evenzor/main_webapp:build .`. This will create a clean build environment for 
      the Eventzor Webapp.
    
      To run the image you you've just built, use the following command:
      ```bash
      docker run --volume=`pwd`/dist:/var/www/eventzor/main_webapp/dist evenzor/main-webapp:build
      ```
    
2. Now that we have the `./dist` folder with the webapp, we can build our NGINX container. This container will host our
   website. Just run this to create the image:
   ```bash
   docker build --build-arg main_api='https://eventzor.net/api' --build-arg environment=production \
    --build-arg version=`git describe --always` -t evenzor/main_webapp:latest \
    -t evenzor/main_webapp:`git describe --always` .
   ```
   
   This step creates the image with the correct labels and tags. Keep in mind that when you build it for a different 
   environment you should change the `main_api` and the `environment` tag to your liking. The image will automatically
   be tagged with the version (`git describe --always` is used for the version) and with `latest`.
   
   If you want to change the environment or the Main-API URL you hae to run the dev.Dockerfile again.
   
   
   Keep in mind that this step is only available in Docker. If you want to deploy a NGINX configuration manually,
   the only thing you can do is to copy the files to the correct directories.

#### The Old Fashioned Way (No Docker)

To create the `./dist` folder and all the contents: `npm run-script build`. This is however not a clean build 
environment, nad as such using Docker is recommended. You must also set the environment variables `NODE_ENV` and
`MAIN_API` yourself. Since the only way to build the NGINX
container is through Docker, have a look at step 3 of "[Building: The Recommended way](#the-recommended-way-docker)".

### Releasing

Releasing is maybe the simplest part of this whole toolchain, just use [npm version](https://docs.npmjs.com/cli/version)
to increase the version, and than push it to the origin. This will trigger a remote build process that will
automatically build and release the NGINX container to our registry. Manually releasing is not recommended, but have a
look at "[Building](#building)"