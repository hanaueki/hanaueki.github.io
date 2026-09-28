//HEX→RGB
function hexToRgb(hex){
    hex = hex.replace("#","");
    if(hex.length !==6){
        return null;
    }
    return{
        r: parseInt(hex.substring(0,2),16),
        g: parseInt(hex.substring(2,4),16),
        b: parseInt(hex.substring(4,6),16),
    };
}

//RGB→CIELAB sRGB/D65
function rgbToLab(r,g,b){
    r /= 255;
    g /= 255;
    b /= 255;

    //sRGB→LinearRGB
    function linearize(value){
        if (value <= 0.04045){
            return value / 12.92;
        }
        return Math.pow((value+0.055)/1.055,2.4);   
    }
    r = linearize(r);
    g = linearize(g);
    b = linearize(b);

    //linearizeRGB→XYZ
    const X = r*0.4124564 + g*0.3575761 + b*0.1804375;
    const Y = r*0.2126729 + g*0.7151522 + b*0.0721750;
    const Z = r*0.0193339 + g*0.1191920 + b*0.9503041;

    //XYZ→CIELAB
    const Xn = 0.95047;
    const Yn = 1.00000;
    const Zn = 1.08883;

    const x = X/Xn;
    const y = Y/Yn;
    const z = Z/Zn;

    const epsilon = 216/24389;
    const kappa = 24389/27;

    function f(value){
        if(value > epsilon){
            return Math.cbrt(value);
        }
        return(kappa*value+16)/116;
    }
    
    const fx = f(x);
    const fy = f(y);
    const fz = f(z);
    
    return{
        L: 116*fy-16,
        a: 500*(fx-fy),
        b: 200*(fy-fz)
    };        
}

//CIEDE2000
function deltaE2000(L1,a1,b1,L2,a2,b2){
    const deg2rad = deg => deg*Math.PI/180;
    const rad2deg = rad => rad*180/Math.PI;

    //彩度
    const C1 = Math.sqrt(a1*a1+b1*b1);
    const C2 = Math.sqrt(a2*a2+b2*b2);
    const Cbar = (C1+C2)/2;

    //G
    const Cbar7 = Math.pow(Cbar,7);
    const G = 0.5*(1-Math.sqrt(Cbar7/(Cbar7+Math.pow(25,7))));

    //a'
    const a1p = (1+G)*a1;
    const a2p = (1+G)*a2;

    //C'
    const C1p = Math.sqrt(a1p*a1p+b1*b1);
    const C2p = Math.sqrt(a2p*a2p+b2*b2);
    
    //h'
    let h1p = rad2deg(Math.atan2(b1,a1p));
    let h2p = rad2deg(Math.atan2(b2,a2p));
    if(h1p<0) h1p += 360;
    if(h2p<0) h2p += 360;

    //ΔL' ΔC' 
    const deltaLp = L2-L1;
    const deltaCp = C2p-C1p;
    
    //Δh'
    let deltahp;
    if(C1p*C2p === 0){
        deltahp = 0;
    }
    else if(Math.abs(h2p-h1p)<=180){
        deltahp = h2p-h1p;
    }
    else if(h2p-h1p>180){
        deltahp = h2p-h1p-360;
    }
    else {
        deltahp = h2p-h1p+360;
    }

    //ΔH'
    const deltaHp = 2*Math.sqrt(C1p*C2p)*Math.sin(deg2rad(deltahp/2));

    //平均L' 平均C'
    const Lbarp = (L1+L2)/2;
    const Cbarp = (C1p+C2p)/2;

    //平均h'
    let hbarp;
    if(C1p*C2p === 0){
        hbarp = h1p+h2p;
    }
    else if(Math.abs(h1p-h2p)<=180){
        hbarp = (h1p+h2p)/2;
    }
    else if(h1p+h2p<360){
        hbarp = (h1p+h2p+360)/2;
    }
    else {
        hbarp = (h1p+h2p-360)/2;
    }

    //T
    const T = 1-0.17*Math.cos(deg2rad(hbarp-30))
                +0.24*Math.cos(deg2rad(2*hbarp))
                +0.32*Math.cos(deg2rad(3*hbarp+6))
                -0.20*Math.cos(deg2rad(4*hbarp-63));

    //Δ0
    const deltaTheta = 30*Math.exp(-Math.pow((hbarp-275)/25,2));

    //RC
    const RC = 2*Math.sqrt(Math.pow(Cbarp,7)/
                (Math.pow(Cbarp,7)+Math.pow(25,7)));
    
    //SL SC SH
    const SL = 1+(0.015*Math.pow(Lbarp-50,2))/
                Math.sqrt(20+Math.pow(Lbarp-50,2));
    const SC = 1+0.045*Cbarp;
    const SH = 1+0.015*Cbarp*T;

    //RT
    const RT = -RC*Math.sin(deg2rad(2*deltaTheta));

    //最終的なΔE00
    return Math.sqrt(Math.pow(deltaLp/SL,2)+Math.pow(deltaCp/SC,2)+
                       Math.pow(deltaHp/SH,2)+RT*(deltaCp/SC)*(deltaHp/SH));                      
}

//JSONを読み込む
let colors = [];
fetch("japanese-colors.json").then(response => response.json())
    .then(data => {colors = data;
    console.log(`${colors.length}色を読み込みました`);
    searchColors();
})
.catch(error => {
    console.error("JSONの読み込みに失敗しました",error);
});

//和色を検索
function searchColors(){
    const hex = document.querySelector("#hexInput").value.trim();
    const rgb = hexToRgb(hex);

    if(!rgb){
        alert("HEXカラーコードが正しくありません");
        return;
    }

//入力色のLab
const inputLab = rgbToLab(rgb.r,rgb.g,rgb.b);

//全色とCIEDE2000で比較
const results = colors.map(color =>{
    const deltaE = deltaE2000(
        inputLab.L,inputLab.a,inputLab.b,
        color.lab.L,color.lab.a,color.lab.b
    );
    return{
        ...color,
        deltaE:deltaE
    };
});

//ΔEが小さい順
results.sort((a,b)=> a.deltaE-b.deltaE);

//上位5色
displayResults(results.slice(0,5));

}

//結果を表示
function displayResults(results){
    const container = document.querySelector("#results");
    container.innerHTML = "";
    results.forEach((color,index)=>{
        const rgb = hexToRgb(color.hex);
        const div=document.createElement("div");
        div.className="result";
        div.innerHTML=`
            <div class="color-chip" style="background-color:${color.hex};"></div>
            <div class="color-info"><h2>${index +1}位　${color.name}</h2>
                <div>読み方：${color.reading}</div>
                <div>HEX：${color.hex}</div>
                <div>RGB：（${rgb.r}、${rgb.g}、${rgb.b}）</div>
                <div class="delta-e">ΔE：${color.deltaE.toFixed(3)}</div>
            </div>
            `;
        container.appendChild(div);
    });
}

//ボタン
document.querySelector("#searchButton").addEventListener("click",searchColors);

//HEX入力時にプレビュー更新
document.querySelector("#hexInput").addEventListener("input",function(){
    const rgb =hexToRgb(this.value);
    const preview = document.querySelector("#colorPreview");
    if(rgb){
        preview.style.backgroundColor = this.value;
    }
});

//画像から色をスポイトする
const imageInput = document.querySelector("#imageInput");
const canvas = document.querySelector("#imageCanvas");
const ctx = canvas.getContext("2d");

const pickedColorChip = document.querySelector("#pickedColorChip");
const pickedHex = document.querySelector("#pickedHex");
const pickedRgb = document.querySelector("#pickedRgb");

//画像を読み込む
imageInput.addEventListener("change",function(event){
    const file = event.target.files[0];
    if(!file){
        return;
    }
    const image = new Image();
    image.onload = function(){
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image,0,0);
    };
    //ファイルを画像として読み込む
    image.src = URL.createObjectURL(file);
});

//canvasをクリックしたときの位置を取得
canvas.addEventListener("click",function(event){
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(
        (event.clientX - rect.left)*(canvas.width / rect.width)
    );
    const y = Math.floor(
        (event.clientY - rect.top)*(canvas.height / rect.height)
    );

    //クリックした場所のRBGを取得
    const pixel = ctx.getImageData(x,y,1,1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];
    pickedRgb.textContent = `RGB：（${r}、${g}、${b}）`;

    const hex = "#" + r.toString(16).padStart(2,"0") +
                g.toString(16).padStart(2,"0") + b.toString(16).padStart(2,"0");
    
    //結果を表示
    pickedHex.textContent = hex.toUpperCase();
    pickedColorChip.style.backgroundColor = hex;

    document.querySelector("#hexInput").value = hex;

    const preview = document.querySelector("#colorPreview");
    if(preview){
        preview.style.backgroundColor = hex;
    }
    searchColors();
});
    

    

    

    