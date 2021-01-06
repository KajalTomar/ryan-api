const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const saltRounds = 10;
const myPlaintextPassword = 'wumbo';
password = '';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
const database = {
	streaks: [
		[
			'03:20:20',
			1
		],
		[
			'02:12:00',
			2
		],
		[
			'01:32:12',
			3
		],
		[
			'11:23:15',
			0
		]
	]
}

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
	password = hash;
});

app.get('/', (req,res) => {
	res.json(database.streaks);
})

app.post('/signin', (req,res) => {
	
	const givenPassword = "wumbo";

	bcrypt.compare(givenPassword, password, function(err, result) {
		console.log(result);
	});

	
	if(req.body.password === myPlaintextPassword)
	{
		res.json('success');
	} else{
		res.status(400).json('You are not Ryan!');
	}
	

})

app.post('/home', (req,res) => {
	res.json(database.streaks);
})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})


/*

/ --> res = this is working 
/signin --> POST success/fail
/home --> GET = data 

*/