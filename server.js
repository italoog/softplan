const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'mock', 'db.json'));
const middlewares = jsonServer.defaults();

// Define the rules for the authentication
const rules = auth.rewriter({
  // Permission rules
  users: 660,
  messages: 640,
  // Add your custom rules here
});

// Use the auth middleware and the rules
server.db = router.db;
server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});
