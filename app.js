const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.use((req, res, next) =>{
    User.findByPk(1)
    .then(user =>{
        req.user = user;
    })
    .catch(error => console.log(error));
})

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
// .sync({force: true})
.sync()
.then(result=>{
    // console.log(result);
    return User.findByPk(1);

})
.then(user =>{
    if(!user) {
        return User.create({ name: 'Ravi',  email: 'test@test.com'});
    }
    return user;
})
.then(user =>{
    app.listen(3000);
    console.log("server is connected");
})
.catch(err =>{
    console.log(err);
});