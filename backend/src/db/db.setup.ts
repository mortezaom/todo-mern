import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Env } from "../env";

export const AppDataSource = new DataSource({
  type: "mysql",
  database: Env.dbName,
  host: Env.host,
  username: Env.username,
  password: Env.password,
  port: Env.dbPort,
  logging: false,
  synchronize: true,
  entities: [
    `${__dirname}/../entities/index.{ts,js}`,
  ],
  entitySkipConstructor: true,
  namingStrategy: new SnakeNamingStrategy(),
});
