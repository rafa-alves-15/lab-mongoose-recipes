const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(async () => {
    const result = await Recipe.create({
      title: "Macarrão",
      level: "Easy Peasy",
      ingredients: ["Macarrão", "Àgua", "Molho de Tomate", "Carne Moida"],
      cuisine: "Italiano",
      dihType: "main_course",
      image:
        "https://img.itdg.com.br/tdg/images/recipes/000/302/674/326343/326343_original.jpg?mode=crop&width=710&height=400",
      duration: 30,
      creator: "Chef Italiano",
    });
    const manyResult = await Recipe.insertMany(data);

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { new: true }
    );

    const deletedRecipe = await Recipe.deleteOne({
      title: "Carrot Cake",
    });
    mongoose.connection.close(); 
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
