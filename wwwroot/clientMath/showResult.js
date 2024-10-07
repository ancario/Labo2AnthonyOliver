function showResult(url){
    const path = decomposePath(url);
    let Result;
    const { op, x, y, n } = path.params;
   
    const allowedParams = ["op", "x", "y", "n","X","Y"]; 
    const providedParams = Object.keys(path.params); 

   
    const extraParams = providedParams.filter(
      (param) => !allowedParams.includes(param)
    );

    if (extraParams.length > 0) {
   
       Result = MathFunctions.createErrorAllResult(path.params);
    
      return Result;
    }
   
    if (Object.keys(path.params).length === 0) {
    
      this.HttpContext.response.HTML(generateQueryStringList());
      return;
    }


    if (['!', 'p', 'np'].includes(op)) {
        if (n === undefined || isNaN(n)) {
            if (n === undefined) {
                Result = MathFunctions.createErrorResult(op, null, null, n, "Parameter 'n' is missing", true);
            } else {
                Result = MathFunctions.createErrorResult(op, null, null, n, "Parameter 'n' is not a number");
            }
        } else if (parseInt(n) <= 0 || !Number.isInteger(parseFloat(n))) {
            Result = MathFunctions.createErrorResult(op, null, null, n, "Parameter 'n' must be an integer > 0");
        } else {
            Result = MathFunctions.calculate(op, parseInt(n), null);
        }
    } else if (op && x && y) {
        if (isNaN(x)) {
            Result = MathFunctions.createErrorResult(op, x, y, null, "x is not a number");
        } else if (isNaN(y)) {
            Result = MathFunctions.createErrorResult(op, x, y, null, "y is not a number");
        } else {
            Result = MathFunctions.calculate(op, parseFloat(x), parseFloat(y));
        }
    } else if (!x) {
        Result = MathFunctions.createErrorResult(op, null, y, null, "x is missing");
    } else if (!y) {
        Result = MathFunctions.createErrorResult(op, x, null, null, "y is missing");
    } else {
        Result = MathFunctions.createErrorResult(op, x, y, null, "Paramètres 'x' ou 'y' manquants ou non valides");
    }

    return Result;
};



function parseQueryString(url) {
    const queryString = url.split('?')[1];
    const params = {};

    if (queryString) {
        const pairs = queryString.split('&');
        for (const pair of pairs) {
            const [key, value] = pair.split('=');
            try {
                params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : null;
            } catch (e) {
                console.error('Error decoding:', key, value);
                params[key] = value; // fallback to raw key/value if decoding fails
            }
        }
    }
    return params;
}


function decomposePath(queryString){
    let params = null;
    if (queryString !== undefined) {
        params = parseQueryString(queryString);
    }
    

    return { params };
};
