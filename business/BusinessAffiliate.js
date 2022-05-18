let Database = require("../Database");
var fs = require("fs")

class BusinessAffiliate {

  id = 0;
  businessid = 0;
  userid = 0;
  requestedon = "";
  approvedon = "";
  status = "";

  db = new Database.Database();

  constructor() {
    this.id = 0;
    this.businessid = 0;
    this.userid = 0;
    this.requestedon = "";
    this.approvedon = "";
    this.status = "";
  }

  save = () => {
    this.query = "INSERT INTO business_affiliates(businessid, userid, requestedon, status) ";
    this.query +="VALUES(" + this.businessid +  ", " + this.userid + ", ";
    this.query +="CURDATE(), 'pending')";
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

  
  changestatus = () => {
    this.query = "UPDATE business_affiliates SET status = '" + this.status + "' ";
    if(this.status == "approved")
    {
      this.query += ", approvedon = CURDATE() ";      
    }
    this.query +="WHERE id = " + this.id;
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

  get = () => {
    this.query = "SELECT * FROM business_affiliates WHERE id = " + this.id;
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

  list = () => {
    this.query = "SELECT * FROM business_affiliates WHERE businessid = " + this.businessid + " ORDER BY id";
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

  delete = () => {
    this.query = "DELETE FROM business_affiliates WHERE businessid = " +  this.businessid + " AND userid = " + this.userid;
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
}
module.exports={
    BusinessAffiliate:BusinessAffiliate
}