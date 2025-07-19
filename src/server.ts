import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import app from './app';
import mongoose from 'mongoose';


dotenv.config(); 

const PORT = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qogqlqn.mongodb.net/LibraryManagementSystem?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// app.listen(PORT, async function () {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("LibraryManagementSystem").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// });

async function main(){
    try {
        // connect vis moongoose
        await mongoose.connect(uri);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

main();