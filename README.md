# Debricked worksample
Simple package vulnerability checker, powered by [Debricked] public API.

Public site: https://debricked.sundbergmedia.com

## Building
Call the build script `build.sh` to build & start a Docker container. Default port is `4244`.

It is also possible to build and start the docker image *manually* by issuing the following commands:

```sh
# build the image
docker build -t debricked-worksample .

# spin up the container
docker run -d -p 4244:4244 debricked-worksample
```


## Development
Utilizing [webpack] for live reloads & other goodies. [Stylus] is the CSS-proccessor used, [Pug] is the template engine.

**NOTE**: the dev-server & backend should be started separately!

#### Spin up the dev environment

```sh
npm install   # install dependencies
npm run dev   # start live dev-server
npm start     # start the backend
```


<!-- Refernces -->
[debricked]: https://debricked.com/
[webpack]: https://webpack.js.org/
[docker]: https://www.docker.com/
[stylus]: http://stylus-lang.com/
[pug]: https://pugjs.org/
