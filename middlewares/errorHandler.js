const ErrorHandler=(err,req,res,nex)=>{

    console.log(err.message);


    res.status(500).json({
        success:false,
        error:err.message
    })

}


module.exports= ErrorHandler; 