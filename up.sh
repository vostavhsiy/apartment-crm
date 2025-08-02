#!/bin/bash
npm run dev:up
npx wait-port 5432
npx wait-port 6379
nx run api:migrate
