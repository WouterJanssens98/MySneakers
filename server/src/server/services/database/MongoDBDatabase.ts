import { default as mongoose, Connection } from 'mongoose';
import { default as faker } from 'faker';

import { ILogger } from '../logger';
import { IConfig } from '../config';
import {
  Shoe,
  IShoe,
  Member,
  IMember
} from '../../models/mongoose';

class MongoDBDatabase {
  private config: IConfig;
  private logger: ILogger;
  private db: Connection;

  private shoes: Array<IShoe>;
  private members: Array<IMember>;

  constructor(logger: ILogger, config: IConfig) {
    this.logger = logger;
    this.config = config;

    this.shoes = [];
    this.members = [];
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


  private memberCreate = async (
    firstName: string,
    lastName: string,
    shoeSize : number,
    email : string,
    ) => {
      
      const memberDetails = {
        firstName,
        lastName,
        shoeSize,
        email
      }
      const member = new Member(memberDetails);
  
      try {
        const newMember = await member.save();
  
        this.logger.info(`Message created with id ${newMember._id}`, {});
      } catch (error) {
        this.logger.error('An error occurred when creating a message', error);
      }
    };

  private createMembers = async () => {
    const promises = [];
    // const fn = faker.name.firstName();
    // const ln = faker.name.lastName();
    for (let i = 0; i < 10; i++) {
      promises.push(
        this.memberCreate(  
          faker.name.firstName(),
          faker.name.lastName(),
          faker.random.number(12),
          faker.internet.email()
        ),
      );
    }
    return await Promise.all(promises);
  };

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
    this.members = await Member.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createMembers();
        }
        return Member.find().exec();
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