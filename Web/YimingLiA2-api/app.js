const express = require('express')

const db = require('./js/crowdfunding_db')

const app = express()

const cors = require('cors')

app.use(cors())

app.get('/search_page', (req, res) => {
  res.sendFile(__dirname + '/pages/search.html')
})

app.get('/get_fundraiser', (req, res) => {
  db.query('SELECT * FROM fundraiser', (error, results, fields) => {
    if (error) throw error
    // use results
    console.log('11', results)
    res.send(JSON.stringify(results))
  })
})

app.get('/fundraiser', (req, res) => {
  let id = req.query.id
  db.query('SELECT * FROM fundraiser', (error, results, fields) => {
    if (error) throw error
    // use results
    console.log('11', results)
    let newRes = results.filter(item => item.FUNDRAISER_ID == id)
    res.send(JSON.stringify(newRes))
  })
})

app.get('/search', (req, res) => {
  let type = parseInt(req.query.type)
  let keyword = req.query.keyword
  let city = req.query.city
  console.log(type, keyword, city)
  db.query('SELECT * FROM fundraiser', (error, results, fields) => {
    if (error) throw error
    // use results
    // console.log('11', results)
    let newRes = []
    if(type !== 0){
      newRes = results.filter(item => item.CATEGORY_ID == type)
      // console.log(newRes)
    }else{
      newRes = results
      // console.log(newRes)
    }
    if(city){
      newRes = newRes.filter(item => item.CITY.trim() == city.trim())
    }
    if(keyword.trim()){
      newRes = newRes.filter(item => item.CITY.includes(keyword) || item.ACTIVE.includes(keyword) || item.ORGANIZER.includes(keyword) || item.TARGET_FUNDING.includes(keyword))
    }
    res.send(JSON.stringify(newRes))
  })
})

app.listen(5000, () => {
  console.log('The server is http://127.0.0.1:5000/ Start up')
})
