const e = require('express');
const { query, response } = require('express');
const cors = require('cors')
const express = require('express')
const router = express.Router()
var connection = require('../models/db')

/*Route to get all the authors in the csv*/
router.get('/',(req, res) => {
const fs = require('fs'); 
const csv = require('csv-parser');
path="csv/authors.csv"
const results = [];

fs.createReadStream(path)
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => {results.push(data);
    addAuthor(data.email, data.firstname,data.lastname)
    })
  .on('end', () => {
    console.log('CSV records added in the database.');
  });
})
function addAuthor(email, firstname,lastname)
{
     var query=`insert into authors values("${email}","${firstname}","${lastname}")`
     connection.query(query, function (err, result, fields) {
        if (err) {
                   console.log('Error occured'+err)
        }
        else {
            console.log('Record added!')
        } 
    });
}
/***Route to add teh author***/
router.post('/add',(req, res) => {
    //addAuthor(req.email, req.firstname, req.lastname)
    console.log(req)
    var query=`insert into authors values("${req.body.email}","${req.body.firstname}","${req.body.lastname}")`
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
              alreadyregistered: false,
              newlyAdded:true,
              email:req.body.email
          } 
          res.json(resultObj);
      }
      });
})
/***Routes***/
/***Routes to find the author***/
router.post('/find',(req, res) => {
    //addAuthor(req.email, req.firstname, req.lastname)
    console.log(req)
    var query=`select * from authors where email="${req.body.email}";`
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
            const resultObj = {
              error: false,
              alreadyregistered: false,
              newlyAdded:true,
              email:req.body.email
            } 
            res.json(resultObj);
        }
      });
})
/***Routes***/

module.exports=router
