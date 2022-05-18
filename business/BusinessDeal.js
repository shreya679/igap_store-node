const database = require("../Database");
var fs = require("fs");

class BusinessDeal {

  id = 0;
  businessid = 0;
  title = "";
  startdate = "";
  enddate = "";
  picpath = "";
  imagecode = "";
  description = "";
  db = new database.Database();

  constructor() {
    this.id = 0;
    this.businessid = 0;
    this.title = "";
    this.startdate = "";
    this.enddate = "";
    this.imagecode= "";
    this.description = "";
    this.query = "";
  }

  save = () => {
    if (this.id == 0) {
      this.query = "INSERT INTO business_deals(businessid, title, startdate, enddate, description, status) ";
      this.query += "VALUES(" + this.businessid + ", '" + this.title +  "',";
      this.query += "STR_TO_DATE('" + this.startdate + "', '%d/%m/%Y'),";
      this.query += "STR_TO_DATE('" + this.enddate + "', '%d/%m/%Y'), '" + this.description + "', 'close')";
    } 
    else {
      this.query = "UPDATE business_deals SET businessid = " + this.businessid + ", ";
      this.query += "title = '" + this.title + "', ";
      this.query += "startdate = STR_TO_DATE('" + this.startdate + "', '%d/%m/%Y'), ";
      this.query += "enddate = STR_TO_DATE('" + this.enddate + "', '%d/%m/%Y'), ";
      this.query += "description = '" + this.description + "' ";
      this.query += " WHERE id =" + this.id;
    }
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

  get = () => {
    this.query = "SELECT * FROM  business_deals WHERE id = " + this.id;
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  };
 

  list = () => {
    this.query = "SELECT * FROM  business_deals WHERE businessid = " + this.businessid + " ORDER BY startdate";
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  delete = () => {
    this.query = "DELETE FROM  business_deals WHERE id = " + this.id;
    return new Promise((resolve, reject) => {
        this.db.query(this.query, (err, result) => {
            this.db.close();
            if (err) reject(err);
                resolve(result);
        });
    });
  };
    addproduct = (productid) => {
        this.query = "INSERT INTO business_dealproducts(dealid, productid) VALUES(" + this.id + ", " + productid + ")";
        return new Promise((resolve, reject) => {
        this.db.query(this.query, (err, result) => {
            this.db.close();
            if (err) reject(err);
            resolve(result);
        });
        });
    };

    removeproduct = (productid) => {
        this.query = "DELETE FROM business_dealproducts WHERE dealid = " + this.id + " AND productid = " + productid;
        return new Promise((resolve, reject) => {
        this.db.query(this.query, (err, result) => {
            this.db.close();
            if (err) reject(err);
            resolve(result);
        });
        });
    };

    
  getproducts = () => {
    this.query = "SELECT * FROM business_dealproducts WHERE dealid = " + this.id;
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
    BusinessDeal: BusinessDeal
};
