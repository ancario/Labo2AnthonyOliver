function showResult(url){
    const path = decomposePath(url);
    const { op, x, y, n } = path.params;
    let Result;

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
            Result = MathFunctions.createErrorResult(op, x, y, null, "X is not a number");
        } else if (isNaN(y)) {
            Result = MathFunctions.createErrorResult(op, x, y, null, "Y is not a number");
        } else {
            Result = MathFunctions.calculate(op, parseFloat(x), parseFloat(y));
        }
    } else if (!x) {
        Result = MathFunctions.createErrorResult(op, null, y, null, "X is missing");
    } else if (!y) {
        Result = MathFunctions.createErrorResult(op, x, null, null, "Y is missing");
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
            params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : null;
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
