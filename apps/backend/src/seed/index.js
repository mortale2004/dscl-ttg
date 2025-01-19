const mongoose = require("mongoose");

const MONGODB_URI = 'mongodb://localhost:27017/db_dscl_ttg';

const connection = mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


connection.then(() => {
  console.log("Connected to the mongo database");

  const db = mongoose.connection.db;

Promise.all([

  db.collection("mas_layout_type").insertOne({
    _id: "1",
    layout_type_name: "ADMIN",
    is_active: true,
    added_by: "1",
    added_on: new Date(),
  }),

  db.collection("mas_user_role").insertOne({
    _id: "1",
    user_role_name: "SUPER_ADMIN",
    user_role_weight: 1,
    layout_type_id:"1",
    is_active: true,
    added_by: "1",
    added_on: new Date(),
  })
  ,
 db.collection("user_registration").insertOne({
    _id: "1",
    first_name: "Pavan",
    last_name: "Mortale",
    father_name: "Suryakant",
    user_role_ids: ["1"],
    username: "admin",
    password: "admin",
    added_by: "1",
    added_on: new Date(),
  })
]).then(()=>{

    console.log("Data inserted successfully");
}).catch(()=>{
    console.log("Error while seeding data");
}).finally(()=>{
    process.exit(0)
})


});
