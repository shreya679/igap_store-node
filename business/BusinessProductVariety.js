let Database = require("../Database");

class BusinessProductVariety {
    
    id = 0;
    productid = 0;
    size = "";
    color= "";
    weight = 0;
    mrp  = 0;
    price   = 0;
    instock  = "";
    status  = "";
    query = "";

    db = new Database.Database();

    constructor() {
        this.id = 0;
        this.productid = 0;
        this.size = "";
        this.color = "";
        this.weight = 0;
        this.mrp  = 0;
        this.price = 0;
        this.instock  = "";
        this.status  = "";
    }
    save = () => {
        if (this.id == 0) {
       
            this.query = "INSERT INTO business_productvarieties(productid, size, color, weight, mrp, price, instock, status) ";
            this.query += "VALUES (" + this.productid + ", '" + this.size + "', '" + this.color + "', '" + this.weight + "', '" + this.mrp + "', '" + this.price + "', '" + this.instock + "', 'open')";
        }
        else {
            this.query = "UPDATE business_productvarieties SET productid = " + this.productid + ", ";
            this.query += "size = '" + this.size + "', ";
            this.query += "color = '" + this.color + "', ";
            this.query += "weight = " + this.weight + ", ";
            this.query += "mrp = " + this.mrp + ", ";
            this.query += "price = " + this.price + ", ";
            this.query += "instock = '" + this.instock + "' ";
            this.query+="WHERE id =" + this.id;
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
    }

    delete = () => {
        this.query = "DELETE FROM business_productvarieties WHERE id = " + this.id;
        console.log(this.query);
        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    changestatus = () => {
        this.query = "UPDATE business_productvarieties SET status = '" + this.status + "' WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    changestock = () => {
        this.query = "UPDATE business_productvarieties SET instock = '" + this.instock + "' WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    get = () => {
        this.query = "SELECT * FROM business_productvarieties WHERE id = " + this.id;
        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    } 

    list = () => {
        this.query = "SELECT * FROM business_productvarieties WHERE productid = " + this.productid;
        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}

module.exports = {
    BusinessProductVariety: BusinessProductVariety
}