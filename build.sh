# Debricked-worksample build script
# # # # # # # # # # # # # # # # # #

# config
NAME="debricked-worksample"
PORT="4244"

# build the docker image
echo "Building $NAME image..."
docker build -t $NAME .

# Stop previous running container
echo "Stopping previous $NAME container..."
docker stop $NAME

# start up a docker container w/ image
echo "Starting container..."
docker run -d --rm -it -p $PORT:$PORT --name $NAME $NAME
echo "Running $NAME on port $PORT!"
