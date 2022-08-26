const ronin = require('ronin-server');
const mocks = require('ronin-mocks');
const database = require('ronin-database');

const server = ronin.server();

database.connect(process.env.CONNECTIONSTRING);

server.use('/foo', (req, res) => res.json({ foo: 'bar2' }));

server.use('/', mocks.server(server.Router(), false, true));
server.start();

/*
docker run -it --rm -d -v node-docker-mongodb:/data/db \
  -v node-docker-mongodb_config:/data/configdb -p 27017:27017 \
  --network node-docker-mongodb \
  --name mongodb \
  mongo

docker run \
  -it --rm -d \
  --network node-docker-mongodb \
  --name rest-server \
  -p 8000:8000 \
  -e CONNECTIONSTRING=mongodb://mongodb:27017/notes \
  node-docker
*/
