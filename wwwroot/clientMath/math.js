function Addition(x, y) {
    return parseFloat(x) + parseFloat(y);
}

function Soustraction(x, y) {
    return x - y;
}

function Multiplication(x, y) {
    return x * y;
}

function Division(x, y) {
    if (y === 0) {
        throw new Error("Division par zéro n'est pas permise");
    }
    return x / y;
}

function Modulo(x, y) {
    return x % y;
}

function Factorielle(n) {
    if (n < 0) {
        throw new Error("La factorielle n'est pas définie pour les nombres négatifs");
    }
    let resultat = 1;
    for (let i = 1; i <= n; i++) {
        resultat *= i;
    }
    return resultat;
}

function EstPremier(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function NPremier(n) {
    let count = 0;
    let num = 2;
    while (count < n) {
        if (EstPremier(num)) {
            count++;
        }
        num++;
    }
    return num - 1;
}
// Classe MathFunctions
class MathFunctions {
    static VerifierOperateur(operateur) {

        const operateursValides = ['+', ' ', '-', '*', '/', '%', '!', 'p', 'np'];
        return operateursValides.includes(operateur);
    }

    static calculate(op, x, y) {

        if (op === ' ') {
            op = '+';
        }
        if (op === null || !this.VerifierOperateur(op)) {
            return this.createErrorResult(op, x, y, null, "Opérateur non valide ou manquant");
        }

        if (this.areParametersInvalid(op, x, y)) {
            return this.createErrorResult(op, x, y, null, "Paramètres non valides. x et y doivent être des nombres.");
        }

        switch (op) {
            case '+':
                return this.createSuccessResult(op, x, y, Addition(x, y));
            case '-':
                return this.createSuccessResult(op, x, y, Soustraction(x, y));
            case '*':
                return this.createSuccessResult(op, x, y, Multiplication(x, y));
            case '/':
                return this.handleDivision(op, x, y);
            case '%':
                console.log("modulo")
                return this.createSuccessResult(op, x, y, Modulo(x, y));
            case '!':
                return this.createSuccessResult(op, null, null, Factorielle(parseInt(x)), parseInt(x));
            case 'p':
                return this.createSuccessResult(op, null, null, EstPremier(parseInt(x)), parseInt(x));
            case 'np':
                return this.createSuccessResult(op, null, null, NPremier(parseInt(x)), parseInt(x));
            default:
                return this.createErrorResult(op, x, y, null, "Opérateur non valide");
        }
    }

    static handleDivision(op, x, y) {
        // Cas de la division par zéro
        if (y === 0) {
            if (x === 0) {
                // 0 / 0 => NaN
                return this.createSuccessResult(op, x, y, "NaN");
            }
            // Division par zéro : renvoie Infinity ou -Infinity en fonction du signe de x
            return this.createSuccessResult(op, x, y, x > 0 ? "Infinity" : "-Infinity");
        }

        // Cas normal de division
        const result = Division(x, y);
        return this.createSuccessResult(op, x, y, result);
    }

    static areParametersInvalid(op, x, y) {
        return isNaN(x) || isNaN(y);
    }

    // Ajout de la gestion de 'n' dans les résultats de succès
    static createSuccessResult(op, x, y, result, n = null) {
        // Si 'bool' est true, on renvoie une erreur associée à 'n'

        return n !== null
            ? { op: op, n: n, result: result }
            : { op: op, x: x, y: y, result: result };
    }

    // Ajout de la gestion de 'n' dans les résultats d'erreur
    static createErrorResult(op, x, y, n = null, error, bool = false) {
        if (bool) {
            return { op: op, n: n, error: "Parrameter n is missing" };
        }
        return n !== null
            ? { op: op, n: n, error: error }
            : { op: op, x: x, y: y, error: error };
    }
}