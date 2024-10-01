export function Addition(x, y) {
    return x + y;
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
``
