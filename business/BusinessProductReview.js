let Database = require("../Database");

class BusinessProductReview {

    id = 0;
    productid = 0;
    userid = 0;
    rating = 0;
    review = "";
    createdon = "";
    status = "";

    db = new Database.Database();

    constructor(){

        this.id = 0;
        this.productid = 0;
        this.userid = 0;
        this.rating = 0;
        this.review = "";
        this.createdon = "";        
        this.status = "";
    }

    save = ()=>{
        if(this.id == 0)
        {
            this.query = "INSERT INTO business_productreviews(productid, userid, rating, review, createdon, status) ";
            this.query += "VALUES(" + this.productid + ", " + this.userid + ", " + this.rating + ", '" + this.review + "', CURDATE(), 'close')";
        }
        else
        {
            this.query = "UPDATE business_productreviews SET rating = " + this.rating +", ";
            this.query += "review = '" + this.review + "' ";
            this.query += "WHERE id = " + this.id;
        }
        return new Promise((resolve, rejects)=> {
            this.db.query(this.query,(err, result)=>{
                this.db.close();
                if (err) {
                    return rejects(err);
                }
                resolve(result);
            });
        });        
    }

    get = () =>{
        this.query = "SELECT * FROM business_productreviews WHERE id = " + this.id;
        return new Promise((resolve, rejects)=> {
            this.db.query(this.query,(err, result)=>{
                this.db.close();
                if (err) {
                    return rejects(err);
                }
                resolve(result);
            });
        });        
    }

    list = () =>{
        this.query = "SELECT * FROM business_productreviews WHERE productid = " + this.productid + " ORDER BY createdon";
        return new Promise((resolve, rejects)=> {
            this.db.query(this.query,(err, result)=>{
                this.db.close();
                if (err) {
                    return rejects(err);
                }
                resolve(result);
            });
        });
    }
    
    delete = ()=>{
        this.query = "DELETE FROM business_productreviews WHERE id =" + this.id;
        return new Promise((resolve, rejects)=> {
            this.db.query(this.query,(err, result)=>{
                this.db.close();
                if (err) {
                    return rejects(err);
                }
                resolve(result);
            });
        });
    }

    changestatus = ()=>{
        this.query = "UPDATE business_productreviews SET status='" + this.status + "' WHERE id = " + this.id;
        return new Promise((resolve, rejects)=> {
            this.db.query(this.query,(err, result)=>{
                this.db.close();
                if (err) {
                    return rejects(err);
                }
                resolve(result);
            });
        });
    }
}

module.exports = {
    BusinessProductReview:BusinessProductReview
}