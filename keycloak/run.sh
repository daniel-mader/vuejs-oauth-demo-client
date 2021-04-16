#!/bin/sh

docker run \
  --rm \
  --name keycloak_demo \
  -p 8443:8443 \
  -p 8080:8080 \
  -e DB_VENDOR=H2 \
  -e KEYCLOAK_USER=admin \
  -e KEYCLOAK_PASSWORD=admin \
  -e KEYCLOAK_IMPORT=/tmp/realm.json \
  -v $(pwd)/realm.json:/tmp/realm.json \
  jboss/keycloak:latest
