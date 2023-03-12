#!/bin/bash

if [ -z "$DOCKER_USERNAME" ]; then
    echo "Missing DOCKER_USERNAME variable!"
    exit 1
fi

if [ -z "$DOCKER_IMAGE" ]; then
    echo "Missing DOCKER_USERNAME variable!"
    exit 1
fi

error() {
    if [ $? != 0 ]; then
        echo "Error!"
        exit 122
    fi
}

build() {
    echo "=> Building $(echo $DOCKER_IMAGE)"
    docker build -t $(echo $DOCKER_IMAGE) .
    echo "=> Built $(echo $DOCKER_IMAGE)"
}

tag() {
    echo "=> Tagging $(echo $DOCKER_IMAGE)"
    docker tag $(echo $DOCKER_IMAGE) $(echo $DOCKER_USERNAME)/$(echo $DOCKER_IMAGE)
    echo "=> Tagged $(echo $DOCKER_IMAGE)"
}

push() {
    echo "=> Pushing $(echo $DOCKER_IMAGE)"
    docker push $(echo $DOCKER_USERNAME)/$(echo $DOCKER_IMAGE)
    echo "=> Pushed $(echo $DOCKER_IMAGE)"
}

build 
error
tag 
error
push 
error
echo

exit 0