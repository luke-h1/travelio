Travel journal

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

This project is a travel journal. It is a Next.js website that allows users to create, read, update and delete holidays. The entries are then stored via prisma and can be viewed on a map.



### Todo

-  ✅ Authentication
-  ✅ User roles
-  ✅ Holiday card
-  ✅ Navigation

-  ❌ User profiles
-  ❌ User settings

-  ❌ Add a map to the holiday pages with geojson data
-  ❌ Create, update and delete hols
-  ❌ View hols on a timeline
-  ❌ hol state management
-  ❌ hol search
-  ❌ hol filters
-  ❌ hol sorting
-  ❌ hol pagination

-  ❌ Admin utils


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

### Deployment

TBD. Vercel for frontend, Fly.io or https://render.com for DB probably.


### Build

[![CI / Build](https://github.com/luke-h1/travelio/actions/workflows/build.yml/badge.svg)](https://github.com/luke-h1/travelio/actions/workflows/build.yml)

