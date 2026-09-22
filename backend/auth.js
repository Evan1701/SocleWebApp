import express from 'express';
import session from 'express-session';
import Keycloak from 'keycloak-connect';

const app = express();

// Session (obligatoire pour keycloak-connect)
const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

// Keycloak
const keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

// Route protégée
app.get('/protected', keycloak.protect(), (req, res) => {
  res.json({ message: 'Tu es authentifié via Keycloak !' });
});

app.listen(9000, () => {
  console.log('API running on http://localhost:9000');
});