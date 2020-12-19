#!/bin/sh

echo "Starting Nginx"
nginx -g 'daemon on;'
status=$?

if [ $status -ne 0 ]; then
  echo "Fail starting nginx"
  exit $status
fi

pm2 start index.js --name file-uploader --no-daemon
status=$?

if [ $status -ne 0 ]; then
  echo "Fail starting file-uploader server"
  exit $status
fi
