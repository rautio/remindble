# Reminder Service

## Getting started

```bash
docker build -t reminder .
docker run --name reminder --env-file .env --net host -it reminder /bin/sh
docker exec -it reminder /bin/sh
```

Clenup:

```bash

docker rm reminder
docker image rm reminder
```
