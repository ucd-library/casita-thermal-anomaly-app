#! /bin/bash

set -e
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $ROOT_DIR
rm -rf dist
mkdir dist

cp public/index.html dist/index.html
cp -r public/img dist/img
webpack --config webpack-dist.config.js