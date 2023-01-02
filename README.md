## Travel journal built with Next.js, Prisma & Nextauth

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/)
- [NVM](https://github.com/nvm-sh/nvm)

Install NPM packages

```
pnpm i
```


### Overview

Travel journal / tracker

### Development

<br />

Start the docker DB

```
docker-compose up
```

Make migrations

```
pnpm run db:push
```

Start prisma studio

```
pnpm run db:studio
```

Start the frontend server

```
pnpm run dev
```


### Build

[![CI / Build](https://github.com/luke-h1/travelio/actions/workflows/build.yml/badge.svg)](https://github.com/luke-h1/travelio/actions/workflows/build.yml)

