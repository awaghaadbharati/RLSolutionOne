/*1. Write software that reads the CSV data (of books, magazines, and authors) given on
the next page.
2. Print out all books and magazines (on either console UI) with all their details (with a
meaningful output format).
3. Find a book or magazine by its ISBN.
4. Find all books and magazines by their authors’ email.
5. Print out all books and magazines with all their details sorted by title. This sort
should be done for books and magazines together.
6. Add a book and a magazine to the data structure of your software and export it to a
new CSV file.
*/
var express = require('express');
const cors = require('cors')
var app = express();
//use express.json to understand request body
app.use(express.json())
//require('./models/db')

/*app.get('*', function(req, res){
	res.status(404).json({"WHException":{"maxSeverity":3, "errors":["NOT_FOUND"]}})
});*/
//const cart=require('./routes/authors_routes')
const authors=require('./routes/authors_routes')
app.use('/authors',authors)
const publications=require('./routes/publications_routes')
app.use('/publications',publications)

app.listen('8000' , err => {
   if(err) console.log(err)
   console.log('Server is started at PORT number : 8000')
})
