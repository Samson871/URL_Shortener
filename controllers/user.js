const User = require("../models/user")
const {setUser}=require("../service/auth")

async function handleUserSignUp(req,res){
  const {name , email, password}= req.body;
  await User.create({
    name,email,password,
  });
  return res.redirect("/login?message=Successfully signed up");
}

async function handleUserLogin(req,res){
  const {email,password}=req.body;
  const user = await User.findOne({email,password})
  if(!user)
  {
    return res.redirect('/login?error=Invalid username or password');
  }

  const token=setUser(user)
  res.cookie("token",token) 

  return res.redirect('/?message=Successfully logged in');
}



module.exports={
  handleUserSignUp,
  handleUserLogin,

};