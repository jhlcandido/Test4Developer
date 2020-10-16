from node:alpine
workdir /usr/test4developer/api
copy package*.json ./
run npm install
copy . .

expose 4000

cmd ["npm", "run", "dev"]