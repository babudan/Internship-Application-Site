const mongoose = require("mongoose");

//--------------------------------email-------------------------------
const isValidEmail = (email) => {
    const regx = /^([a-z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/
    return regx.test(email)
};

//-------------------name--------------
const isValidName = (name) => {
    const regx = /^[a-z ,.'-]+$/i
    return regx.test(name)
};


// ---------------mobile--------------------
const isValidmobile= (data) => {
    const regx = /^((\+91)?|91)?[789][0-9]{9}$/
    return regx.test(data)
};

// --------------body----------------------------
const isValidElem= (data) =>{
    if (data == undefined || data == null) return false
    if (typeof(data)==="string" && data.trim()=="" ) return false
    return true
}

// ---------------logo link-----------------------------------
const isValidLogo = (logolink)=>{
    let url =/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    return url.test(logolink)
}


module.exports = {  isValidEmail,isValidName,isValidElem ,isValidmobile ,isValidLogo }