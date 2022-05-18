const database = require("../Database");
var fs = require("fs");

class BusinessBlogCategory {

    id = 0;
    businessid = 0;
    title = "";
    urltitle = "";
    query = "";
    srno = 0;

    db = new database.Database();

    constructor() {
        this.id = 0;
        this.businessid = 0;
        this.title = "";
        this.urltitle = "";
        this.srno = 0;
        this.query = "";
      }

      save = () => {
        if (this.id == 0) {
          this.query = "INSERT INTO business_blogcategories (businessid, title, urltitle, srno) ";
          this.query += "VALUES(" + this.businessid + ", '" + this.title +  "', '" + this.urltitle + "', " + this.srno + ")";
        }
        else {
          this.query = "UPDATE business_blogcategories SET businessid = " + this.businessid + ", ";
          this.query += "title ='" + this.title + "', ";
          this.query += "urltitle ='" + this.urltitle + "', ";
          this.query += "srno = " + this.srno + " ";
          this.query += " WHERE id =" + this.id;
        }
        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err) {
                    return reject(err)
                };
                resolve(result);
            });
        });
    }

    list = () => {
        this.query = "SELECT * FROM business_blogcategories WHERE businessid = " + this.businessid + " ORDER BY srno";
        return new Promise((resolve, reject) => {
          this.db.query(this.query, (err, result) => {
            this.db.close();
            if (err) reject(err);
            resolve(result);
          });
        });
      };


      get=()=>{
        this.query = "SELECT * FROM business_blogcategories WHERE id = " + this.id;
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                this.db.close();
                if(err)
                    return reject(err);                
                resolve(result);
            });
        });          
    }

 
    delete=()=>{        
        this.query = "DELETE FROM business_blogcategories WHERE id = " + this.id;        
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                this.db.close();
                if(err)
                    return reject(err);                
                resolve(result);
            });
        });        
    };
}

module.exports = {
    BusinessBlogCategory: BusinessBlogCategory
};