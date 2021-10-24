const ErrorResponse= require("../utils/ErrorResponse")

const ErrorHandler=(err,req,res,next)=>{
    let error= {...err};
    error.message= err.message;

    if(err.name==="CastError") {
        let message=`The review ${error.value} is invalid.It is not the right Id `;
        error= new ErrorResponse(message,404)
    }


    let statusCode= error.statusCode || 500;
    res.status(statusCode).json({
        success:false,
        error:error.message || "server error"
    })

}


module.exports= ErrorHandler; 