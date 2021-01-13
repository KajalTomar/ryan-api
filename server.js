const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const database = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1', // same as local host 
	  user : 'postgres',
	  password : 'Shillai1!',
	  database : 'data'
	}
});

const saltRounds = 10;
const myPlaintextPassword = 'wumbo';
password = '';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
	password = hash;
}); 


app.get('/', (req,res) => {
	res.json('success');
})

app.post('/signin', (req,res) => {

	bcrypt.compare(req.body.givenPassword, password, function(err, result) {
		if(result == true){
			database.select('*').from('streakinfo').then(streakinfo => {		
				res.status(200).json('You are Ryan!');		
			})
		} else{
			res.status(400).json('You are not Ryan!');
		}
	});
})

app.post('/home', (req,res) => {
	database.select('*').from('streakinfo').then(streakinfo => {		
		if(streakinfo.length){
			res.json(streakinfo)
		}
		else{
			res.status(400).json('Data not found')
		}
	})
})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})




// --> res = this is working 
//signin --> POST success/fail
//home --> GET = data 