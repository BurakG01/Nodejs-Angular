module.exports={
 getNewPassword:()=>{
    var password = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      password += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return password;
 }
}

