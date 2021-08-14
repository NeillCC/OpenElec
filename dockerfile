FROM node
WORKDIR /home/node/app
COPY *.js* ./
RUN npm install