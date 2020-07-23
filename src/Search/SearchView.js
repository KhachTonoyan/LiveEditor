class SearchView {
    constructor() {

    }

    openSearchWindow() {
        const searchPanel = document.createElement("div");
        searchPanel.className = "searchPanel";

        const input = document.createElement("input");
        input.id = "searchInput"
        searchPanel.appendChild(input);

        const goButton = document.createElement("button");
        goButton.id = "go";
        goButton.textContent = "GO!"
        searchPanel.appendChild(goButton)
        
        document.getElementById('app').appendChild(searchPanel)
    }
}

export default SearchView;