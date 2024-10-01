import Controller from "./Controller.js";
import {MathFunctions }from "../MathUtilities.js";
export default class MathsController extends Controller {
  constructor(HttpContext) {
    super(HttpContext);
  }

  get() {
    
    const { op, x, y } = this.HttpContext.path.params
    let Result = MathFunctions.calculate(op, x, y);
    
    // Retour de la réponse JSON
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
