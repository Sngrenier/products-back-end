const {response} = require("express")

module.exports = {
    getAll: (req, res, next) => {
        const dbInstance = req.app.get('db')
        dbInstance
        .read_products()
        .then((products) => {
            res.status(200).send(products)
        })
        .catch ((err) => console.log(err))
    },

    getOne: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params
        dbInstance
        .read_product(id)
        .then((product) => {
            res.status(200).send(product)
        })
        .catch((err) => console.log(err))
    },

    create: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {name, description, price, image_url} = req.body
        dbInstance
        .create_product([name, description, price, image_url])
        .then(() => {
            res.sendStatus(200)
        })
        .catch((err) => res.status(500).send({errorMessage: "Oops! Something went wrong. We're working hard to fix it!"})
        (console.log(err))
    )},

    update: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {params, query} = req
        dbInstance
        .update_product([params.id, query.description])
        .then(() => {
            res.sendStatus(200)
        })
        .catch((err) => res.status(500).send({errorMessage: "Oops! Something went wrong. We're working hard to fix it!"})
        (console.log(err))
    )},

    delete: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params
        dbInstance
        .delete_product(id)
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send({errorMessage: "Oops! Something went wrong. We're working hard to fix it!"})
        (console.log(err))
    )}
}