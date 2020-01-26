FROM grpc-common

WORKDIR /code
COPY grpc-service/package.json /code/package.json

RUN npm install

COPY grpc-service/ /code

COPY messages /code/messages

CMD ["node", "server.js"]
