from node:alpine
workdir /usr/app
copy package*.json ./
run npm install
copy . .

expose 4000

cmd ["npm", "run", "dev"]