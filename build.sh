# Debricked-worksample build script
# # # # # # # # # # # # # # # # # #

# config
NAME="debricked-worksample"
PORT="4244"

# build the docker image
echo "Building image..."
docker build -t $NAME .

# start up a docker container w/ image
echo "Starting container..."
docker run -d --rm -it -p $PORT:$PORT $NAME
echo "...Running $NAME on port $PORT!"
