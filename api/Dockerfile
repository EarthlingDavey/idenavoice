FROM node:12

RUN mkdir -p /app
WORKDIR /app

# COPY package.json .
RUN yarn install
# COPY . .

EXPOSE 4001

COPY ./docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
