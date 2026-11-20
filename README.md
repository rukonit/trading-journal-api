# Trading Journal API

## Run with Docker Compose

Docker Compose starts a local PostgreSQL database, applies Prisma migrations, and then starts the API:

```bash
docker compose up --build
```

Open the GraphQL endpoint at <http://localhost:4000/graphql>.

The database is stored in the `postgres_data` volume and survives container restarts. The default database credentials in `compose.yaml` are for local development only. Set `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` in your environment to override them.

Stop the services with `docker compose down`. To also remove the local database volume, run `docker compose down -v`.

## Build and run the image separately

```bash
docker build -t trading-journal-api .
docker run --rm -p 4000:4000 \
  -e DATABASE_URL='postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public' \
  trading-journal-api
```

The standalone image expects a reachable PostgreSQL database. Apply migrations before starting the API:

```bash
docker run --rm \
  -e DATABASE_URL='postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public' \
  trading-journal-api npm run migrate:deploy
```

When connecting to a database on the host from Docker Desktop, use `host.docker.internal` for `HOST`, not `localhost`.
