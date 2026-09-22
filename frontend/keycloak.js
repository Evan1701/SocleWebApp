import Keycloak from 'keycloak-js';
require('dotenv').config();

const keycloak = new Keycloak({
  url: process.env.VITE_KC_URL,
  realm: process.env.VITE_KC_REALM,
  clientId: process.env.VITE_KC_CLIENT_ID,
});

export default keycloak;