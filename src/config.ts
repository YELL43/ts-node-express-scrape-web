import dotenv from 'dotenv';
const PATH_ENV = __dirname + `/../.env.${process.env.NODE_ENV}`;

dotenv.config({
  path: PATH_ENV,
});

export default {
  port: process.env.PORT || '3000',
  host: process.env.HOST,
  db: {
    host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  }
};
