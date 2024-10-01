export function Addition(valeur1, valeur2) {
    return valeur1 + valeur2;
}

export function Soustraction(valeur1, valeur2) {
    return valeur1 - valeur2;
}

export function Division(valeur1, valeur2) {
    if (valeur2 === 0) {
        throw new Error("Division par zéro n'est pas permise");
    }
    return valeur1 / valeur2;
}

export function Multiplication(valeur1, valeur2) {
    return valeur1 * valeur2;
}