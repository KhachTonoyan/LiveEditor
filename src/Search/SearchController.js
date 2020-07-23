import SearchModel from "./SearchModel.js"
import SearchView from "./SearchView.js"

class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.initView();
    }
    
    initView(){
        document.getElementById("search").addEventListener('click', () => this.view.openSearchWindow());

        document.getElementById("app").addEventListener('click', (event) => {
            if(event.target.id === "go"){
                this.model.search();
            }
        })
    }
}

export default new Controller(new SearchView, new SearchModel);