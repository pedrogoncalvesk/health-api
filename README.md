# HEALTH API

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
$ cp .env.sample .env
```
`Note: fill the .env with the credentials`

## Running the app

```bash
# development mode (watch)
$ pnpm run start:dev

# debug mode
$ pnpm run debug

# production mode
$ pnpm run start
```

## Helpful links
- https://www.oracle.com/cloud/sign-in.html
- https://docs.nestjs.com/
- https://nodejs.org/en
- https://gregpoked.medium.com/connecting-dbeaver-to-oracle-free-cloud-tier-database-with-keyfiles-ed835f990031

## Oracle 
This project uses oracle autonomous database from ORACLE CLOUD

## Redis
```bash
# build redis image and detached
$ docker run --name redis-alpine -p 6379:6379 --hostname redis -v cache:/data -d redis:7.0.4-alpine --save 20 1 --loglevel warning --requirepass r123
```

## Docker 
```bash
# detached docker compose
$ docker compose up -d
```

# Conclusion
This project presents many stuffs about: API Rest, design pattern,microservices, good practices, clean architecture and docker.

I demonstrated a lot bunch of stuff about oracle database and build my own typeorm

We also saw how to use Redis with docker and the with docker-compose. We also added Redis as a cache to an existing NestJS API and witnessed the performance benefits.
