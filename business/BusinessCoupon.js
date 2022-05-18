const database = require("../Database");

class BusinessCoupon {

  id = 0;
  businessid = 0;
  couponcode = "";
  startdate = "";
  enddate = "";
  status = "";
  description = "";
  db = new database.Database();

  constructor() {
    this.id = 0;
    this.businessid = 0;
    this.couponcode = "";
    this.startdate = "";
    this.enddate = "";
    this.status = "";
    this.description = "";
    this.query = "";
  }

  save = () => {
    if (this.id == 0) {
      this.query = "INSERT INTO business_coupons(businessid, couponcode, startdate, enddate, status, description) ";
      this.query += "VALUES(" + this.businessid + ", '" + this.couponcode +  "', ";
      this.query += "STR_TO_DATE('" + this.startdate + "', '%d/%m/%Y'), ";
      this.query += "STR_TO_DATE('" + this.enddate + "', '%d/%m/%Y'), ";
      this.query += "'close', '" + this.description + "')";
    } 
    else {
      this.query = "UPDATE business_coupons SET  businessid = " + this.businessid + ", ";
      this.query += "couponcode = '" + this.couponcode + "', ";
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
    this.query = "SELECT * FROM  business_coupons WHERE id = " + this.id;
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        //this.db.close();
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  getproducts = () => {
    this.query = "SELECT * FROM business_couponproducts WHERE couponid = " + this.id;
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  list = () => {
    this.query = "SELECT * FROM  business_coupons WHERE businessid = " + this.businessid + " ORDER BY startdate";
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  delete = () => {
    this.query = "DELETE FROM business_couponproducts WHERE couponid = " + this.id;
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        if (err) reject(err);

        this.query = "DELETE FROM  business_coupons WHERE id = " + this.id;
        this.db.query(this.query, (err, result) => {
        this.db.close();
          if (err) reject(err);
        resolve(result);
      });
    });
  });
  };

  addproduct = (productid) => {
    this.query = "INSERT INTO business_couponproducts(couponid, productid) VALUES(" + this.id + ", " + productid + ")";
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  removeproduct = (productid) => {
    this.query = "DELETE FROM business_couponproducts WHERE couponid = " + this.id + " AND productid = " + productid;
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
    BusinessCoupon: BusinessCoupon
};
