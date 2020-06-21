const Habit = require('../models/habit');

const month = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"];


module.exports.Details = async function(req,res){
    //fetch all details of the habit habit
    await Habit.findById(req.query.id, function(err, habit){
        if(err){
            console.log('Error in finding habit name');
            return;
        }
        //track of previous 6 days
        const prev_days=[];
        for(let i=0;i<6;i++)
        {
            let d1=new Date().getDate()-i +","+ month[new Date().getMonth()];
            let date= new Date().getDate()-i +","+ month[new Date().getMonth()]+" "+new Date().getFullYear();
            
            //find the status of last 6 days
            let prev_status= habit.days.find(x=> x.date == date);
            if(prev_status){
                prev_days.push({date:d1,status:prev_status.status})
            }
            else{
                prev_days.push({date:d1,status:"None"});
            }
        }
        
        return res.render('prevdays',{
            details: habit,
            track:prev_days
        });
    });
}

//updating status 
module.exports.Status = async function(req,res){
    let id=req.query.id;
    let date = req.query.date+" "+new Date().getFullYear();
    let status = req.query.status;
    
    //find the selected habit
    await Habit.findById(id,function(err,habit){
        if(err){
            console.log('Error in finding habit name');
            return;
        }

        //find Status of habit name
        let find= habit.days.find(x=> x.date == date);
        
        //if status is not present the add to db 
        if(!find){
            habit.days.push({date:date,status:status});
            habit.save();
           // else update the status
        }else{
            habit.days.remove(find);
            habit.days.push({date:date,status:status});
            habit.save();
        }
        res.redirect('back');
    });    
}