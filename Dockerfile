FROM mhart/alpine-node

RUN mkdir -p /code/api
WORKDIR /code/api
ADD . /code/api
RUN npm install

EXPOSE  80

CMD ["node", "index.js"]
