import { join } from "path";
import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();
import { ENV } from "./env";

const doc = {
  info: {
    title: "Common BFE API",
    version: "1.0.0",
  },
  security: [
    {
      KeycloakAuth: ["openid", "profile"],
    },
  ],
  schemes: ["http"],
  securityDefinitions: {
    KeycloakAuth: {
      type: "oauth2",
      authorizationUrl: `${ENV.AUTH_URL}/realms/${ENV.REALM}/protocol/openid-connect/auth`,
      flow: "accessCode",
      tokenUrl: `${ENV.AUTH_URL}/realms/${ENV.REALM}/protocol/openid-connect/token`,
      scopes: {
        openid: "OpenID Connect scope",
        profile: "User profile",
      },
    },
  },
};

const outputFile = join(process.cwd(), "src", "swagger", "output.json");
const endpointsFiles = ["../routes/index.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
