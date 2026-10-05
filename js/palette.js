// HEX→HSL
function hexToHsl(hex){
    hex = hex.replace("#","");

    const r = parseInt(hex.slice(0,2),16)/255;
    const g = parseInt(hex.slice(2,4),16)/255;
    const b = parseInt(hex.slice(4,6),16)/255;

    const max = Math.max(r,g,b);
    const min = Math.min(r,g,b);

    let h = 0;
    let s = 0;
    const l = (max+min)/2;

    if(max !== min){
        const d = max-min;

        s = l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);

        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
    h *= 60;
    }
    return{
        h:h, s:s*100, l:l*100
    };
}

//HSL→HEX
function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60)      [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else              [r, g, b] = [c, 0, x];

  const toHex = value =>
    Math.round((value + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

//色から3パターンの配色を生成
function generatePalettes(hex) {
  const base = hexToHsl(hex);

  function color(hue, sat, light) {
    return hslToHex(hue, sat, light);
  }

  const h = base.h;
  const s = base.s;
  const l = base.l;

  return [
    {
      name: "やさしい調和",
      description: "近い色相を使った穏やかな配色",
      colors: [
        hex,
        color(h + 25, s * 0.75, l + 12),
        color(h - 25, s * 0.65, l + 22)
      ]
    },
    {
      name: "反対色のアクセント",
      description: "色相差をつけた印象的な配色",
      colors: [
        hex,
        color(h + 150, s * 0.75, l + 5),
        color(h + 180, s * 0.65, l + 18)
      ]
    },
    {
      name: "落ち着いた世界観",
      description: "明度差をつけたまとまりのある配色",
      colors: [
        hex,
        color(h, s * 0.75, l - 18),
        color(h + 12, s * 0.35, l + 25)
      ]
    }
  ];
}

function displayPalettes(palettes) {
  const container =
    document.getElementById("palette-results");

  container.innerHTML = "";

  palettes.forEach(palette => {
    const card = document.createElement("div");
    card.className = "palette-card";

    const title = document.createElement("h3");
    title.textContent = palette.name;
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = palette.description;
    card.appendChild(description);

    const chips = document.createElement("div");
    chips.className = "palette-chips";

    palette.colors.forEach(hex => {
      const item = document.createElement("div");
      item.className = "palette-color";

      const swatch = document.createElement("div");
      swatch.className = "palette-swatch";
      swatch.style.backgroundColor = hex;

      const code = document.createElement("p");
      code.textContent = hex.toUpperCase();

      item.appendChild(swatch);
      item.appendChild(code);
      chips.appendChild(item);
    });

    card.appendChild(chips);
    container.appendChild(card);
  });
}

document
    .querySelector("#generate-palette-btn")
    .addEventListener("click", function () {

        const hex = document
            .querySelector("#hexInput")
            .value
            .trim();

        if (!hex) {
            alert("先に画像から色をスポイトしてください。");
            return;
        }

        const palettes = generatePalettes(hex);

        displayPalettes(palettes);
    });
