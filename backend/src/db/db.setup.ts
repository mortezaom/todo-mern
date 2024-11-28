import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { UserEntity } from "../entities";
import { Env } from "../env";
import { TaskEntity } from "../entities/task.entity";

export const AppDataSouce = new DataSource({
  type: "mysql",
  database: Env.dbName,
  host: Env.host,
  username: Env.username,
  password: Env.password,
  port: Env.dbPort,
  logging: false,
  synchronize: true,
  entities: [UserEntity, TaskEntity],
  entitySkipConstructor: true,
  namingStrategy: new SnakeNamingStrategy(),
});
