const ErrorHandler=(err,req,res,nex)=>{

    console.log(err.message);
    console.log(err.statusCode);

    let statusCode= err.statusCode || 500;
    res.status(statusCode).json({
        success:false,
        error:err.message
    })

}


module.exports= ErrorHandler; 