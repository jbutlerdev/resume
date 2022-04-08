#!/bin/bash

podman run -itd --privileged --rm --name rbuild -v ${PWD}:/app -w /app node
podman exec -it rbuild npm install jquery 
podman exec -it rbuild npm install react-ga
podman exec -it rbuild npm run build
podman stop rbuild
rm -rf docs
mv build docs
echo "jbutler.dev" > docs/CNAME
