const path = require('path');

const express = require('express');
 const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const sequelize = require('./util/database');
// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

const app = express();
const mongoconnect=require('./util/database').mongoConnect;
const User=require('./models/user');


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64eb237145e5eabe30e9d285')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

 app.use(errorController.get404);

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });


mongoconnect(() =>{
 
  app.listen(3000);
})

// app.listen(3000,() =>{
//   console.log('server listen at 3000');
// })
