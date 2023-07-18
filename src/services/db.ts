import { DataSource } from "typeorm";
import { CreateMigration1566993933823 } from "../migrations/1566993933823-CreateMigration";
import { dbConfig } from "../config/db";

const { host, database, password, user } = dbConfig;

export const myDataSource = new DataSource({
  type: "mysql",
  host: host,
  username: user,
  password,
  database,
  entities: ["src/entity/*.entity.ts"],
  logging: true,
  migrationsRun: true,
  migrations: [CreateMigration1566993933823],
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
