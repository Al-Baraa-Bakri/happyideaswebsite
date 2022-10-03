const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
    {
        password : {
            type : String
        }
    }
);

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
