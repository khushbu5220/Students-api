const express = require("express");
const router = new express.Router();
const Student = require("../models/students");


router.post("/students", async(req,res) => {

    try{
        const user = new Student(req.body);

        const createUser = await user.save();
        res.status(201).send(createUser);
    }

    catch(e){
        res.status(400).send(e);
    } 
})





// read the data of registered Students
router.get("/students", async(req,res) => {

    try{
       const studentsData = await Student.find();
       res.send(studentsData);
    }catch(e){
        res.status(500).send(e);
    }
})

// get the individual students data 

router.get("/students/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
     
       
               if(!studentData){
                   return res.status(404).send();
               }else{
                   res.send(studentData);
               }

    }catch(e){
        res.status(500).send(e);
    }
})


// update the students by its id 

router.patch("/students/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
            new:true
        });
        res.send(updateStudents);

    }catch(e){
        res.status(404).send(e);
    }
})


// Delete the students by its id 

router.delete("/students/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
     
        if(!_id){
            return res.status(400).send();
        }else{
            res.send(deleteStudent);
        }


    }catch(e){
        res.status(500).send(e);
    }
})




module.exports = router;