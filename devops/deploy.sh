#! /bin/bash

set -e
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $ROOT_DIR/..

PROJECT_ID=digital-ucdavis-edu
GCR_PROJECT_ID=ucdlib-pubreg

CONTAINER_NAME=thermal-anomaly-app
DEPLOYMENT_NAME=thermal-anomaly-app
IMAGE=gcr.io/$GCR_PROJECT_ID/$CONTAINER_NAME

gcloud config set project $PROJECT_ID
gcloud builds submit --tag $IMAGE

gcloud beta run deploy $DEPLOYMENT_NAME \
  --image $IMAGE \
  --platform managed \
  --memory=1Gi \
  --region=us-central1 \
  --set-env-vars=APP_ENV=$APP_ENV,CLIENT_ENV=prod