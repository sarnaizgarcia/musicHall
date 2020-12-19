#! /bin/bash
echo "Cleaning logs"

if [ -f "./nohup.out" ]; then
  rm nohup.out
fi

echo "Starting app env"
nohup docker-compose up &
npx ng serve --hmr
