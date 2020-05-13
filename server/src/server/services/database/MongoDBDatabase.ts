import { default as mongoose, Connection, Schema } from 'mongoose';
import { default as faker } from 'faker';

import { ILogger } from '../logger';
import { IConfig } from '../config';
import {
  Shoe,
  IShoe,
  Member,
  IMember,
  IPortfolio,
  Portfolio,
  IValue,
  Value
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
    role : string,
    firstName: string,
    lastName: string,
    shoeSize : number,
    email : string,
    ) => {
      
      const memberDetails = {
        role,
        firstName,
        lastName,
        shoeSize,
        email
      }
      const member = new Member(memberDetails);
  
      try {
        const newMember = await member.save();

        this.createPortfolio(newMember._id);
      
        this.logger.info(`Member created with id ${newMember._id}`, {});
      } catch (error) {
        this.logger.error('An error occurred when creating a member', error);
      }
    };

  private createMembers = async () => {
    const promises = [];
    // const fn = faker.name.firstName();
    // const ln = faker.name.lastName();
    for (let i = 0; i < 10; i++) {
      promises.push(
        this.memberCreate(  
          'admin',
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
    productSku : string,
    imageUrl : string
    ) => {
      
      const shoeDetails = {
        shoeName,
        shoeBrand,
        productSku,
        imageUrl
      }
      const shoe = new Shoe(shoeDetails);
  
      try {
        const newShoe = await shoe.save();
  
        this.logger.info(`Shoe created with id ${newShoe._id}`, {});
      } catch (error) {
        this.logger.error('An error occurred when creating a shoe', error);
      }
    };

    private getData = async (kw: string) => {
      const fetch = require("node-fetch");
      // kw specifies the search term for items to add to db
      const modifiedUrl = `https://stockx.com/api/browse?productCategory=sneakers&currency=EUR&_search=${kw}&dataType=product&country=BE`;
      const response  = await fetch(modifiedUrl, {
          method: 'GET',
          headers: {
          'accept': '*/*', 'accept-encoding': 'gzip, deflate, br', 
          'accept-language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6,de;q=0.5',
          'appos': 'web', 'appversion': '0.10', 'pragma': 'cache', 'sec-fetch-mode': 'cors', 
          'sec-fetch-site': 'same-origin', 
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36', 
          'x-anonymous-id': 'undefined', 'x-requested-with': 'XMLHttpRequest'}
      });
  
      const data = await response.json()
      const products = data['Products'];
      return products
    }
   
    private createShoes = async () => {
      const promises = [];

      
      const products = await this.getData('Jordan 1 Womens')


      for (let i = 0; i < products.length ; i++) {
        promises.push(
          this.shoeCreate(
            products[i]['title'],
            products[i]['brand'],
            products[i]['styleId'],
            products[i]['media']['smallImageUrl']
          ),
        );
      }
      return await Promise.all(promises);
    };

    private portfolioCreate = async (
      totalWorth : string,
      totalItems: number,
      referredValues : Array<Schema.Types.ObjectId>,
      referredMember : Schema.Types.ObjectId
      ) => {
        
        const portfolioDetails = {
          totalWorth,
          totalItems,
          referredValues,
          referredMember
        }
        const portfolio = new Portfolio(portfolioDetails);
    
        try {
          const newPortfolio = await portfolio.save();
    
          this.logger.info(`Portfolio created with id ${newPortfolio._id}`, {});
        } catch (error) {
          this.logger.error('An error occurred when creating a portfolio', error);
        }
      };
  
    private createPortfolio = async ($id : Schema.Types.ObjectId) => {
      const promises = [];
      // const fn = faker.name.firstName();
      // const ln = faker.name.lastName();
        promises.push(
          this.portfolioCreate(  
            '0',
            0,
            null,
            $id
          ),
        );
      
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