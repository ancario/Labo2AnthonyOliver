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
    if (y === 0) {
        throw new Error("Division par zéro n'est pas permise");
    }
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
       
        const operateursValides = ['+',' ', '-', '*', '/', '%', '!', 'p', 'np'];
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
                return this.handleModulo(op,x,y);
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
       
        if (y === 0) {
            if (x === 0) {
                
                return this.createSuccessResult(op, x, y,"NaN");
            }
           
            return this.createSuccessResult(op, x, y, x > 0 ? "Infinity" : "-Infinity");
        }
    
        
        const result = Division(x, y);
        return this.createSuccessResult(op, x, y, result);
    }
    static handleModulo(op, x, y) {

        if (y === 0) {
            return this.createSuccessResult(op, x, y,"NaN");
        }
        const result = Modulo(x, y);

        return this.createSuccessResult(op, x, y, result);
}
    static areParametersInvalid(op, x, y) {
        return isNaN(x) || isNaN(y);
    }

    
    static createSuccessResult(op, x, y, result, n = null) {
         
  
        return n !== null
            ? { op: op, n: n, result: result }
            : { op: op, x: x, y: y, result: result};
    }

    
    static createErrorResult(op, x, y, n = null, error,bool =false) {
        if (op === ' ') {
            op = '+';
        }
        if (bool ) {
            return { op: op, n: n,error: "Parrameter n is missing" };
        }
        return n !== null
            ? { op: op, n: n, error: error }
            : { op: op, x: x, y: y,  error: error };
    }
    static createErrorAllResult(params) {
        let errorMessages = {};
        
       
    Object.entries(params).forEach(([key, value]) => {
       
        errorMessages[key] = value;
    });
        
       
        errorMessages["error"] = "Too many parameters";
        
        
        return errorMessages;
    }
}