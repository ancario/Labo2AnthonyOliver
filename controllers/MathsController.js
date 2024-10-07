import Controller from "./Controller.js";
import { MathFunctions } from "../MathUtilities.js";
export default class MathsController extends Controller {
  constructor(HttpContext) {
    super(HttpContext);
  }

  get() {
    let Result;
    const { op, x, y, n } = this.HttpContext.path.params;
    
    // Obtenir la liste des paramètres fournis dans l'objet `params`
    const allowedParams = ["op", "x", "y", "n","X","Y"]; // Les seuls paramètres autorisés
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
    
    if (Object.keys(this.HttpContext.path.params).length === 0) {
      // Si aucun paramètre n'est présent, retourner la liste des query strings
      this.HttpContext.response.HTML(generateQueryStringList());
      return;
    }

    if (["!", "p", "np"].includes(op)) {
      // Vérifie si 'n' est manquant ou n'est pas un nombre
      if (n === undefined || isNaN(n)) {
        if (n === undefined) {
          Result = MathFunctions.createErrorResult(
            op,
            null,
            null,
            n,
            "Parameter 'n' is missing",
            true
          );
        } else {
          Result = MathFunctions.createErrorResult(
            op,
            null,
            null,
            n,
            "Parameter 'n' is not a number"
          );
        }
      }
      // Vérifie si 'n' est un entier > 0
      else if (parseInt(n) <= 0 || !Number.isInteger(parseFloat(n))) {
        Result = MathFunctions.createErrorResult(
          op,
          null,
          null,
          n,
          "Parameter 'n' must be an integer > 0"
        );
      } else {
        Result = MathFunctions.calculate(op, parseInt(n), null);
      }
    } else if (op && x && y) {
      // Vérifie si x ou y ne sont pas des nombres
      if (isNaN(x)) {
        Result = MathFunctions.createErrorResult(
          op,
          x,
          y,
          null,
          "X is not a number"
        );
      } else if (isNaN(y)) {
        Result = MathFunctions.createErrorResult(
          op,
          x,
          y,
          null,
          "Y is not a number"
        );
      } else {
        // Si x et y sont des nombres valides, on procède avec le calcul
        Result = MathFunctions.calculate(op, parseFloat(x), parseFloat(y));
      }
    } else if (!x) {
      // Si x est manquant, retourne une erreur spécifique
      Result = MathFunctions.createErrorResult(
        op,
        null,
        y,
        null,
        "X is missing"
      );
    } else if (!y) {
      // Si y est manquant, retourne une erreur spécifique
      Result = MathFunctions.createErrorResult(
        op,
        x,
        null,
        null,
        "Y is missing"
      );
    } else {
      // Si les paramètres 'x' ou 'y' sont invalides
      Result = MathFunctions.createErrorResult(
        op,
        x,
        y,
        null,
        "Paramètres 'x' ou 'y' manquants ou non valides"
      );
    }

    // Retourner le résultat sous forme JSON
    this.HttpContext.response.JSON(Result);
  }

  post() {
    HttpContext.response.notImplemented();
  }
  put() {
    HttpContext.response.notImplemented();
  }
  remove() {
    HttpContext.response.notImplemented();
  }
}
function generateQueryStringList() {
  return `
    <h3>GET : Maths endpoint</h3>
    <h3>List of possible query strings:</h3>
    <pre style="font-size: 18px;"><strong>
      ? op = + & x = number & y = number
      return {"op":"+","x":number,"y":number,"value": x + y}

      ? op = - & x = number & y = number
      return {"op":"-","x":number,"y":number,"value": x - y}

      ? op = * & x = number & y = number
      return {"op":"*","x":number,"y":number,"value": x * y}

      ? op = / & x = number & y = number
      return {"op":"/","x":number,"y":number,"value": x / y}

      ? op = % & x = number & y = number
      return {"op":"%","x":number,"y":number,"value": x % y}

      ? op = ! & n = integer
      return {"op":"!","n":integer,"value": n!}

      ? op = p & n = integer
      return {"op":"p","n":integer,"value": true if n is a prime number}

      ? op = np & n = integer
      return {"op":"np","n":integer,"value": nth prime number}
    </strong></pre>
  `;
}
