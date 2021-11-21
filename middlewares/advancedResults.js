const advancedResults =(model) => async (req,res,next)=> {
    let query;
    let reqQuery= {...req.query};
    let removeField=["select","sort"];
    removeField.forEach(item=>delete reqQuery[item]);
    //creating query with Reviews
    query = model.find(reqQuery);

    //selecting query based on parameter
    if(req.query.select) {
        let fields= req.query.select.split(",").join(" ");
        query=query.select(fields);
    }

    //sorting query based on parameter

    if(req.query.sort) {
        let sortBy= req.query.sort.split(",").join(" ");
        query=query.sort(sortBy);
    } else {
        query=query.sort("-createdAt");
    }
    // creating pagination 

    let page= parseInt(req.query.page,10)||1;
    let limit=parseInt(req.query.limit,10)||10;
    let startingIndex=(page-1)*limit;
    let endIndex=page*limit;
    let total= await model.countDocuments();
    querty=query.skip(startingIndex).limit(limit);


    let pagination={};

    if(startingIndex>0){
        pagination.prev={
            page:page-1,
            limit:limit
        }
    }

    if(endIndex<total){
        pagination.next={
            page:page+1,
            limit:limit
        }
    }

    let results=await query; 

    res.advancedResults= {
        success:true,
        count: results.length,
        pagination,
        data:results
    }

    next();
}


module.exports=advancedResults;