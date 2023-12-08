import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import { request } from "http";


const app = express();

// Handle JSON input from the APIs
app.use(express.json());

// Basic API structure.
// app.API('/endpoint', callbackfunction => {return});

// Route for landing page.
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack")
});

// Route for saving a new Book, Since mongoose is async
app.post('/book', async (request, response) => {
    try {
        // If any field is missing from user
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }
        // Create a instance of data from the request
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        // Create Book model object using the instance
        const book = await Book.create(newBook);

        return response.status(200).send(book);

    } catch (error) {
        console.log(error.message); // Printing to error to terminal
        response.status(500).send({ message: error.message }) // Sending the error back as the browser
    }
});

// Get all books from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message })
    }
});

// Get specify book from database with ID
app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message })
    }
});


// Update specify book from database with ID
app.put('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result){
            return response.status(400).json({message: 'Book not found!!!' });
        }
        return response.status(200).json(
            {
                message: 'Book updated successfully',
                data: result,
            }
        );

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message })
    }
});

// Route to delete a book with ID
app.delete('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result){
            return response.status(400).json({message: 'Book not found!!!' });
        }
        return response.status(200).json({message: 'Book deleted successfully'});

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message })
    }
});

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
