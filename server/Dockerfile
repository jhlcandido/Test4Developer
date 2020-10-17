from node:alpine
workdir /usr/test4developer/api
copy package*.json ./
run npm install
copy . .

expose 4000 9229

cmd ["npm", "run", "dev"]