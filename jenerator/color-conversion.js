function lchToLab(L,C,h){
    const rad = h*Math.PI/180;

    const a = C*Math.cos(rad);
    const b = C*Math.sin(rad);

    return [L,a,b];
}

function labToXyz(L,a,b){
    const Xn = 95.047;
    const Yn = 100.0;
    const Zn = 108.883;

    const fy = (L+16)/116;
    const fx = fy+a/500;
    const fz = fy-b/200;

    function inverseF(t){
        const delta = 6/29;
        if(t>delta){
            return t**3;
        } else {
            return 3*delta**2*(t-4/29);
        }
    }
    const X = Xn*inverseF(fx);
    const Y = Yn*inverseF(fy);
    const Z = Zn*inverseF(fz);

    return[X,Y,Z];
}

function xyzToLinearRgb(X,Y,Z){
    const x = X/100;
    const y = Y/100;
    const z = Z/100;

    const r =  3.2406 * x - 1.5372 * y - 0.4986 * z;
    const g = -0.9689 * x + 1.8758 * y + 0.0415 * z;
    const b =  0.0557 * x - 0.2040 * y + 1.0570 * z;

    return [r,g,b];
}

function linearToSrgb(value){
    if(value <= 0.0031308){
        return 12.92*value;
    } else {
        return 1.055*(value**(1/2.4))-0.055;
    }
}

function linearRgbToRgb(r,g,b){
    function convert(value){
        const srgb = linearToSrgb(value);
        const clamped = Math.max(0,Math.min(1,srgb));
        return Math.round(clamped*255);
    }
    return [convert(r),convert(g),convert(b)];
}

function rgbToHex(r,g,b){
    function toHex(value){
        return value.toString(16).padStart(2,"0");
    }
    return ("#" + toHex(r) + toHex(g) + toHex(b)).toUpperCase();
}

function lchToHex(L,C,h){
    const lab = lchToLab(L,C,h);
    const xyz = labToXyz(lab[0],lab[1],lab[2]);
    const linearRgb = xyzToLinearRgb(xyz[0],xyz[1],xyz[2]);
    const rgb = linearRgbToRgb(linearRgb[0],linearRgb[1],linearRgb[2]);
    const hex = rgbToHex(rgb[0],rgb[1],rgb[2]);
    return hex;
}

function deltaE76(lab1,lab2){
    const dL = lab1[0]-lab2[0];
    const da = lab1[1]-lab2[1];
    const db = lab1[2]-lab2[2];
    return Math.sqrt(dL**2+da**2+db**2);
}

function hexToRgb(hex){
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return [r,g,b];
}