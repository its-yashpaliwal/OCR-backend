const mongoose = require('mongoose');


const DB = 'mongodb+srv://yashpaliwal345:Yash@123@cluster0.ybny3pm.mongodb.net/OCRDB?retryWrites=true&w=majority';




 
const connectToMongo = async() => {
  await mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, 
},()=>{
  console.log("connected to mongo atlas Successfully");
});
}
// const connectToMongo = async() => {
//     await mongoose.connect(DB,()=>{
//        console.log("connected to mongo atlas Successfully");
//     })   
//   }

module.exports = connectToMongo;