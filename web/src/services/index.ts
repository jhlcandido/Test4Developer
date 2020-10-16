import { isDev } from "../utils";
let api_uri = "";

if (isDev()) api_uri = "http://192.168.1.92:4000";
else api_uri = "https://api-test4developer.herokuapp.com";

export { api_uri };
