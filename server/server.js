var express = require('express')
  , path = require('path')
  , routes = require('./routes')
  , nconf = require('./config')
  , swaggerJSDoc = require('swagger-jsdoc')
  , methodOverride = require('method-override')
  , errorHandler = require('errorhandler')
  , bodyParser = require('body-parser')
  , setAuthUser = require('./middlewares/setAuthUser')
  , neo4jSessionCleanup = require('./middlewares/neo4jSessionCleanup')
  , writeError = require('./helpers/response').writeError;

var app = express()
  , api = express();

app.use(nconf.get('api_path'), api);

var swaggerDefinition = {
  info: {
    title: 'Test API',
    version: '1.0.0',
    description: '',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
api.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', express.static(path.join(__dirname, 'swaggerUI')));
app.set('port', nconf.get('PORT'));

api.use(bodyParser.json());
api.use(methodOverride());

//enable CORS
api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//api custom middlewares:
api.use(setAuthUser);
api.use(neo4jSessionCleanup);


//map api end points to routes

api.get('/entity', routes.entity.list);
api.get('/entity/:id',  routes.entity.findById);
// api.get('/entity/officer/:id',  routes.entity.findByOfficer);
// api.get('/entity/address/:id',  routes.entity.findByAddress);


api.get('/officer', routes.officer.list);
api.get('/officer/:id',  routes.officer.findById);

api.get('/address', routes.address.list);
api.get('/address/:id',  routes.address.findById);

api.get('/intermediary', routes.intermediary.list);
api.get('/intermediary/:id',  routes.intermediary.findById);

api.post('/register', routes.user.register);
api.post('/login', routes.user.login);
api.get('/user/me', routes.user.me);

//api error handler
api.use(function(err, req, res, next) {
  if(err && err.status) {
    writeError(res, err);
  }
  else next(err);
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port') + ' see docs at /docs');
});