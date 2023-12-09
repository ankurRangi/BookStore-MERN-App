import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import { request } from "http";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Handle JSON input from the APIs
app.use(express.json());


// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);


// Basic API structure.
// app.API('/endpoint', callbackfunction => {return});

// Route for landing page.
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack")
});

// Adding Routes to the APP
app.use('/books', booksRoute);

// Connect the data with error handling
mongoose
    .connect(mongoDBURL)
    .then(() => {

        console.log('\n\n\x1b[36m%s\x1b[0m', 'App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
