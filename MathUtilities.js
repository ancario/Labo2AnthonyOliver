export function Addition(x, y) {
    return parseFloat(x) + parseFloat(y);
}

export function Soustraction(x, y) {
    return x - y;
}

export function Multiplication(x, y) {
    return x * y;
}

export function Division(x, y) {
    if (y === 0) {
        throw new Error("Division par zéro n'est pas permise");
    }
    return x / y;
}

export function Modulo(x, y) {
    return x % y;
}

export function Factorielle(n) {
    if (n < 0) {
        throw new Error("La factorielle n'est pas définie pour les nombres négatifs");
    }
    let resultat = 1;
    for (let i = 1; i <= n; i++) {
        resultat *= i;
    }
    return resultat;
}

export function EstPremier(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

export function NPremier(n) {
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
export class MathFunctions {
    static VerifierOperateur(operateur) {
        const operateursValides = ['+', ' ', '-', '*', '/', '%', '!', 'p', 'np'];
        return operateursValides.includes(operateur);
    }

    static calculate(op, x, y) {
        if (op === null || !this.VerifierOperateur(op)) {
            return this.createErrorResult(op, x, y, "Opérateur non valide ou manquant");
        }

        if (this.areParametersInvalid(op, x, y)) {
            return this.createErrorResult(op, x, y, "Paramètres non valides. x et y doivent être des nombres.");
        }

        switch (op) {
            case ' ':
                return this.createSuccessResult(op, x, y, Addition(x, y));
            case '-':
                return this.createSuccessResult(op, x, y, Soustraction(x, y));
            case '*':
                return this.createSuccessResult(op, x, y, Multiplication(x, y));
            case '/':
                return this.handleDivision(op, x, y);
            case '%':
                return this.createSuccessResult(op, x, y, Modulo(x, y));
            case '!':
                return this.createSuccessResult(op, x, null, Factorielle(parseInt(x)));
            case 'p':
                return this.createSuccessResult(op, x, null, EstPremier(parseInt(x)));
            case 'np':
                return this.createSuccessResult(op, x, null, NPremier(parseInt(x)));
            default:
                return this.createErrorResult(op, x, y, "Opérateur non valide");
        }
    }

    static handleDivision(op, x, y) {
        if (y === 0) {
            return this.createErrorResult(op, x, y, "Division par zéro n'est pas permise");
        }
        return this.createSuccessResult(op, x, y, Division(x, y));
    }

    static areParametersInvalid(op, x, y) {
        return  isNaN(x) ||isNaN(y);
    }

    static createSuccessResult(op, x, y, result) {
        return {
            op: op,
            x: x,
            y: y,
            result: result,
            error: null
        };
    }

    static createErrorResult(op, x, y, error) {
        return {
            op: op,
            x: x,
            y: y,
            result: null,
            error: error
        };
    }
}

    
