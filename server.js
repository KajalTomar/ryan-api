const express = require('express');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 'wumbo';
password = '';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const database = {
	streaks: [
		{
			time: '03:20:20',
			streak: 1
		},
		{
			time: '02:12:00',
			streak: 2
		},
		{
			time: '01:32:12',
			streak: 3
		},
		{
			time: '11:23:15',
			streak: 0
		}
	]
}

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
	password = hash;
});

app.get('/', (req,res) => {
	res.send("this is working");
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