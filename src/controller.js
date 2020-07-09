import Model from "./model.js";
import View from "./view.js";

class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;

      this.model.init()
      this.model.bindOnCharactersChange(this.view.onCharactersChange)
    }
  }
  
export default function (){
      return new Controller(new Model(), new View());
  }
