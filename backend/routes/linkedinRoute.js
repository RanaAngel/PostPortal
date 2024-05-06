require('dotenv').config();
const Authorization=()=>{
    //client_id
    //response_type
    //scope
    //redirect_uri
    return encodeURI(`https:linkedin.com/oauth/v2/authorization?client_id=${process.env.CLIENT_ID}&response_typecode$scope=${process.env.SCOPE}&redirect_uri=${process.env.REDIRECT_URI}`);
}

const Redirect = (code)=>{
    const payload ={
        code
    }
}

module.exports={
    Authorization,
    Redirect
}