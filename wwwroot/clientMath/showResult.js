import {MathFunctions }from "./math.js";
export const showResult = (url) => {
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

export const decomposePath = (url) => {
    let isAPI = false;
    let model = undefined;
    let controllerName = undefined;
    let action = undefined;
    let id = undefined;
    let params = null;

    let queryString = getQueryString(url);
    if (queryString !== undefined) {
        params = queryStringParser.parse(queryString);
    }

    let path = removeQueryString(url).toLowerCase();

    if (path.indexOf('/api') > -1) {
        isAPI = true;
        path = path.replace('/api', '');
    }

    let urlParts = path.split("/");

    if (urlParts[1] !== undefined) {
        model = urlParts[1];
        controllerName = capitalizeFirstLetter(model) + 'Controller';
    }

    if (!isAPI) {
        if (urlParts[2] !== undefined && urlParts[2] !== '') {
            action = urlParts[2];
        } else {
            action = 'index';
        }

        if (urlParts[3] !== undefined) {
            id = parseInt(urlParts[3]);
        }
    } else {
        if (urlParts[2] !== undefined) {
            id = parseInt(urlParts[2]);
        }
    }

    return { isAPI, model, controllerName, action, id, queryString, params };
};
