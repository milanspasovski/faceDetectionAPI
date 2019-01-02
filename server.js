const express = require('express'); 
const bodyParser = require('body-parser');   
const cors = require('cors');

const app = express();  
app.use(bodyParser.json()); 
app.use(cors());

const database = {
	users: [ 
	{
		id: '123',
		name: 'John', 
		password: 'johnny', 
		email: 'john@gmail.com', 
		entries: 0, 
		joined: new Date() 

	}, 
	{
		id: '124',
		name: 'Sally', 
		password: 'apple', 
		email: 'sally@gmail.com', 
		entries: 0, 
		joined: new Date() 
	}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})  

app.post('/signin', (req, res) => { 
	const { email, password } = req.body;  
	if(!email || !password){
		res.status(400).json('empty fields!');
	}
	if(email === database.users[0].email && 
		password === database.users[0].password) {
			res.json(database.users[0]);
	} else{
		res.status(400).json('error logging in');
	}
}) 

app.post('/register', (req, res) => {
	const { email, name, password } = req.body; 
	if(!email || !name || !password){
		res.status(400).json('empty fields!');
	}
	database.users.push({
		id: '125',
		name: name, 
		email: email, 
		entries: 0, 
		joined: new Date()
	}) 
	res.json(database.users[database.users.length-1]);
}) 

app.get('/profile/:id', (req, res) => {
	const { id } = req.params; 
	let found = false; 
	database.users.forEach(user => {
		if(user.id === id){
			found = true; 
			return res.json(user);
		}
	}) 
	if(!found){
		res.status(400).json('not found');
	}
}) 

app.put('/image', (req, res) => { 
	const { id } = req.body; 
	let found = false; 
	database.users.forEach(user => {
		if(user.id === id){
			found = true; 
			user.entries++; 
			return res.json(user.entries);
		}
	}) 
	if(!found){
		res.status(400).json('not found');
	}

})        

app.listen(3000, () => {
	console.log('app is running at port 3000');
})
