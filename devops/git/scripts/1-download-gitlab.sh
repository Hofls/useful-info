#!/bin/bash

GIT_USER="hofls"
GIT_PASS="qwerty"

download_repo() {
	path="$1"
    repo="$2"
    if [ ! -d "$repo" ]; then
        git clone --mirror "https://${GIT_USER}:${GIT_PASS}@vcs.someit.com/$path/${repo}.git" "$repo"
    fi
    cd "$repo"
    git fetch --prune
    cd ..
}

download_repo smart/warehouse ms-shop
download_repo smart/special/demo ms-user
download_repo smart/extra ms-effect
