FROM node

WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.docker .env
RUN npx prisma generate
RUN npm run build
ENTRYPOINT [ "npm", "run", "start" ]