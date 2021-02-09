const express = require("express")
const massive = require("massive")
require('dotenv').config()
const products_controller = require("./products_controller")

const app = express()

const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

//MASSIVE ALWAYS FOLLOWS APP.USE:
massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    },
}) .then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('db connected')
}) .catch((err) => console.log(err))


//ENDPOINTS ALWAYS FOLLOW MASSIVE:
app.get(`/api/product`, products_controller.getAll)
app.get(`/api/product`, products_controller.getOne)
app.put(`/api/product`, products_controller.update)
app.post(`/api/product`, products_controller.create)
app.delete(`/api/product`, products_controller.delete)



app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})