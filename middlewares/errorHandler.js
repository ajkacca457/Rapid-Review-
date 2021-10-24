const ErrorResponse= require("../utils/ErrorResponse")

const ErrorHandler=(err,req,res,next)=>{
    let error= {...err};
    error.message= err.message;

    console.log(err);

    if(err.name==="CastError") {
        let message=`The review ${error.value} is invalid.It is not the right Id `;
        error= new ErrorResponse(message,404)
    }

    if(err.code===11000) {
    let message="The review already exists. Avoid duplication of the same review";
     error= new ErrorResponse(message,400)

    }

    if(err.name==="ValidationError") {
    let message=Object.values(err.errors).map(item=>item.message);
    error= new ErrorResponse(message,400)

    }

    let statusCode= error.statusCode || 500;
    res.status(statusCode).json({
        success:false,
        error:error.message || "server error"
    })

}


module.exports= ErrorHandler; 