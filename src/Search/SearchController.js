import SearchModel from "./SearchModel.js"
import SearchView from "./SearchView.js"
import State from '../State/State.js'

class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.initView();
    }
    
    initView(){
        document.getElementById("searchBtn").addEventListener('click', () => { 
            this.view.openSearchWindow()
        });

        document.getElementById("app").addEventListener('click', (event) => {
            if(event.target.id === "go"){
                const pattern = document.getElementById("searchInput").value;
                this.view.clearResultList();
                if(pattern) this.model.search(State.root, pattern);
            }
        })
    }

    updateResults(path){
        if(path) this.view.printResults(path);
    }
}

export default new Controller(new SearchView, new SearchModel);