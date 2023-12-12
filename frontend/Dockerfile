FROM node:14
WORKDIR /
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]