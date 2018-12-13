module.exports = {
  //we use sendStatus here since there is no other response necessary. If we wanted to send back data
  //we would use .status(X) instead.
  create: (req, res, next) => {
    //destructoring req.body for readability
    const { name, description, price, image_url } = req.body
    //every single massive request will use 'req.app.get('db')' then the sql method required.
    //you can destructure it to be {db} = req.app.get('db') if desired
    req.app
      .get("db")
      .create_product([name, description, price, image_url])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(err => {
        res.status(500)
        console.log(err, "could not create")
      })
  },
  //searching for one product by invoking read_product.sql and passing in req.params.id
  getOne: (req, res, next) => {
    console.log(req.params)
    req.app
      .get("db")
      .read_product(req.params.id)
      .then(response => {
        console.log(response)
        res.status(200).send(response)
      })
      .catch(err => {
        res.status(500)
        console.log(err, "could not get product")
      })
  },
  //invoking SQL function read_products and sending the response back
  getAll: (req, res, next) => {
    req.app
      .get("db")
      .read_products()
      .then(products => {
        res.status(200).send(products)
      })
      .catch(err => {
        res.status(500)
        console.log(err, "could not get product")
      })
  },
  //update our product by invoking our update_product SQL passing in our req.params.id and req.query.desc parameters
  // it's .desc instead of .description because that what the query is looking for. Postman will show the correct
  //query if you look on the sidebar
  update: (req, res, next) => {
    req.app
      .get("db")
      .update_product([req.params.id, req.query.desc])
      .then(() => {
        res.sendStatus(200)
      })
      .catch(err => {
        res.status(500)
        console.log(err, "could not update product")
      })
  },
  //invoking delete_product and passing in req.params.id. No [ ] needed since there is only one argument
  delete: (req, res, next) => {
    req.app
      .get("db")
      .delete_product(req.params.id)
      .then(() => {
        res.sendStatus(200)
      })
      .catch(err => {
        res.status(500)
        console.log(err, "could not delete product")
      })
  }
}
