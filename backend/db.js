const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://RishiRaj:pass%401234@cluster0.jrsg9du.mongodb.net/zaykadata?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,  // added for better connection handling
        });
        console.log("Connected to MongoDB");
        
        const fetched_data = await mongoose.connection.db.collection("foodData2").find({}).toArray();
        global.foodData2 = fetched_data;
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.foodCategory = foodCategory;
        console.log("Fetched data from MongoDB");
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;
