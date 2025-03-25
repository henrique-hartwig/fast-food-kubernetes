#!/bin/bash

build_database_url() {
    local host=$1
    echo "postgresql://postgres:password123@$host:5432/fastfood?schema=public"
}

if [ -z "$1" ]; then
    echo "Error: Specify the environment type (local or remote)"
    exit 1
fi

ENV_TYPE=$1
IMAGE_NAME="henriquemh/fastfood-app"

if [ "$ENV_TYPE" = "local" ]; then
    docker build -t $IMAGE_NAME .

elif [ "$ENV_TYPE" = "remote" ]; then
    if [ -z "$2" ]; then
        echo "Error: For the remote environment, provide the database endpoint as the second parameter"
        exit 1
    fi

    DATABASE_URL=$(build_database_url "$2")
    CLOUD_IMAGE_NAME="${IMAGE_NAME}-cloud"

    echo "FROM $IMAGE_NAME" > Dockerfile.remote
    echo "ENV DATABASE_URL=\"$DATABASE_URL\"" >> Dockerfile.remote
    
    docker build --no-cache -t $CLOUD_IMAGE_NAME -f Dockerfile.remote .
    rm Dockerfile.remote
    docker push $CLOUD_IMAGE_NAME

else
    echo "Error: Invalid environment type. Use 'local' or 'remote'"
    exit 1
fi

echo "Docker image created successfully!"
