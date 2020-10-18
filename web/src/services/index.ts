import { isDev } from "../utils";
let api_uri = "";

if (isDev()) api_uri = "http://192.168.1.92:4000";
else api_uri = "http://ec2-13-58-120-211.us-east-2.compute.amazonaws.com/test4developer-api";

export { api_uri };
