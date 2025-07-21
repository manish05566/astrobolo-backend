# XaPads

Repostory for XaPads

## Prerequisite

Make sure if you have installed and configured below tools before your get started

- Node (v18.x)
- Yarn (v1.x)
- PostgreSQL (Database)

## Setup

Use the steps below to setup this repository on your local machine

### Clone

```
git clone https://github.com/xapads/xapads.git

// Git access and credentials required

// Change the working directory
cd xapads
```

### Configure

Copy the `.env.example` file to `.env`

```
cp .env.example .env
```

Update the required details and path as per your local setup

```
# NODE_ENV
NODE_ENV=development

# API
API_HOST=0.0.0.0
API_PORT=3000
LIMIT=15

# App
APP_BASE=http://localhost:4200

# Database
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=
DB_NAME=xapads
DB_PORT=5432
DB_RESET=false

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
MAIL_TEMPLATE_PATH=<path-mail-template>

# JWT
JWT_PRIVATE_KEY=<path-jwt-private.pem>
JWT_PUBLIC_KEY=<path-jwt-public.pem>
JWT_EXPIRY=3h
JWT_REFRESH_EXPIRY=7d
JWT_ISSUER=ImpulsiveWeb
JWT_ALGORITHM=RS256

# Storage
STORAGE_TYPE=DISK
UPLOAD_PATH=<path-uploads>

# Logs
LOG_FILE_NAME_FORMAT=YYYY-MM-DD
LOG_PATH=<path-logs>
LOG_LEVEL=DEBUG
```

### Install

```
yarn install
```

### Scripts

```
// start the app in dev mode
yarn start <app>

// build app
yarn build <app>

// test app
yarn test <app>

// lint app
yarn lint <app>

// generate
yarn g <command>

// nx cli
yarn nx <command>
```

### Commands

**Adding new library**

```
// Nest library
yarn g @nx/nest:lib <name> --directory=libs

// React library
yarn g @nx/react:lib <name> --directory=libs
```

**Adding Nest Module**

```
// In API
yarn g @nx/nest:module <name> --directory=apps/api

// In libs/modules
yarn g @nx/nest:module <name> --directory=libs/modules/lib

// Generating other files
yarn g @nx/nest:<type> <name> --directory=<path>

// Types module | controller | service for more details visit
// https://nx.dev/nx-api/nest

```

**Adding React**

```
// In Web
yarn g @nx/react:component <name> --directory=apps/web/pages

// In libs/ui
yarn g @nx/react:component <name> --directory=libs/ui/component

// For more details visit
// https://nx.dev/nx-api/react
```

> In all the commands please select the Derived path instead of as provided.

## Branching strategy

The below branching strategy will be used to manage this project on Github along with its CI/CD pipelines

### `main`

For production usages only

https://xapads.com

### `stage`

The `stage` branch is to release features for client demo.

https://stage.xapads.com

### `qa`

The `qa` branch is to release features for internal qa.

https://qa.xapads.com

### `dev`

The `dev` branch is to relase features for development.

https://dev.xapads.com

## Contribution guide

- No Direct pushing in to the `main` branch
- Developers checkout a new branch from `dev` for every new features
- Branch names should follow the pattern
  - `feat/<JiraId>` - for new features
  - `fix/<JiraId>` - for fixes and hot fixes
- PR must be created for `dev` branch
- A minimum of **two approvals** are required to merge any PR

## Resources

- [Scope](https://docs.google.com/spreadsheets/d/1JWUZS9pTCYveqOK4Y5UesmwSJZ345qhpM3uojA H359U/edit#gid=0)
