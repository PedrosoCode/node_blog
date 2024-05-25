// Script to save the JWT token to an environment variable
const jsonData = pm.response.json();
pm.environment.set("jwt_token", jsonData.token);
