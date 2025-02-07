import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import config from './config';
import { AppDataSource } from './database/connection';

//-- routers
import routes from './routes';
// import { INextFunction, IRequest, IResponse } from './types/types';

export class RunApplication {
  private app: Application;

  constructor() {
    this.app = express();
    this.dbConnection();
    this.middlewares();
    this.routes();
    this.catchError();
  }

  async dbConnection() {
    try {
      console.log('ENV connection -> ', config.db);
      AppDataSource.initialize()
        .then((connect) => {
          console.log('Database connected ', connect.driver.database);
        })
        .catch((error) => console.log('error -> ', error));
    } catch (error: any) {
      console.error(error, 'Error connecting to DB');
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.json());

    const staticPath = path.join(__dirname, '../public');
    console.log(staticPath);
    this.app.use(express.static(staticPath));
  }

  routes() {
    const prefixApi = 'api';
    this.app.use(`/${prefixApi}`, routes);
  }

  catchError() {
    this.app.use(
      (err: any, req: any, res: any, next: any) => {
        console.log('## catchError ## ------> ', err);
        return res.status(200).json({
          statusCode: err?.statusCode || 500,
          message: err?.message || 'Error Server',
        });
      },
    );
  }

  listen() {
    this.app.listen(config.port, () => {
      console.log(`Server up and running at port: ${config.port}`);
    });
  }
}
