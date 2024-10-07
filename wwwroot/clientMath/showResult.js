function showResult(url){
    const path = decomposePath(url);
    let Result;
    const { op, x, y, n } = this.HttpContext.path.params;
    // Obtenir la liste des paramètres fournis dans l'objet `params`
    const allowedParams = ["op", "x", "y", "n"]; // Les seuls paramètres autorisés
    const providedParams = Object.keys(this.HttpContext.path.params); // Les paramètres effectivement présents

    // Vérifier si des paramètres non autorisés sont présents
    const extraParams = providedParams.filter(
      (param) => !allowedParams.includes(param)
    );

    if (extraParams.length > 0) {
      // S'il y a des paramètres non autorisés, créer l'erreur avec `createErrorAllResult`
      const Result = MathFunctions.createErrorAllResult(this.HttpContext.path.params);
      this.HttpContext.response.JSON(Result);
      return;
    }
    // Si l'un des paramètres requis est manquant, affiche la liste des requêtes possibles
    if (Object.keys(this.HttpContext.path.params).length === 0) {
      // Si aucun paramètre n'est présent, retourner la liste des query strings
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


// function parseQueryString(url) {
//     const queryString = url.split('?')[1];
//     console.log(queryString)
//     const params = {};

//     if (queryString) {
//         const pairs = queryString.split('&');
//         for (const pair of pairs) {
//             const [key, value] = pair.split('=');
//             params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : null;
//         }
//     }
//     console.log(params)
//     return params;
// }


function parseQueryString(url) {
    const queryString = url.split('?')[1];
    console.log(queryString)
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
    console.log(params)
    return params;
}


function decomposePath(queryString){
    let params = null;
    console.log(queryString)
    if (queryString !== undefined) {
        params = parseQueryString(queryString);
    }
    

    return { params };
};
