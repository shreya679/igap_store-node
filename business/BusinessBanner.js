let Database = require("../Database");
var fs = require("fs")

class BusinessBanner {

    id = 0;
    businessid = 0;
    title = "";
    picpath = "";
    imagecode = "";
    srno = 0;
    link = "";

    db = new Database.Database();

    constructor(){
        this.id = 0;
        this.title = "";
        this.businessid = 0;
        this.picpath = "";
        this.imagecode = "";
        this.link = "";
        this.srno = 0;
    }
    save=()=>{
        if (this.imagecode != "") {
            let base64image = this.imagecode.replace(/^data:image\/jpeg;base64,/, "");
            base64image = base64image.replace(/^data:image\/png;base64,/, "");            
            this.picpath = "businessbanners/" + Math.random().toString(36).substring(2, 7) + ".png";
            fs.writeFile("public/" + this.picpath, base64image, 'base64', function (err) {
                console.log("Error image saving-" + err);
            });
        }
        if(this.id==0){
            this.query = "INSERT INTO business_banners(title, businessid, picpath, srno, link) ";
           this.query += "VALUES('"+ this.title +"', "+ this.businessid +", '" + this.picpath + "', "+ this.srno +", '" + this.link + "')"; 
        }
        else {
            this.query = "UPDATE business_banners SET title = '" + this.title + "', ";
            this.query += "businessid = " + this.businessid + ", ";
            if(this.picpath != "")
                this.query += "picpath = '" + this.picpath + "', ";
            this.query += "srno = " + this.srno + ", ";
            this.query += "link = " + this.link + " ";
            this.query += "WHERE id = " + this.id;
        }        
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                this.db.close();
                if(err)
                    return reject(err);                
                resolve(result);
            });
        });           
    }

    get=()=>{
        this.query = "SELECT * FROM business_banners WHERE id = " + this.id;
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                this.db.close();
                if(err)
                    return reject(err);                
                resolve(result);
            });
        });           
    }

    list=()=>{
        this.query =  "SELECT * FROM business_banners WHERE businessid = " + this.businessid + " ORDER BY srno";
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
        this.query = "SELECT * FROM business_banners WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
            this.picpath = result[0].picpath;
            this.query = "DELETE FROM business_banners WHERE id = " + this.id;        
              this.db.query(this.query, (err, result) => {
                if (err) {
                  this.db.close();        
                  reject(err);
                }
                fs.unlink("public/" + this.picpath, (err)=>{
                  this.db.close();
                  resolve(result);
                });
              });
            });
        });
    };
}
module.exports={
    BusinessBanner:BusinessBanner
}