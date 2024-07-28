FROM node:20.8.0

WORKDIR /app

# Define build argument for JWT key
ARG JWT_KEY

# Set the environment variable
ENV JWT_KEY=$JWT_KEY

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start" ]