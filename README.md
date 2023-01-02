## Travel journal built with Next.js, Prisma & Nextauth

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [NPM](https://npmjs.com)
- [NVM](https://github.com/nvm-sh/nvm)

Install NPM packages

```
npm ci
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
npm run db:push
```

Start prisma studio

```
npm run db:studio
```

Start the frontend server

```
npm run dev
```


### Build

[![CI / Build](https://github.com/luke-h1/travelio/actions/workflows/build.yml/badge.svg)](https://github.com/luke-h1/travelio/actions/workflows/build.yml)

