docker build -t api:latest .
docker save api:latest | gzip > api.tar.gz
