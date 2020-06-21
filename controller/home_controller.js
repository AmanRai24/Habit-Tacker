const Habit = require('../models/habit');

//find all habit name and show 
module.exports.home = function(req,res){
    Habit.find({}, function(err,HabitList){
        if(err){
            console.log("Error in finding db");
            return;
        }
        return res.render('home',{
            HabitList: HabitList
        });
    });
}


//add habit module
const Month = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
module.exports.create = function(req,res){
    //-fetching todays date
    let d = new Date();
    let date = d.getDate()+","+Month[d.getMonth()]+" "+d.getFullYear();
    //add to database
    Habit.create({
        name: req.body.habitName,
        days: {date:date,
            status:"None"}
    },function(err,addHabit){
        if(err){
            //error in creating the habit
            console.log("Error");
            return;
        }
        console.log('#',addHabit);
        return res.redirect('/');
    })
}

//delete the particular habit
module.exports.delete= async function(req,res){
    //---- find the requested habit and delete it from db
    let id=req.query.id;
    await Habit.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting habit");
            return;
        }
        return res.redirect('back');
    })
}

