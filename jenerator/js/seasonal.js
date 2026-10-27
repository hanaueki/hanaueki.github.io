let currentTheme = "spring";

function displayPalette(colors){
    document.querySelector("#main-color").style.backgroundColor = colors[0];
    document.querySelector("#sub-color").style.backgroundColor = colors[1];
    document.querySelector("#accent-color").style.backgroundColor = colors[2];
}

function generatePalette(){
    if(currentTheme === "spring"){
        const palette = generateSpringPalette();
        displayPalette([palette.main.hex,palette.sub.hex,palette.accent.hex]);

        displayColorInfo("main",palette.main.hex);
        displayColorInfo("sub",palette.sub.hex);
        displayColorInfo("accent",palette.accent.hex);
    } else if(currentTheme === "summer") {
        const palette = generateSummerPalette();
        displayPalette([
            palette.main.hex,palette.sub.hex,palette.accent.hex
        ]);

        displayColorInfo("main",palette.main.hex);
        displayColorInfo("sub",palette.sub.hex);
        displayColorInfo("accent",palette.accent.hex);
    } else if(currentTheme === "autumn") {
        const palette = generateAutumnPalette();
        displayPalette([
            palette.main.hex,palette.sub.hex,palette.accent.hex
        ]);

        displayColorInfo("main",palette.main.hex);
        displayColorInfo("sub",palette.sub.hex);
        displayColorInfo("accent",palette.accent.hex);
    } else if(currentTheme === "winter") {
        const palette = generateWinterPalette();
        displayPalette([
            palette.main.hex,palette.sub.hex,palette.accent.hex
        ]);

        displayColorInfo("main",palette.main.hex);
        displayColorInfo("sub",palette.sub.hex);
        displayColorInfo("accent",palette.accent.hex);
    } else if(currentTheme === "halloween") {
        const palette = generateHalloweenPalette();
        displayPalette([
            palette.main.hex,palette.sub.hex,palette.accent.hex
        ]);

        displayColorInfo("main",palette.main.hex);
        displayColorInfo("sub",palette.sub.hex);
        displayColorInfo("accent",palette.accent.hex);
    } else if(currentTheme === "christmas") {
        const palette = generateChristmasPalette();
        displayPalette([
            palette.main.hex,palette.sub.hex,palette.accent.hex
        ]);

        displayColorInfo("main",palette.main.hex);
        displayColorInfo("sub",palette.sub.hex);
        displayColorInfo("accent",palette.accent.hex);
    } else if(currentTheme === "valentine") {
        const palette = generateValentinePalette();
        displayPalette([
            palette.main.hex,palette.sub.hex,palette.accent.hex
        ]);

        displayColorInfo("main",palette.main.hex);
        displayColorInfo("sub",palette.sub.hex);
        displayColorInfo("accent",palette.accent.hex);
    } else if(currentTheme === "newYear") {
        const palette = generateNewYearPalette();
        displayPalette([
            palette.main.hex,palette.sub.hex,palette.accent.hex
        ]);

        displayColorInfo("main",palette.main.hex);
        displayColorInfo("sub",palette.sub.hex);
        displayColorInfo("accent",palette.accent.hex);
    }
} 

document.querySelector("#generate-btn").addEventListener("click",generatePalette);

generatePalette();

function randomRange(min,max){
    return Math.random()*(max-min)+min;
}

function generateSpringRed(){
    const L = randomRange(70,85);
    const C = randomRange(18,38);
    const h = randomRange(-35,28);
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return {hex:hex,lab:lab};
}

function generateSpringGreen(){
    const L = randomRange(75,93);
    const C = randomRange(46,61);
    const h = randomRange(96,122);
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return {hex:hex,lab:lab};
}

function generateSpringMainSub(){
    const colors =[generateSpringRed,generateSpringGreen];
    const index = Math.floor(Math.random()*colors.length);
    return colors[index]();
}

function generateSpringYellow(){
    const L = randomRange(80,95);
    const C = randomRange(30,60);
    const h = randomRange(60,90);
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return {hex:hex,lab:lab};
}

function generateSpringPurple(){
    const L = randomRange(70,90);
    const C = randomRange(15,35);
    const h = randomRange(280,330);
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return {hex:hex,lab:lab};
}

function generateSpringAccent(){
    const colors = [generateSpringYellow,generateSpringPurple];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index]();
}

function generateSpringPalette(){
    const main = generateSpringMainSub();
    let sub = generateSpringMainSub();
    let difference = deltaE76(main.lab,sub.lab);
    let attempts = 0;
    while(difference <20 && attempts <100){
        sub = generateSpringMainSub();
        difference = deltaE76(main.lab,sub.lab);
        attempts++;
    }
    const accent = generateSpringAccent();
    return{main:main,sub:sub,accent:accent,deltaE:difference};
}

function generateSummerBlue(){
    const L = randomRange(56,84);
    const C = randomRange(23,40);
    const h = randomRange(220,270);
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateSummerYellow(){
    const L = randomRange(54,74);
    const C = randomRange(39,76);
    const h = randomRange(39,74);
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateSummerGreen(){
    const L = randomRange(89,94);
    const C = randomRange(50,77);
    const h = randomRange(95,133);
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateSummerRed(){
    const colors =[
        { L: 57.8, C: 61.0, h: 22.1 },
        { L: 58.2, C: 48.6, h: 343.6 }
    ];
    const index = Math.floor(Math.random()*colors.length);
    const color = colors[index];
    return{
        hex:lchToHex(color.L,color.C,color.h),
        lab:lchToLab(color.L,color.C,color.h)
    };
}

function generateSummerPurple(){
    const colors =[
        { L: 24.1, C: 38.2, h: 281.9 },
        { L: 44.5, C: 47.3, h: 274.1 }
    ];
    const index = Math.floor(Math.random()*colors.length);
    const color = colors[index];
    return{
        hex:lchToHex(color.L,color.C,color.h),
        lab:lchToLab(color.L,color.C,color.h)
    };
}

function generateSummerBlueGreen(){
    const L = 71.8;
    const C = 32.6;
    const h = 176.3;
    
    return{
        hex:lchToHex(L,C,h),
        lab:lchToLab(L,C,h)
    };
}

function generateSummerColor(){
    const colors =[
        {generate:generateSummerYellow,weight:10},
        {generate:generateSummerGreen,weight:9},
        {generate:generateSummerBlue,weight:8},
        {generate:generateSummerRed,weight:2},
        {generate:generateSummerPurple,weight:2},
        {generate:generateSummerBlueGreen,weight:1}
    ];
    const totalWeight = 32;
    let random = Math.random()*totalWeight;
    for(const color of colors){
        random -= color.weight;
        if(random < 0){
            return color.generate();
        }
    }
}

function generateSummerMainSub(){
    const patterns = [
        [generateSummerBlue,generateSummerYellow],
        [generateSummerBlue,generateSummerGreen],
        [generateSummerYellow,generateSummerGreen]
    ];
    const index = Math.floor(Math.random()*patterns.length);
    const pattern = patterns[index];
    const main = pattern[0]();
    const sub = pattern[1]();
    return {main:main,sub:sub};
}

function generateSummerAccent(){
    const colors = [
        generateSummerRed,generateSummerPurple,generateSummerBlueGreen,generateSummerYellow
    ];
    const index = Math.floor(Math.random()*colors.length);
    return colors[index]();
}

function generateSummerPalette(){
    const pair = generateSummerMainSub();
    const main = pair.main;
    let sub = pair.sub;
    let difference = deltaE76(main.lab,sub.lab);
    let attempts = 0;
    while(difference < 20 && attempts < 100){
        sub = generateSummerMainSub().sub;
        difference = deltaE76(main.lab,sub.lab);
        attempts++;
    }
    let accent = generateSummerAccent();
    let accentDifference = deltaE76(main.lab,accent.lab);
    let accentAttempts = 0;
    while(accentDifference < 20 && accentAttempts < 100){
        accent = generateSpringAccent();
        accentDifference = deltaE76(main.lab,accent.lab);
        accentAttempts++;
    }
    return{main:main,sub:sub,accent:accent,deltaE:difference,accentDeltaE:accentDifference};
}

function generateAutumnOrange(){
    let L;
    let C;
    let h;
    if(Math.random()<0.5){
        L = randomRange(50,70);
        C = randomRange(55,75);
        h = randomRange(40,55);
    } else {
        L = randomRange(45,65);
        C = randomRange(25,45);
        h = randomRange(50,70);
    }
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateAutumnYellow(){
    const L = randomRange(73,85);
    const h = randomRange(75,96);
    let C;
    if(Math.random()<0.5){
        C = randomRange(55,82);
    } else {
        C = randomRange(20,35)
    }
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateAutumnBrown(){
    let L;
    let C;
    let h;
    if(Math.random()<0.5){
        L = randomRange(38,55);
        C = randomRange(20,40);
        h = randomRange(110,135);
    } else {
        L = randomRange(60,70);
        C = randomRange(50,68);
        h = randomRange(110,135);
    }
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateAutumnGreen(){
    const L = randomRange(38,65);
    const C = randomRange(22,55);
    const h = randomRange(95,133);
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateAutumnPink(){
    const L = randomRange(65,85);
    const C = randomRange(14,30);
    const h = randomRange(340,380);
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateAutumnPurple(){
    const L = randomRange(45,65);
    const C = randomRange(15,30);
    const h = randomRange(300,330);
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateAutumnColor(){
    const colors =[
        {generate:generateAutumnOrange,weight:32},
        {generate:generateAutumnYellow,weight:23},
        {generate:generateAutumnBrown,weight:23},
        {generate:generateAutumnGreen,weight:14},
        {generate:generateAutumnPink,weight:5},
        {generate:generateAutumnPurple,weight:3}
    ];
    const totalWeight = 100;
    let random = Math.random()*totalWeight;
    for(const color of colors){
        random -= color.weight;
        if(random < 0){
            return color.generate();
        }
    }
}

function generateAutumnPalette(){
    const main = generateAutumnColor();
    let sub = generateAutumnColor();
    let difference = deltaE76(main.lab,sub.lab);
    let attempts = 0;
    while(difference <20 && attempts <100){
        sub = generateAutumnColor();
        difference = deltaE76(main.lab,sub.lab);
        attempts++;
    }
    const accent = generateAutumnColor();
    return{main:main,sub:sub,accent:accent,deltaE:difference};
}

function generateWinterNeutral(){
    let L;
    let C;
    let h;
    if(Math.random()<0.5){
        L = randomRange(84,97);
        C = randomRange(1,6);
        h = randomRange(220,310);
    } else {
        L = randomRange(25,65);
        C = randomRange(2,12);
        h = randomRange(220,310);
    }
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateWinterBlue(){
    let L;
    let C;
    let h;
    const type = Math.random();
    if(type < 0.33){
        L = randomRange(70,85);
        C = randomRange(15,30);
        h = randomRange(230,270);
    } else if (type < 0.66) {
        L = randomRange(70,85);
        C = randomRange(15,30);
        h = randomRange(230,270);
    } else {
        L = randomRange(20,40);
        C = randomRange(25,50);
        h = randomRange(270,300);
    }
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateWinterBrown(){
    let L;
    let C;
    let h;
    const type = Math.random();
    if(type < 0.33){
        L = randomRange(78,88);
        C = randomRange(8,20);
        h = randomRange(60,80);
    } else if (type < 0.66) {
        L = randomRange(60,75);
        C = randomRange(25,45);
        h = randomRange(55,80);
    } else {
        L = randomRange(25,48);
        C = randomRange(20,45);
        h = randomRange(35,70);
    }
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateWinterGreen(){
    let L;
    let C;
    let h;
    if(Math.random()<0.5){
        L = randomRange(35,55);
        C = randomRange(20,40);
        h = randomRange(145,175);
    } else {
        L = randomRange(60,75);
        C = randomRange(25,45);
        h = randomRange(170,200);
    }
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateWinterYellow(){
    let L;
    let C;
    let h;
    if(Math.random()<0.5){
        L = randomRange(70,82);
        C = randomRange(45,65);
        h = randomRange(75,95);
    } else {
        L = randomRange(85,95);
        C = randomRange(25,45);
        h = randomRange(85,105);
    }
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateWinterPurple(){
    const L = randomRange(60,75);
    const C = randomRange(15,30);
    const h = randomRange(280,310);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateWinterPalette(){
    const patterns = [
        [generateWinterNeutral,generateWinterBlue,generateWinterPurple],
        [generateWinterBlue,generateWinterPurple,generateWinterYellow],
        [generateWinterBrown,generateWinterBrown,generateWinterNeutral],
        [generateWinterNeutral,generateWinterGreen,generateWinterYellow],
        [generateWinterBlue,generateWinterGreen,generateWinterPurple]
    ];
    const index = Math.floor(Math.random()*patterns.length);
    const pattern = patterns[index];

    const main = pattern[0]();
    const sub = pattern[1]();
    const accent = pattern[2]();
    return{main:main,sub:sub,accent:accent};
}

function generateHalloweenOrange(){
    const L = randomRange(55,65);
    const C = randomRange(55,75);
    const h = randomRange(50,65);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateHalloweenPurple(){
    const L = randomRange(35,60);
    const C = randomRange(25,55);
    const h = randomRange(310,335);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateHalloweenGreen(){
    const L = randomRange(45,70);
    const C = randomRange(35,65);
    const h = randomRange(125,150);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateHalloweenYellow(){
    const L = randomRange(70,90);
    const C = randomRange(45,80);
    const h = randomRange(75,100);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateHalloweenBeige(){
    const L = randomRange(75,90);
    const C = randomRange(10,35);
    const h = randomRange(55,85);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateHalloweenRedBrown(){
    const L = randomRange(25,55);
    const C = randomRange(20,55);
    const h = randomRange(20,50);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateHalloweenWhite(){
    const L = randomRange(90,98);
    const C = randomRange(1,8);
    const h = randomRange(200,300);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateHalloweenBlack(){
    const hex = "#000000";
    const lab ={L:0,a:0,b:0}
    return{hex:hex,lab:lab};
}

function generateHalloweenPalette(){
    const patterns = [
        [generateHalloweenOrange,generateHalloweenPurple,generateHalloweenBlack],
        [generateHalloweenPurple,generateHalloweenGreen,generateHalloweenBlack],
        [generateHalloweenOrange,generateHalloweenGreen,generateHalloweenPurple],
        [generateHalloweenYellow,generateHalloweenOrange,generateHalloweenBlack],
        [generateHalloweenBeige,generateHalloweenYellow,generateHalloweenOrange],
        [generateHalloweenOrange,generateHalloweenRedBrown,generateHalloweenBlack],
        [generateHalloweenWhite,generateHalloweenOrange,generateHalloweenYellow],
        [generateHalloweenBeige,generateHalloweenPurple,generateHalloweenRedBrown],
    ];
    const index = Math.floor(Math.random()*patterns.length);
    const pattern = patterns[index];

    const main = pattern[0]();
    const sub = pattern[1]();
    const accent = pattern[2]();
    return{main:main,sub:sub,accent:accent};
}

function generateChristmasRed(){
    const L = randomRange(35,60);
    const C = randomRange(45,85);
    const h = randomRange(15,40);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateChristmasGreen(){
    const L = randomRange(35,72);
    const C = randomRange(25,50);
    const h = randomRange(120,185);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateChristmasBlue(){
    const L = randomRange(28,45);
    const C = randomRange(25,50);
    const h = randomRange(270,290);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateChristmasGold(){
    const L = randomRange(75,88);
    const C = randomRange(40,70);
    const h = randomRange(80,100);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateChristmasWhite(){
    const L = randomRange(78,96);
    const C = randomRange(0,10);
    const h = randomRange(0,360);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateChristmasBeige(){
    const L = randomRange(45,85);
    const C = randomRange(5,45);
    const h = randomRange(55,95);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateChristmasPalette(){
    const patterns = [
        ["red","green","gold"],
        ["white","green","red"],
        ["blue","red","white"],
        ["beige","red","gold"],
        ["blue","red","gold"]
    ];
    const index = Math.floor(Math.random()*patterns.length);
    const pattern = patterns[index];

    const generators = {
        red : generateChristmasRed, green:generateChristmasGreen,
        gold:generateChristmasGold, blue :generateChristmasBlue,
        white:generateChristmasWhite,beige:generateChristmasBeige
    };

    const main = generators[pattern[0]]();
    const sub = generators[pattern[1]]();
    const accent = generators[pattern[2]]();
    return{main:main,sub:sub,accent:accent};
}

function generateValentineRed(){
    const L = randomRange(48,56);
    const C = randomRange(45,58);
    const h = randomRange(10,30);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateValentineRose(){
    const L = randomRange(48,66);
    const C = randomRange(35,55);
    const h = randomRange(340,370);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateValentineLightPink(){
    const L = randomRange(79,93);
    const C = randomRange(6,22);
    const h = randomRange(340,375);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateValentineBrown(){
    const L = randomRange(45,63);
    const C = randomRange(20,35);
    const h = randomRange(40,55);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateValentineCream(){
    const L = randomRange(70,95);
    const C = randomRange(15,40);
    const h = randomRange(65,100);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateValentineWhite(){
    const L = randomRange(91,100);
    const C = randomRange(0,5);
    const h = randomRange(0,360);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateValentinePalette(){
    const patterns = [
        ["lightPink","rose","white"],
        ["brown","red","cream"],
        ["rose","lightPink","red"],
        ["brown","rose","white"],
        ["cream","brown","lightPink"]
    ];
    const index = Math.floor(Math.random()*patterns.length);
    const pattern = patterns[index];

    const generators = {
        red : generateValentineRed, rose:generateValentineRose,
        lightPink:generateValentineLightPink, brown :generateValentineBrown,
        white:generateValentineWhite,cream:generateValentineCream
    };

    const main = generators[pattern[0]]();
    const sub = generators[pattern[1]]();
    const accent = generators[pattern[2]]();
    return{main:main,sub:sub,accent:accent};
}

function generateNewYearRed(){
    const L = randomRange(45,60);
    const C = randomRange(55,75);
    const h = randomRange(25,45);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateNewYearGold(){
    const L = randomRange(70,82);
    const C = randomRange(45,75);
    const h = randomRange(70,95);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateNewYearGreen(){
    const L = randomRange(43,60);
    const C = randomRange(30,55);
    const h = randomRange(120,155);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateNewYearPink(){
    const L = randomRange(60,75);
    const C = randomRange(35,50);
    const h = randomRange(345,365);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateNewYearCream(){
    const L = randomRange(78,96);
    const C = randomRange(3,25);
    const h = randomRange(60,90);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateNewYearBlue(){
    const L = randomRange(50,75);
    const C = randomRange(10,30);
    const h = randomRange(250,290);
   
    const hex = lchToHex(L,C,h);
    const lab = lchToLab(L,C,h);
    return{hex:hex,lab:lab};
}

function generateNewYearBlack(){
    const hex = "#000000";
    const lab ={L:0,a:0,b:0}
    return{hex:hex,lab:lab};
}

function generateNewYearPalette(){
    const patterns = [
        ["red","gold","black"],
        ["red","gold","black"],
        ["cream","green","red"],
        ["cream","green","red"],
        ["pink","red","cream"],
        ["cream","gold","blue"],
        ["cream","green","pink"]
    ];
    const index = Math.floor(Math.random()*patterns.length);
    const pattern = patterns[index];

    const generators = {
        red : generateNewYearRed, gold:generateNewYearGold,
        green:generateNewYearGreen, pink :generateNewYearPink,
        blue:generateNewYearBlue,cream:generateNewYearCream,
        black:generateNewYearBlack
    };

    const main = generators[pattern[0]]();
    const sub = generators[pattern[1]]();
    const accent = generators[pattern[2]]();
    return{main:main,sub:sub,accent:accent};
}

function displayColorInfo(name,hex){
    document.querySelector(`#${name}-chip`).style.backgroundColor = hex;
    document.querySelector(`#${name}-hex`).textContent = hex;
    const rgb = hexToRgb(hex);
    document.querySelector(`#${name}-rgb`).textContent = 
        `RGB(${rgb[0]},${rgb[1]},${rgb[2]})`;       
}

document.querySelectorAll(".copy-btn").forEach(function(button) {
    let messageTimer;
    button.addEventListener("click",async function() {
        const name = button.dataset.color;
        const hex = document.querySelector(`#${name}-hex`).textContent;
        const message = document.querySelector(`#${name}-copy-message`);
        try{
            await navigator.clipboard.writeText(hex);
            message.textContent = "コピーしました";
            clearTimeout(messageTimer);
            messageTimer = setTimeout(function() {
                message.textContent = "";
            },2000);
        } catch (error){
            message.textContent = "コピーできませんでした";
            console.error(error);
        }
    });
});

document.querySelector("#theme-select").addEventListener("change",function(){
    currentTheme = this.value;
    if(currentTheme === "spring"){
        document.querySelector("#season-title").textContent ="春の配色";
    } else if (currentTheme === "summer"){
        document.querySelector("#season-title").textContent ="夏の配色";
    } else if (currentTheme === "autumn"){
        document.querySelector("#season-title").textContent ="秋の配色";
    } else if (currentTheme === "winter"){
        document.querySelector("#season-title").textContent ="冬の配色";
    } else if (currentTheme === "halloween"){
        document.querySelector("#season-title").textContent ="ハロウィンの配色";
    } else if (currentTheme === "christmas"){
        document.querySelector("#season-title").textContent ="クリスマスの配色";
    } else if (currentTheme === "valentine"){
        document.querySelector("#season-title").textContent ="バレンタインの配色";
    } else if (currentTheme === "newYear"){
        document.querySelector("#season-title").textContent ="新年の配色";
    }
    generatePalette();
});
