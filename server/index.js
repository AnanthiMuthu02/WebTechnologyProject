const express = require('express')
const cors = require('cors')

const {connect} = require('mongoose')
const path = require('path');
require('dotenv').config()
const upload = require('express-fileupload')

const userRoutes = require('./routes/userRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
const{notFound, errorHandler} = require('./middleware/errorMiddleware')


const app = express();

app.use(express.json({extended : true}))
app.use(express.urlencoded({extended : true}))
app.use(cors({credentials : true, origin: "https://localhost:3000"}))

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/api/users', userRoutes)
app.use('/api/recipes',recipeRoutes)

app.use(notFound)
app.use(errorHandler)


connect(process.env.MONGO_URI).then(app.listen(8080, () => console.log(`server running ${process.env.PORT}`))).catch(error => {console.log(error)})

