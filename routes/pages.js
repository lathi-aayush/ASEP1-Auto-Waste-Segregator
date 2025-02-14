const express=require('express');
const router=express.Router();
const mysql=require('mysql');

//Middle ware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
//   });
  
router.get('/',(req,res)=>{
    res.redirect('index');
});
router.get('/register',(req,res)=>{
    var message=req.query.message;
    console.log(message,"Dummb");
    res.render('register',{error : message});
     
});router.get('/registerNGO',(req,res)=>{
    var message=req.query.message;
    console.log(message,"Dummb");
    res.render('registerNGO',{error : message});
     
});
router.get('/login',(req,res)=>{
    var message=req.query.message;
    console.log(message,"Dummb1");
    res.render('login',{ error : message});
});router.get('/index',(req,res)=>{
   
    console.log(req.cookies);
    if(req.cookies.userLogged){
        var email=req.cookies.userInfo;
        console.log(email);
        res.render('index',{email : email});
    }else{
        res.render('login');
    }
    
});router.get('/ngoDashboard',(req,res)=>{
    const con=mysql.createConnection({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
        });con.query("SELECT * FROM ngo_data",(error,results)=>{
            if(error){
                throw error;
            } res.render('ngoDashboard',{Data : results});
            
        });
   
     
});router.get('/logout',(req,res)=>{
    res.clearCookie("userInfo");
    res.clearCookie("userLogged");
    var message="logged out successfully";
    res.render('login',{error : message});
     
});
router.get('/Segregation',(req,res)=>{
    res.render('opencv_draft3');
});
router.get('/model',(req,res)=>{

    res.render('/Segregation');
});router.get('/leaderboard',(req,res)=>{
    const con=mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });con.query("select * from userdata inner join usersegregationdata on userdata.id=usersegregationdata.dataid order by usersegregationdata.garbageSegregationAmt desc limit 10",(error,results)=>{
        console.log(results)
        if(error){
            throw error;
        } res.render('leaderboard',{Data : results});
        console.log(results)
    });
});
router.post("/submit", (req, res) => {
    console.log("wowie")
    const con=mysql.createConnection({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
        });id=req.cookies.userInfoid;
        var garbageamt;
        con.query("select garbageSegregationAmt from usersegregationdata where dataid = ? ",[id],(error,results)=>{
            console.log(results)
            if(error){
                console.log(error);
            }garbageamt=results[0]["garbageSegregationAmt"];
            con.query("UPDATE `ayush`.`usersegregationdata` SET `garbageSegregationAmt` = ? WHERE (`dataid` = ?)",[garbageamt+1,id],(error,results)=>{
                console.log(results)
                if(error){
                    console.log(error);
                }
            });
        });
  });
  router.get('/yo',(req,res)=>{

    res.render('hello');
});

module.exports = router; 