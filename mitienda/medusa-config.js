const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "/http:\/\/*/";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "/http:\/\/*/";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://medusaserverdatabase_08wx_user:Gc88ylGNKK78PmnW6miZjOxtBBCUvWt6@dpg-clmatphfb9qs739ai6f0-a/medusaserverdatabase_08wx";

const REDIS_URL = process.env.REDIS_URL || "redis://red-clmauphfb9qs739aimq0:6379";

const SEC_API_KEY = "sk_test_51MOWnmJYOorQDptOW0QQsts0GRYV6JStvh1nXSRqMSUHna1rEQhU6cXRbzyZ1hJtwN3EuYG4v9dI6IHGaHq3H4Oq00s4iQb1A7"
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: SEC_API_KEY,
    },
  },
];

const modules = {
  /*eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  redis_url: REDIS_URL,
  database_url: DATABASE_URL,
  database_type: "postgres",
  store_cors: STORE_CORS,
  admin_cors: ADMIN_CORS,
};


/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
