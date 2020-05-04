import { default as mongoose, Connection } from 'mongoose';
import { default as faker } from 'faker';

import { ILogger } from '../logger';
import { IConfig } from '../config';
import {
  Shoe,
  IShoe,
} from '../../models/mongoose';

class MongoDBDatabase {
  private config: IConfig;
  private logger: ILogger;
  private db: Connection;

  private shoes: Array<IShoe>;

  constructor(logger: ILogger, config: IConfig) {
    this.logger = logger;
    this.config = config;

    this.shoes = [];
  }

  public connect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongoose
        .connect(this.config.mongoDBConnection, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(data => {
          this.db = mongoose.connection;

          this.logger.info('Connected to the mongodb database', {});

          resolve(true);
        })
        .catch(error => {
          this.logger.error("Can't connect to the database", error);

          reject(error);
        });
    });
  }

  public disconnect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db
        .close(true)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          this.logger.error("Can't disconnect the database", error);

          reject(error);
        });
    });
  }

  private shoeCreate = async (
    shoeName: string,
    shoeBrand: string,
    productSku : string
    ) => {
      
      const shoeDetails = {
        shoeName,
        shoeBrand,
        productSku
      }
      const shoe = new Shoe(shoeDetails);
  
      try {
        const newDrink = await shoe.save();
  
        this.logger.info(`Message created with id ${newDrink._id}`, {});
      } catch (error) {
        this.logger.error('An error occurred when creating a message', error);
      }
    };

    private createShoes = async () => {
      const promises = [];

      for (let i = 0; i < 10; i++) {
        promises.push(
          this.shoeCreate(
            faker.lorem.word(),
            faker.company.companyName(),
            faker.random.uuid()
          ),
        );
      }
      return await Promise.all(promises);
    };

    public seed = async () => {
    this.shoes = await Shoe.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createShoes();
        }
        return Shoe.find().exec();
      });
  }

  // private getRandomPostsAsArrayOfIds(nPosts: number) {
  //   const tempPosts = JSON.parse(JSON.stringify(this.posts)) as Array<IPost>;
  //   const arrayOfIds = [];
  //   while (arrayOfIds.length < nPosts) {
  //     const removedPost = tempPosts.splice(
  //       Math.floor(Math.random() * nPosts),
  //       1,
  //     )[0];
  //     arrayOfIds.push(removedPost._id);
  //   }
  //   return arrayOfIds;
  // }
}

export default MongoDBDatabase;