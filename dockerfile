FROM node
WORKDIR /home/node/app
COPY * ./
# COPY models ./
# COPY node_modules ./
RUN npm install