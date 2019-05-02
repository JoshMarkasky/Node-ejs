const express = require('express');
const session = require('express-session');
const debug = require('debug')('http');
const path = require('path');
const bodyPaser = require('body-parser');

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  PORT = 5000,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'ssshhh',
  SESS_LIFETIME = TWO_HOURS
} = process.env;

const IN_PROD = NODE_ENV === 'production'

const users = [
  {id: 1, username: 'random1', password: '123456'},
  {id: 2, username: 'random2', password: '654321'},
  {id: 3, username: 'random3', password: '456123'}
]

const app = express();

app.use(bodyPaser.urlencoded({
  extended: true
}))

app.set('view engine', 'ejs');

app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
  }
}))

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/js'));

app.listen(PORT, (err) => {
  if(err){
    cosnole.log(err);
  } else {
    debug('http://localhost:' + PORT);
    console.log('server is running on port ' + PORT);
  }
});

const redirectLogin = (req, res, next) => {
  if(!req.session.userId){
    res.redirect('/login')
  } else {
    next();
  }
}

const redirectHome = (req, res, next) => {
  if(req.session.userId){
    res.redirect('/home')
  } else {
    next();
  }
}

app.get('/', (req, res) => {
  const { userId } = req.session

  res.render('index', { session: userId });

});

app.use((req, res, next) => {
  const { userId } = req.session
  if(userId){
    res.locals.user = users.find(user => user.id === userId)
  }
  next()
}) 

app.get('/home', redirectLogin, (req, res) => {
  const { userId } = req.session
  console.log(req.session.userId);
  console.log(req.session);
  console.log(req.session.password);

  res.render('home',{session: userId});

});

app.get('navbar', (req, res) => {


  res.render({session: 1});
})

app.get('profile', redirectLogin, (req, res) => {
  const { user } = res.locals;
})

app.get('/login', redirectHome, (req, res) => {
  
res.render('login', {session: req.session.Session});

})

app.get('/register', redirectHome, (req, res) => {
    res.render('register', {session: req.session.Session});
})

app.post('/login', redirectHome, (req, res) => {
   const { username, password } = req.body
  
  if(username && password) { // validation
    const user = users.find(user => user.username === username && user.password === password) //todo hash password
    
    if(user) {
    req.session.userId = user.id
    return res.redirect('/home');
    }
  }
  
  res.redirect('/login');
})

app.post('/register', redirectHome, (req, res) => {
  const { username, password } = req.body
  // todo validation
  if(username && password) {
    const exist = users.some(
      user => user.username === username
    )  
    
    if(!exist){
      const user = {
        id: users.length + 1,
        username,
        password
      }
      
      users.push(user);
     req.session.userId = user.id;
      
      return res.redirect('/home')
    }
  }
  
  res.redirect('/register'); //to query string errors
})

app.post('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if(err){
      return res.redirect('/home')
    }
    
    res.clearCookie(SESS_NAME);
    res.redirect('/login');
  }) 
})


