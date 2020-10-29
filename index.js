const express = require('express');
const shortid = require('shortid');

//creates an express app using the express module

const server = express();
server.use(express.json());


let users = [];

server.get('/', (req, res) => {
    res.json({Hello: 'World'});
})

//

server.get('/api/users/id', (req, res) => {
    res.status(200).json(users);
 })


    
///


server.get('/api/users/:id', (req, res) => {
   const {id} = req.params;
   const user = users.find((user) => user.id === id);

   if(!user){
       res.status(404).json({message: "The user with the specified ID does not exist."})
   } else { 
       res.status(200).json(user);
   }
})

//

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
   
   function validateUser(user) {
        if(!user.name) {
            return false
        } else if (!user.bio) {
            return false
        } else {
            return true
        }
    }
    if(validateUser(userInfo)) {
        userInfo.id = shortid.generate();
        users.push(userInfo);
        res.status(201).json(userInfo)
    } else  {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } 
});


//

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params; 
    const deleted = users.find(user => user.id === id);

    if (deleted){
        users = users.filter(user => user.id !== id);
        res.status(200).json(deleted);
    } else {
        res.status(404).json({message: 'id not found'})
    }

})


server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const changes =req.body
    let index = users.findIndex(user => user.id === id)

    function validateUser(user) {
        if(!user.name) {
            return false
        } else if (!user.bio) {
            return false
        } else {
            return true
        }
    }

    if( index !== -1 ) {
        if(validateUser(changes)) {
            changes.id = id;
        users[index] = changes;
        res.status(200).json(users[index]);
        } else { 
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        }
        
    } else{
        res.status(404).json({ message: 'id not found'})
    }
});







const PORT = 5009;


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})