const express = require('express');
const router = express.Router();

const {database} = require('../config/helpers');


console.log("here");
/* GET All orders. */
router.get('/', (req, res) =>{
  database.table('orders_details as od')
      .join([
        {
          table:'orders as o',
          on: 'o.id = od.order_id'
        },
        {
          table:'products as p',
          on:'p.id = od.product_id'
        },
        {
          table: 'users as u',
          on: 'u.id = o.user_id'
        }
      ])
      .withFields(['o.id', 'p.title as name', 'p.description','p.price','u.username'])
      .sort({id:1})
      .getAll()
      .then(orders=>{
        if(orders.length>0){
          res.status(200).json(orders);
          console.log("finished");
        }
        else{
          res.json({message: "No orders found!"});
        }
      }).catch(err=> console.log(err));
});

module.exports = router;
