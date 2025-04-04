import { DataSource, DataSourceOptions } from "typeorm";
import { Environment } from "../config/environment";


const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: Environment.getVar('DB_HOST'),
  port: Number(Environment.getVar('DB_PORT')),
  database: Environment.getVar('DB_DATABASE'),
  username: Environment.getVar('DB_USERNAME'),
  password: Environment.getVar('DB_PASSWORD'),
  entities: [],
  migrations: [__dirname + '/migrations/*.ts'],
};

console.log(Environment.getVar('DB_PASSWORD'));

export default new DataSource(dataSourceOptions);
