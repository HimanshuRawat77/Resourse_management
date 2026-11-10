FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --omit=dev
COPY server/ ./
COPY database/schema.sql /app/database/schema.sql
COPY --from=client-build /app/client/dist ./public

ENV NODE_ENV=production
EXPOSE 5000
CMD ["npm", "start"]
