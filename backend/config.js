export const PORT = 5555;

var username = encodeURIComponent("ankurRangi");
var password = encodeURIComponent("Glo8MFgf1a4w5gI2");

export const mongoDBURL = 
    `mongodb+srv://${username}:${password}@bookstore-mern.ki3tnph.mongodb.net/books-collection?retryWrites=true&w=majority`

// Add password and collection name to collection name.