const e = require('express');
const { query, response } = require('express');
const cors = require('cors')
const express = require('express')
const router = express.Router()
var connection = require('../models/db')
const mysql = require("mysql");
const fs = require("fs");
const Json2csvParser = require("json2csv").Parser;
/*Route to get all the authors in the csv*/
///*1. Write software that reads the CSV data (of books, magazines, and authors) given on
//the next page.
//2. Print out all books and magazines (on either console UI) with all their details (with a
//meaningful output format).
router.get('/getbooks',(req, res) => {
    const fs = require('fs'); 
    const csv = require('csv-parser');
    path="csv/books.csv"
    const results = [];
    fs.createReadStream(path)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => {results.push(data);
    addBooks(data.title, data.isbn,data.authors,data.description)
    })
    .on('end', () => {
    console.log(results);
    const resultobj = {
      message: "CSV records are added",
      
    }
    res.json(resultobj);
    });
})

router.get('/getmagazines',(req, res) => {
    const fs = require('fs'); 
    const csv = require('csv-parser');
    path="csv/magazines.csv"
    const results = [];
    fs.createReadStream(path)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {results.push(data);
        addMagazine(data.title, data.isbn,data.authors,data.publishedAt)
        })
      .on('end', () => {
        console.log(results);
        const resultobj = {
          message: "CSV records are added",
          
        }
        res.json(resultobj);
      });
})
function addBooks(title, isbn, authors, description){
    var query=`insert into publications(title, isbn, authors, description) values("${title}","${isbn}","${authors}","${description}")`
    console.log(query)
    connection.query(query, function (err, result, fields) {
       if (err) {
             console.log(err)
       }
       else {
           console.log(result)
           console.log(fields)
       } 
   });
}
function addMagazine(title, isbn, authors, publishedat){
    var query=`insert into publications(title, isbn, authors, publishedat) values("${title}","${isbn}","${authors}","${publishedat}")`
    console.log(query)
    connection.query(query, function (err, result, fields) {
       if (err) {
             console.log(err)
       }
       else {
           console.log(result)
           console.log(fields)
       } 
   });
}
/***Start -3. Find a book or magazine by its ISBN.***/
router.get('/findbyisbn',(req, res) => {
    //addAuthor(req.email, req.firstname, req.lastname)
    console.log(req)
    var query=`select * from publications where isbn="${req.body.isbn}";`
    console.log(query)
    connection.query(query,function(err,result, fields){
        console.log(`result${result}`);
        if(err)
        {
          const resultobj = {
            error: true,
            errordesc: "No record with given isbn",
            isbn:req.body.isbn,
          }
          res.json(resultobj);
        }
        else if(result.length==0){
          const resultobj = {
            message: "No record with given isbn",
            isbn:req.body.isbn,
          }
          res.json(resultobj);
        }
        else
        { 
            let object=new Object()
            object=result[0];
            const resultObj = {
              isbn:req.body.isbn,
              title:object.title,
              authors:object.authors
            } 
            res.json(resultObj);
        }
      });
})
/***End 3. Find a book or magazine by its ISBN.***/
/***STart 4. Find all books and magazines by their authors’ email.***/
router.get('/findbyauthors',(req, res) => {
  //addAuthor(req.email, req.firstname, req.lastname)
  console.log(req)
  var query=`select * from publications where authors like '%${req.body.email}%';`
  console.log(query)
  connection.query(query,function(err,result, fields){
      console.log(`result${result}`);
      if(err)
      {
        const resultobj = {
          error: true,
          errordesc: "error occured",
          email:req.body.email
        }
        res.json(resultobj);
      }
      else if(result.length==0){
        const resultobj = {
          message: "no records found",
          email:req.body.email
        }
        res.json(resultobj);
      }
      else
      { 
          console.log(`result ${result}`)
          console.log(JSON.stringify(result))
          let objects=[]
          //objects=result
          result.map(resultone=>{
            let object =new Object(resultone)
            objects.push(object)
          })
          console.log(objects)
          const resultObj = {
            error: false,
            alreadyregistered: false,
            newlyAdded:true,
            email:req.body.email,
            publications:objects
          } 
          res.json(resultObj);
      }
    });
})
/***End 4. Find all books and magazines by their authors’ email.***/
/** Add A book **/
router.post('/addbook',(req, res) => {
  //addAuthor(req.email, req.firstname, req.lastname)
  console.log(req)
  //title;isbn;authors;description
  var query=`insert into publications(title,isbn,authors,description) values("${req.body.title}","${req.body.isbn}","${req.body.authors}",${req.body.description})`
  console.log(query)
  connection.query(query,function(err,result, fields){
      console.log(`result${result}`);
      if(err)
      {
        const resultobj = {
          error: true,
          errordesc: "error occured",
          isbn:req.body.isbn
        }
        res.json(resultobj);
      }
      else
      { 
        console.log(`fields ${fields}`);
        const resultObj = {
            error: false,
            newlyAdded:true,
            isbn:req.body.isbn
        } 
        res.json(resultObj);
    }
    });
})

/**Add a magazine**/
router.post('/addmagazine',(req, res) => {
  //addAuthor(req.email, req.firstname, req.lastname)
  console.log(req)
  var query=`insert into publications(title,isbn,authors,publishedat) values("${req.body.title}","${req.body.isbn}","${req.body.authors}",${req.body.publishedat})`
  console.log(query)
  connection.query(query,function(err,result, fields){
      console.log(`result${result}`);
      if(err)
      {
        const resultobj = {
          error: true,
          errordesc: "error occured",
          email:req.body.email
        }
        res.json(resultobj);
      }
      else
      { 
        console.log(`fields ${fields}`);
        const resultObj = {
            error: false,
            newlyAdded:true,
            isbn:req.body.isbn
        } 
        res.json(resultObj);
    }
    });
})
/**fetch data in csv format **/
router.get('/fetchcsv',(req,res)=>{
  connection.query("SELECT * FROM publications", function(error, data, fields) {
    if (error) throw error;

    const jsonData = JSON.parse(JSON.stringify(data));
    console.log("jsonData", jsonData);

    const json2csvParser = new Json2csvParser({ header: true});
    const csv = json2csvParser.parse(jsonData);

    fs.writeFile("csv/publications.csv", csv, function(error) {
      if (error) throw error;
      console.log("csv/publications.csv generated successfully!");
      const resultobj = {
        message: "csv/publications.csv generated successfully!",
        
      }
      res.json(resultobj);
    });
  });
})
module.exports=router
    