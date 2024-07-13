// Update with your config settings.
import dotenv from 'dotenv'
dotenv.config({ path: './src/config/config.env' })
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.HOST_DB,
      port: process.env.PORT_DB,
      user: process.env.USER_DB,
      password: process.env.PASSWD_DB,
      database: process.env.NAME_DB
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds/dev',
    },
    useNullAsDefault: true,
    log:{
      warn(message) {
        console.log(message.message);
      },
      error(message) {
        console.error(message.message);
      },
      debug(message) {
        console.log(message.message);
      }
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
