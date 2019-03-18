module.exports = {
  getNewPassword: () => {
    var password = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      password += possible.charAt(Math.floor(Math.random() * possible.length));

    return password;
  },

  getCountryNameAndPostalCode: (address) => {
   
   var country= address.address_components.find(item=>item.types.includes("country")).long_name;
   var city= address.address_components.find(item=>item.types.includes("administrative_area_level_1")).long_name;
   var postal_code= address.address_components.filter(item=>item.types.includes("postal_code"))
   .map((item)=>{
     return item.long_name;
   })
    return {
      country:country,
      postal_code: postal_code[0],
      city:city
    }

  }
}

