import session from "express-session";
import Keycloak from "keycloak-connect";
import { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env";

const keycloakConfig = {
  realm: ENV.REALM || "",
  "auth-server-url": ENV.AUTH_URL || "",
  "ssl-required": "external",
  resource: ENV.CLIENT_ID || "",
  "public-client": false,
  "confidential-port": 0,
  credentials: {
    secret: ENV.CLIENT_SECRET || "",
  },
};

const memoryStore = new session.MemoryStore();
export const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

export const sessionMiddleware = session({
  secret: "some-secret",
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
});

export const authMiddleware = (role?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const protector = role ? keycloak.protect(role) : keycloak.protect();
    protector(req, res, next);
  };
};
