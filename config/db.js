// const mongoURI = require("./keys").mongoURI
const mongoose =require("mongoose") 
 
const connectDB = async () => {
	try {
		await mongoose.connect("mongodb+srv://sapractice:mt-london@10@cluster0.cpguae9.mongodb.net/quiz?retryWrites=true&w=majority", {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false, 
			useUnifiedTopology: true
		});
		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	} 
};
mongoose.Promise = global.Promise
module.exports = connectDB;
