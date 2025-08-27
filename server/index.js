const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./models/Users")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/CRUD")

app.get("/", (req, res) => {
    UserModel.find({})
    .then((data) => res.json(data))
    .catch((error) => res.json(error))
})

app.post("/create", (req, res) => {
    // const { data } = req.body;
    UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((error) => res.json(error))
})

app.listen(3001, ()=>{
    console.log('Server is running')
})