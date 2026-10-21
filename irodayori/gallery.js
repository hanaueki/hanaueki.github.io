function displaySavedPalettes(){
    const container = document.querySelector("#saved-palettes");
    container.innerHTML = "";

    const savedPalettes = JSON.parse(
        localStorage.getItem("irodayori-palettes") || "[]"
    );
    savedPalettes.forEach(function(palette,index){
        const item = document.createElement("div");
        item.className = "saved-item";

        const date = document.createElement("p");
        date.className = "saved-date";
        date.textContent = palette.date;
        item.appendChild(date);

        const colors = document.createElement("div");
        colors.className = "saved-colors";

        palette.colors.forEach(function(hex){
            const color = document.createElement("div");
            color.className = "saved-color";
            color.style.backgroundColor = hex;
            colors.appendChild(color);
        });
        item.appendChild(colors);

        const message = document.createElement("p");
        message.className = "saved-message";
        message.textContent = palette.message;

        item.appendChild(message);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click",function(){
            const result = confirm("このいろだよりを削除しますか？");
            if(!result){
                return;
            }
            savedPalettes.splice(index,1);
            localStorage.setItem("irodayori-palettes",JSON.stringify(savedPalettes));
            displaySavedPalettes();
        });
        item.appendChild(deleteButton);
        container.appendChild(item);
    });
}

displaySavedPalettes();