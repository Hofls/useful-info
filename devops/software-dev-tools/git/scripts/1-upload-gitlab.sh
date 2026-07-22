#!/bin/bash

GIT_USER="admin"
GIT_PASS="qwerty"

upload_repo() {
	path="$1"
  repo="$2"
	cd "$repo" || exit
  git remote set-url --push origin "http://${GIT_USER}:${GIT_PASS}@gitlab.otherit.net/$path/${repo}.git"
  git push --mirror
  cd ..
}

upload_repo base/mini ms-shop
upload_repo base/mini ms-user
upload_repo base/mini/effects ms-effect

echo "Done!"