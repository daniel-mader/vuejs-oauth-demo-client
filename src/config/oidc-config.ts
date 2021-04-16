const KEYCLOAK_URL = "http://localhost:8080/auth/realms/workshop";
const CLIENT_ID = "vuejs-demo-app";
const CLIENT_BASE_URL = "https://localhost:4200";

export const userManagerConfig = {
  authority: KEYCLOAK_URL,
  client_id: CLIENT_ID,
  redirect_uri: CLIENT_BASE_URL + "/callback.html",
  automaticSilentRenew: true,
  silent_redirect_uri: CLIENT_BASE_URL + "/silent-renew.html",
  response_type: "code",
  scope: "openid profile",
  post_logout_redirect_uri: CLIENT_BASE_URL + "/",
  filterProtocolClaims: true,
};
