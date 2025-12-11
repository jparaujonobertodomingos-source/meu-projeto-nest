const { DataSource } = require("typeorm");

module.exports = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "meubanco",
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migrations/*.js"],
});
