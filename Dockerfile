FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx webpack

EXPOSE 8080

ENTRYPOINT [ "npx","serve","-l", "8080" ]