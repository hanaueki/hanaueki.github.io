for(let i=1;i<=3;i++){
    const picker = document.querySelector(`#picker${i}`);
    const color = document.querySelector(`#color${i}`);
    const hex = document.querySelector(`#hex${i}`);

    color.style.backgroundColor = picker.value;
    hex.textContent = picker.value.toUpperCase();

    picker.addEventListener("input",function(){
        color.style.backgroundColor = picker.value;
        hex.textContent = picker.value.toUpperCase();
    });
}

const dateDisplay = document.querySelector("#date-display");
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth()+1;
const day = today.getDate();
dateDisplay.textContent = `${year}年${month}月${day}日`;
dateDisplay.dateTime = `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

const messageInput = document.querySelector("#message");
const messageDisplay = document.querySelector("#message-display");
messageInput.addEventListener("input",function(){
    messageDisplay.textContent = messageInput.value.trim();
});

const saveButton = document.querySelector("#save-btn");
const saveArea = document.querySelector("#save-area");
saveButton.addEventListener("click",async function() {
    const canvas = await html2canvas(saveArea,{
        backgroundColor:"#ffffff",
        scale:2
    });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "irodayori.png";
    link.click();
});

const savePaletteButton = document.querySelector("#save-palette-btn");
savePaletteButton.addEventListener("click",function(){
    const palette = {
        date:dateDisplay.textContent,
        colors:[
            document.querySelector("#picker1").value,
            document.querySelector("#picker2").value,
            document.querySelector("#picker3").value
        ],
        message:messageInput.value.trim()
    };
    const savedPalettes = JSON.parse(
        localStorage.getItem("irodayori-palettes") || "[]"
    );
    savedPalettes.unshift(palette);
    localStorage.setItem("irodayori-palettes",JSON.stringify(savedPalettes));
    alert("いろだよりを保存しました！");
});