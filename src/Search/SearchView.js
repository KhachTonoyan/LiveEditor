class SearchView {
    constructor(){
        this.searchPanel = document.createElement("div");
    }

    openSearchWindow() {
        this.searchPanel.className = "searchPanel";

        const input = document.createElement("input");
        input.id = "searchInput"
        this.searchPanel.appendChild(input);

        const goButton = document.createElement("button");
        goButton.id = "go";
        goButton.textContent = "GO!"
        this.searchPanel.appendChild(goButton)
        
        document.getElementById('app').appendChild(this.searchPanel)
    }

    printResults(path){
        const res = document.createElement("p");
        res.textContent = path;
        this.searchPanel.insertAdjacentElement('beforeend', res);
    }
}

export default SearchView;