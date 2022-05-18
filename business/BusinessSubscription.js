const database = require("../Database");

class BusinessSubscription {

  id = 0;
  businessid = 0;
  email = "";
  query = "";

  db = new database.Database();

  constructor() {
    this.id = 0;
    this.businessid ="";
    this.email = "";

    this.query = "";
  }

  save = () => {
    this.query = "INSERT INTO business_subscriptions(businessid, email) ";
    this.query +="VALUES(" + this.businessid + ", '" + this.email + "')";
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  };


  list = () => {
    this.query = "SELECT * FROM business_subscriptions WHERE businessid = " + this.businessid;
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  delete = () => {
    this.query = "DELETE FROM business_subscriptions WHERE businessid = " + this.businessid + " AND email = '" + this.email + "'";
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) reject(err);
        resolve(result);
      });
    });
  };
}

module.exports = {
    BusinessSubscription: BusinessSubscription
};
