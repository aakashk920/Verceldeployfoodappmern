const mongoose = require('mongoose');
const URL = 'mongodb+srv://aakash:12345@gofood.mupdoix.mongodb.net/GoFoodMernApp?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully....");

    const fetched_data = mongoose.connection.db.collection("food");
    const data = await fetched_data.find({}).toArray();

    const foodCat =  mongoose.connection.db.collection("fooditems");
    const categoryData= await foodCat.find({}).toArray();
    global.food = data;

    // console.log("Data fetched successfully:", data);
    global.fooditems = categoryData;
    // console.log(global.food);
  } catch (error) {
    console.error("MongoDB connection or data fetch error:", error);
  }
}

module.exports = mongoDB;