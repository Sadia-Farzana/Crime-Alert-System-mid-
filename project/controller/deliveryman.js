var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();


router.get('/takeaway',function(req,res)
{
	userModel.takeaway(function(results)
	{
       console.log(results);
       res.render('deliveryman/index',{userList : results, username:req.session.username});
	});
});

router.get('/Accept/:id',function(req,res)
{


	var user = {
  	username 	: req.session.username,
	id 			: req.params.id
	
	}
  userModel.takeawayaccept(user, function(result){
		res.render('deliveryman/Acceptlist', {userList: result,username:req.session.username});

		});

});
router.get('/accept',function(req,res)
{


	var user = {
  	username 	: req.session.username
	}
  userModel.accept(user, function(result){
		res.render('deliveryman/Acceptlist', {userList: result,username:req.session.username});

		});

});

router.get('/Reject/:id',function(req,res)
{
  userModel.GetOrderById(req.params.id, function(result){
		res.render('deliveryman/orderdelete', {user: result});

		});

});

router.post('/Reject/:id', function(req, res){

	userModel.orderdelete(req.params.id, function(status){
		if(status){
			res.redirect('/deliveryman/takeaway');
		}else{
			res.redirect('/home');
		}
	});
});

router.get('/editProfile/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		res.render('deliveryman/edit', {user: result});
	});

});

router.post('/editProfile/:id', function(req, res){

  var user = {
  	name 			: req.body.name,
  	username 		: req.body.username,
    password     	: req.body.password,
    phone     	 	: req.body.phone,
    email 			: req.body.email,
	address     	: req.body.address,
	id 			: req.params.id
	
	}

	userModel.updateUser(user, function(status){
		if(status){
			res.redirect('/home');
		}else{
			res.redirect('/deliveryman/editProfile/'+req.params.id);
		}
	});
});

router.get('/delete/:id',function(req,res){
  if(req.session.username== null){
    res.redirect('/login');
  }
  else{
    userModel.getById(req.params.id, function(result){
  		res.render('deliveryman/delete',{user : result});
  	});
  }
});

router.post('/delete/:id',function(req,res){
    userModel.delete(req.body.id, function(status){
      if(status){
        res.redirect('/login');
      }else{
        res.redirect('/deliveryman/delete'+req.body.id);
      }
    });
});

module.exports = router;