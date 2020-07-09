import Model from "./model.js";
import View from "./view.js";

class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;

      this.model.init()
      this.model.bindOnCharactersChange(this.view.onCharactersChange)
      this.view.bindOnSearch(this.model.onSearch)
      this.view.bindOnInputChange(this.model.onInputChange)
    }
  }
  
export default function (){
      return new Controller(new Model(), new View());
  }
