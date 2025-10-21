import app from "./app";
import { ENV } from "./config/env";

app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
  console.log(`📘 Swagger UI: http://localhost:${ENV.PORT}/swagger`);
});
