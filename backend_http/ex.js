const express = require("express");
const app = express();

// enable a feature needed for POST request and add the following line of code
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Hello there");
})

const courses = [
    {id:1, name:'Web Development'},
    {id:2, name:'IT'},
    {id:3, name:'Cybersecurity'}
];

app.get('/api/courses', (req, res) =>{
    res.send(courses);
})

app.get('/api/courses/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with the given Id was not found");
        return
    }
    res.send(course);
})

// HTTP POST requests
app.post('/api/courses', (req,res) => {
    if(req.body.name.length >= 3){

    //add an if statement so that the name of the course you post is .min(3) characters 
        const course ={
            //we assign an ID and a name property
            id: courses.length +1,
            name: req.body.name
        }
        courses[courses.length] = course;
        res.send(course);
    }
    res.status(404).send("Needs to be 3 letters or more");
            //next step: the server should return the new resource to the client in the body of the response      
});

app.put('/api/courses/:id', (req,res)=>{
    // Write the code in order to look up the course, if not existing return a 404
    const courseExists = courses.find(c => c.id === parseInt(req.params.id));
    if((courseExists)&&(courseExists.name === req.body.name)){
        res.status(404).send("The course with the given Id was already taken");
        return
    }
    const course ={
        //we assign an ID and a name property
        id: parseInt(req.params.id),
        name: req.body.name
    }
    courses[course.id-1] = course
    res.send(course);
});

app.delete('/api/courses/:id', (req,res)=>{
    //code the following logic
    //look up the course by id
    const courseExists = courses.find(c => c.id === parseInt(req.params.id));
    if(courseExists.id === parseInt(req.params.id)){
        res.send(courseExists);
        courses.splice(courses.indexOf(courseExists),1);
        return;
    }
    res.status(404).send("The course with the given Id doesn't exist");
        //return 404 if does not exist
        //delete the course by index HINT: use the indexOf() and splice() methods
        // return the response to the client the course that was deleted


});


app.listen(3000, () =>{
    console.log('Listening on port 3000...');
})