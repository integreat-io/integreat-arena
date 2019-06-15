# Arena server for Bull and Bee queues

This is a server wrapper around [Arena](https://github.com/bee-queue/arena),
built for the needs of Integreat.

Features (in addition to Arena):

- Read queue configurations from env var
- Sign in with Auth0

## Configuration

Use the following env vars to configure:

- `PORT`: Port number for Arena server. Default is 4567
- `OFFICIAL_URL`: Public URL to the Arena installation, for building callback
  urls from Auth0

- `AUTH0_CLIENT_ID`: Client ID from Auth0
- `AUTH0_DOMAIN`: App domain from Auth0
- `AUTH0_CLIENT_SECRET`: Client secret from Auth0
- `AUTH0_CALLBACK_URL`: Call back url sent to Auth0. Should be the public url of
  the Arena server with a `/callback` path
- `EXPRESS_SESSION_SECRET`: A random secret for signing tokens

- `REDIS_HOST`: Host name to Redis server
- `REDIS_PORT`: Port number to Redis server
- `REDIS_PASSWORD`: Password to Redis server (or blank)

- `ARENA_QUEUES_JSON`: A JSON of the `queues` array given to Arena. See
  [Arena documentation](https://github.com/bee-queue/arena#prerequisites). Note
  that host, port, and password will be set if not provided in the queues json.
