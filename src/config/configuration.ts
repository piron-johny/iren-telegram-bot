import { registerAs } from '@nestjs/config';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 8081,
  host: process.env.HOST,

  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  },

  bot_token: process.env.BOT_TOKEN,
});