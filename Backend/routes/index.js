var express = require('express');
var router = express.Router();

// CONNECT PORTGREDB
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: '19061995',
  port: 5432,
})
// END CONNECT

/* GET DATA. */
router.get('/', function(req, res, next) {
  console.log(res.send('Trang chủ'));
});


// api from data postgres  lay data tu portgresql 
// sau khi sửa cái package trong frontend với proxy, thì cái đoạn này sẽ không cần nữa, cái trong package kia nó thay cho cái đoạn khai báo kết nối chấp nhận này r. 
router.get('/getdata01', function(req, res, next) {
  // console.log('day la du lieu lay tu postgres ');
  // câu lệnh này dùng để truy xuất các phần tử trong cái portgres -

 //START
//   // copy cai quyen truy cap lay du lieu cho trang frontend 
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

// //END


  pool.query('SELECT * FROM public.product_infor', (errorr, request) => {
    if(errorr){
      console.log('loi r');
    }
    else {
      // console.log(request.rows);
      res.send(request.rows)
    }
    // pool.end();    // cái này dùng để ngắt kết nối liên tục với 
  })

});




//THEM MOI 
router.get('/add', function(req, res, next) {
  res.render('add', {title: "Them moi"})
});

router.post('/add', function(req, res, next) {
  var product_name = req.body.product_name, 
      product_price = req.body.product_price, 
      anh = req.body.anh
  ;

  pool.query("INSERT INTO product_infor (product_name, product_price, anh) VALUES ($1, $2, $3)", [product_name, product_price, anh], (errorr, respone) => {
    if(errorr){
      // console.log(errorr);
      res.send(errorr)
    }
    else {
      
      // res.send("da nhan thong tin: " + product_name + product_price + anh);
      // res.redirect('/add');
      res.send('1')
    }
    
  })
  
});


module.exports = router;
