// =========================================
// マンションポエムメーカー プログラム部分
// =========================================

// ---------- 1. 基本の言葉の材料 ----------
// 特徴を何も選ばなかったとき、または特徴側に言葉が無いときに使う。
const words = {
  place: ["都心", "丘の上", "水辺", "杜", "天空", "静寂の邸宅街", "歴史の交差点",
          "光あふれる高台", "風の通り道", "都市の頂", "緑の回廊"],
  noun:  ["森", "静寂", "楽園", "邸宅", "品格", "物語", "余白", "光", "誇り",
          "安らぎ", "迎賓館", "美術館", "聖域", "庭園", "舞台"],
  adj:   ["選ばれし", "洗練の", "悠久の", "至高の", "気高き", "唯一無二の",
          "永遠の", "優雅なる", "静謐なる", "圧倒的な", "比類なき"],
  who:   ["選ばれし者", "本物を知る人", "成熟した大人", "時代を動かす人",
          "一握りの人", "美を愛する人"],
  time:  ["朝", "夕暮れ", "夜", "四季の移ろいの中", "百年後", "週末"],
};

// ---------- 2. 物件の特徴 ----------
// 1つの特徴 = 画面のチップ1個。ここに追加すれば画面にも自動で増える。
//   label : 画面に出す名前
//   type  : "appeal"（アピール）か "demerit"（デメリット）
//   lines : この特徴専用のポエムの型
//   words : この特徴専用の言葉（{noun} などに入る）
//   note  : 広告のすみに小さく出す注釈（デメリットの正体）
const features = [
  // ===== アピールポイント =====
  { label: "都心", type: "appeal",
    lines: ["都心に、{noun}を纏う。", "都市の鼓動を、足元に。",
            "眠らない街の、{adj}王座。", "{noun}は、都心にこそ宿る。"],
    words: { noun: ["ラグジュアリー", "洗練", "華やぎ", "摩天楼"],
             adj: ["都会的な", "華やかなる", "選ばれし"] } },

  { label: "郊外", type: "appeal",
    lines: ["喧騒を離れ、{noun}と暮らす。", "ここには、都会が忘れた{noun}がある。",
            "静寂という、{adj}贅沢。"],
    words: { noun: ["静寂", "緑", "ゆとり", "深呼吸"],
             adj: ["穏やかな", "満ち足りた", "上質な"] } },

  { label: "駅近", type: "appeal",
    lines: ["改札から、{noun}まで一瞬。", "時間を、味方につける住まい。",
            "移ろう街の中心で、{adj}日常を。"],
    words: { noun: ["わが家", "安らぎ", "自由"],
             adj: ["軽やかな", "スマートな"] } },

  { label: "高層階", type: "appeal",
    lines: ["空に、いちばん近い{noun}。", "{noun}を、見下ろして暮らす。",
            "眼下に広がる、あなただけの{noun}。"],
    words: { noun: ["夜景", "天空", "絶景", "邸宅"],
             adj: ["天空の", "至高の"] } },

  { label: "公園が近い", type: "appeal",
    lines: ["{noun}を、庭にする。", "四季が、毎朝あいさつに来る。",
            "緑と呼吸する、{adj}邸宅。"],
    words: { noun: ["森", "緑", "季節"],
             adj: ["みずみずしい", "生命あふれる"] } },

  { label: "海が近い", type: "appeal",
    lines: ["潮風が、{noun}を運んでくる。", "水平線を、日常に。",
            "{noun}とともに目覚める、{adj}朝。"],
    words: { noun: ["潮騒", "光", "水平線"],
             adj: ["きらめく", "開放的な"] } },

  // ===== デメリット（ポエムで言い換える） =====
  { label: "墓地が近い", type: "demerit", note: "※近隣に霊園があります。",
    lines: ["先人たちの{noun}に、見守られて。", "静けさが、永遠に約束された場所。",
            "歴史と祈りが、隣人です。"],
    words: { noun: ["祈り", "まなざし", "安らぎ"],
             adj: ["静謐なる", "永遠の"] } },

  { label: "築30年以上", type: "demerit", note: "※築35年。",
    lines: ["古の時を想う、{adj}邸宅。", "時を重ねたものだけが纏う、{noun}。",
            "新しさでは、手に入らないものがある。"],
    words: { noun: ["風格", "ヴィンテージ", "記憶"],
             adj: ["悠久の", "円熟の", "味わい深き"] } },

  { label: "駅から遠い", type: "demerit", note: "※最寄駅から徒歩25分。",
    lines: ["急がない人生を、選ぶ。", "駅の喧騒から、遠く離れて。",
            "歩くほどに、{noun}が深まる。"],
    words: { noun: ["思索", "季節", "健やかさ"],
             adj: ["悠然たる", "ゆるやかな"] } },

  { label: "線路沿い", type: "demerit", note: "※線路に隣接しています。",
    lines: ["街の{noun}が、聞こえる住まい。", "旅立ちの音を、毎日そばに。"],
    words: { noun: ["鼓動", "躍動", "息づかい"],
             adj: ["躍動する", "にぎやかな"] } },

  { label: "坂の上", type: "demerit", note: "※駅から急な坂を上ります。",
    lines: ["選ばれた者だけが、登りつめる丘。", "{noun}は、坂の上にある。"],
    words: { noun: ["眺望", "高み", "天空"],
             adj: ["気高き", "孤高の"] } },

  { label: "部屋が狭い", type: "demerit", note: "※専有面積18㎡。",
    lines: ["余計なものを持たない、{adj}暮らし。", "ミニマルという、最上の贅沢。"],
    words: { noun: ["凝縮", "余白", "こだわり"],
             adj: ["凛とした", "研ぎ澄まされた"] } },

  { label: "日当たりが悪い", type: "demerit", note: "※北向き住戸です。",
    lines: ["光に、頼らない美しさ。", "やわらかな陰影が、{noun}を育む。"],
    words: { noun: ["落ち着き", "思索", "品格"],
             adj: ["しっとりとした", "奥ゆかしい"] } },

  { label: "工場が近い", type: "demerit", note: "※近隣に工場があります。",
    lines: ["ものづくりの{noun}を、隣に。", "この街の{noun}を、肌で感じる。"],
    words: { noun: ["息吹", "活気", "鼓動"],
             adj: ["力強い", "たくましい"] } },
];

// 物件名をつくる部品（実在ブランドと被りにくい一般的な単語にしている）
const nameParts = {
  prefix: ["グラン", "ザ・", "ル・", "エル・", "ノーブル", "プレミア"],
  core:   ["アルカディア", "セレニティ", "エテルナ", "ルミナス", "ソレイユ",
           "シルヴァ", "オーロラ", "ヴェルデ"],
  suffix: ["レジデンス", "テラス", "コート", "タワー", "ヒルズ", "ガーデン"],
};

// 英語風タグライン（意味より雰囲気）
const taglines = ["THE ETERNAL RESIDENCE", "BEYOND LUXURY", "LIFE IS ART",
                  "THE CHOSEN ONE", "SILENCE IS LUXURY", "PRIVATE PARADISE"];

// ---------- 3. 汎用のポエムの型（特徴を選ばないとき用） ----------
const mainTemplates = [
  "{place}に、{noun}を持つ。",
  "{adj}{noun}が、{place}に誕生。",
  "{who}だけが知る、{place}の{noun}。",
  "ここは、{place}の{noun}。",
  "{time}、{place}は{adj}{noun}になる。",
  "{noun}を、日常に。",
  "人生に、{adj}{noun}を。",
];

const subTemplates = [
  "{adj}暮らしが、ここから始まる。",
  "{who}へ贈る、{adj}レジデンス。",
  "それは、{noun}という名の邸宅。",
  "住むことは、{noun}をまとうこと。",
];

// ---------- 4. 便利な小さい関数 ----------

// 配列の中から1つをランダムに選ぶ
function pick(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

// 型の {xxx} を言葉に置き換える。
// featureWords（特徴専用の言葉）にあればそれを使い、無ければ基本の words から選ぶ。
function fill(template, featureWords) {
  return template.replace(/\{(\w+)\}/g, function (match, key) {
    if (featureWords && featureWords[key]) {
      return pick(featureWords[key]);
    }
    return pick(words[key]);
  });
}

// 配列の順番をランダムに並べ替えた「新しい配列」を返す（元の配列は変えない）
// フィッシャー–イェーツという定番のやり方
function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

// 物件名をつくる
function makePropertyName() {
  return pick(nameParts.prefix) + pick(nameParts.core) + pick(nameParts.suffix);
}

// ---------- 5. 画面の部品を取得 ----------
const poemCard     = document.getElementById("poemCard");
const taglineEl    = document.getElementById("tagline");
const mainCopyEl   = document.getElementById("mainCopy");
const subCopyEl    = document.getElementById("subCopy");
const propertyEl   = document.getElementById("propertyName");
const infoEl       = document.getElementById("propertyInfo");
const notesEl      = document.getElementById("notes");
const bodyCopyEl   = document.getElementById("bodyCopy");
const generateBtn  = document.getElementById("generateBtn");
const copyBtn      = document.getElementById("copyBtn");
const messageEl    = document.getElementById("message");
const historyList  = document.getElementById("historyList");
const appealChips  = document.getElementById("appealChips");
const demeritChips = document.getElementById("demeritChips");

const sceneEl      = document.getElementById("scene");

const history = [];    // 作ったポエムを覚えておく箱
let generated = false; // 1回でも生成したかどうか

// ---------- 6. 特徴のチップを画面に並べる ----------
// features の数だけ <label><input type="checkbox"><span>名前</span></label> を作る
features.forEach(function (feature, index) {
  const label = document.createElement("label");
  label.className = "chip " + feature.type;

  const input = document.createElement("input");
  input.type = "checkbox";
  input.value = index;            // 何番目の特徴かを覚えさせる

  const span = document.createElement("span");
  span.textContent = feature.label;

  label.appendChild(input);
  label.appendChild(span);

  // アピールとデメリットで置き場所を分ける
  if (feature.type === "appeal") {
    appealChips.appendChild(label);
  } else {
    demeritChips.appendChild(label);
  }
});

// 今チェックが入っている特徴を配列で返す
function getSelectedFeatures() {
  const checked = document.querySelectorAll(".chip input:checked");
  const result = [];
  checked.forEach(function (input) {
    result.push(features[Number(input.value)]);
  });
  return result;
}

// ---------- 7. ポエムを生成して表示する ----------
function generatePoem() {
  const selected = getSelectedFeatures();
  let mainCopy;
  let subCopy;
  const bodyLines = [];   // 3つ目以降の特徴の文をためておく

  if (selected.length === 0) {
    // 何も選んでいない → 今までどおり汎用の型で作る
    mainCopy = fill(pick(mainTemplates));
    subCopy  = fill(pick(subTemplates));
  } else {
    // 選んだ特徴をシャッフルして、どれがメインになるかを毎回変える
    const order = shuffle(selected);

    // 1番目 → メインのコピー
    mainCopy = fill(pick(order[0].lines), order[0].words);

    // 2番目 → サブのコピー（1つしか選んでいなければ汎用の型で）
    if (order.length >= 2) {
      subCopy = fill(pick(order[1].lines), order[1].words);
    } else {
      subCopy = fill(pick(subTemplates), order[0].words);
    }

    // 3番目以降 → 本文に1行ずつ
    for (let i = 2; i < order.length; i++) {
      bodyLines.push(fill(pick(order[i].lines), order[i].words));
    }
  }

  // 本文を画面に並べる（毎回いったん空にしてから）
  bodyCopyEl.innerHTML = "";
  bodyLines.forEach(function (line) {
    const p = document.createElement("p");
    p.textContent = line;
    bodyCopyEl.appendChild(p);
  });

  // デメリットの注釈を集める（選んだものすべて）
  const notes = selected
    .filter(function (f) { return f.note; })
    .map(function (f) { return f.note; });

  const name  = makePropertyName();
  const units = Math.floor(Math.random() * 90) + 10; // 10〜99邸

  // 画面の文字を書き換える
  taglineEl.textContent  = pick(taglines);
  mainCopyEl.textContent = mainCopy;
  subCopyEl.textContent  = subCopy;
  propertyEl.textContent = name;
  infoEl.textContent     = "全" + units + "邸　第1期 販売予定";
  notesEl.textContent    = notes.join(" ");
  showScene(selected);   // 特徴に合わせた画像（無ければイラスト）を出す

  // アニメーションをもう一度動かすための小技
  poemCard.classList.remove("fade-in");
  void poemCard.offsetWidth;
  poemCard.classList.add("fade-in");

  generated = true;
  messageEl.textContent = "";
  addHistory(mainCopy + "　" + name);
}

// ---------- 7.5 イメージイラストを描く ----------
// SVG は「四角をここに」「丸をここに」と文字で書くと絵になる画像形式。
// 選んだ特徴に応じて、描く部品を足したり形を変えたりする。
//   座標は 横300 × 縦170。左上が (0,0)、右へ行くほど x、下へ行くほど y が大きい。

// min〜max の整数をランダムに返す
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawScene(selected) {
  // その特徴が選ばれているか調べる小さな関数
  function has(label) {
    return selected.some(function (f) { return f.label === label; });
  }

  // 地面の高さ。「坂の上」なら右に行くほど高くなる坂にする
  const slope = has("坂の上");
  function groundY(x) {
    return slope ? 160 - (50 * x) / 300 : 140;
  }

  let svg = "";   // ここに図形を1つずつ足していく（あとから足したものが手前に来る）

  // --- 夜空・星・月 ---
  svg += `<rect width="300" height="170" fill="url(#sky)"/>`;
  for (let i = 0; i < 18; i++) {
    svg += `<circle cx="${rand(0, 300)}" cy="${rand(5, 70)}" r="${Math.random() < 0.2 ? 1.2 : 0.6}" fill="#fff" opacity="0.7"/>`;
  }
  svg += `<circle cx="${rand(30, 270)}" cy="${rand(18, 35)}" r="9" fill="#f3e6c0"/>`;

  // --- 海が近い：水平線と、きらめく水面 ---
  if (has("海が近い")) {
    svg += `<rect x="0" y="105" width="300" height="45" fill="#1d3b5c"/>`;
    for (let i = 0; i < 12; i++) {
      svg += `<rect x="${rand(0, 290)}" y="${rand(108, 135)}" width="${rand(8, 20)}" height="1" fill="#f3e6c0" opacity="0.5"/>`;
    }
  }

  // --- 都心：うしろにビル群 ---
  if (has("都心")) {
    let x = 0;
    while (x < 300) {
      const w = rand(14, 28);
      const h = rand(35, 85);
      const top = groundY(x) - h;
      svg += `<rect x="${x}" y="${top}" width="${w}" height="${h + 60}" fill="#25395c"/>`;
      // ところどころに小さな明かり
      for (let i = 0; i < 3; i++) {
        svg += `<rect x="${x + rand(2, w - 5)}" y="${top + rand(4, h - 8)}" width="2" height="2" fill="#e8c97a" opacity="0.6"/>`;
      }
      x += w + rand(1, 4);
    }
  }

  // --- 工場が近い：ギザギザ屋根と煙突 ---
  if (has("工場が近い")) {
    const fx = 15;
    const gy = groundY(40);
    svg += `<polygon points="${fx},${gy + 10} ${fx},${gy - 25} ${fx + 15},${gy - 35} ${fx + 15},${gy - 25} ${fx + 30},${gy - 35} ${fx + 30},${gy - 25} ${fx + 45},${gy - 35} ${fx + 45},${gy + 10}" fill="#3a4658"/>`;
    svg += `<rect x="${fx + 50}" y="${gy - 60}" width="7" height="70" fill="#3a4658"/>`;
    svg += `<circle cx="${fx + 54}" cy="${gy - 67}" r="5" fill="#8a93a3" opacity="0.35"/>`;
    svg += `<circle cx="${fx + 61}" cy="${gy - 77}" r="7" fill="#8a93a3" opacity="0.3"/>`;
    svg += `<circle cx="${fx + 72}" cy="${gy - 86}" r="9" fill="#8a93a3" opacity="0.25"/>`;
  }

  // 主役のマンションの位置と大きさを、特徴から決める
  const bx = slope ? 215 : 150;   // 建物の中心のx座標（坂なら坂の上＝右側に）
  let w = 70;
  let h = 80;
  if (has("郊外"))     { w = 120; h = 45; }   // 横に広い低層
  if (has("高層階"))   { w = 56;  h = 118; }  // ひょろっと高いタワー
  if (has("部屋が狭い")) { w = Math.min(w, 36); } // 細長いペンシルマンション
  const x = bx - w / 2;
  const y = groundY(bx) - h;

  // --- 日当たりが悪い：となりに、もっと高いビル ---
  if (has("日当たりが悪い")) {
    svg += `<rect x="${x - 50}" y="${groundY(x) - 150}" width="45" height="160" fill="#0a111d"/>`;
  }

  // --- 地面 ---
  if (slope) {
    svg += `<polygon points="0,160 300,110 300,170 0,170" fill="#0e1828"/>`;
  } else {
    svg += `<rect x="0" y="140" width="300" height="30" fill="#0e1828"/>`;
  }

  // --- 主役のマンション本体と窓 ---
  const bottom = groundY(x);   // 坂でも宙に浮かないよう、左下の地面まで伸ばす
  svg += `<rect x="${x}" y="${y}" width="${w}" height="${bottom - y}" fill="#2b3b55" stroke="#c9a75e" stroke-width="0.8"/>`;
  for (let wy = y + 6; wy + 5 <= bottom - 6; wy += 10) {
    for (let wx = x + 5; wx + 5 <= x + w - 4; wx += 9) {
      const lit = Math.random() < 0.55;   // 半分くらいの窓に明かりをつける
      svg += `<rect x="${wx}" y="${wy}" width="5" height="5" fill="${lit ? "#e8c97a" : "#18243a"}"/>`;
    }
  }
  if (has("高層階")) {
    // 屋上のアンテナと赤いランプ
    svg += `<line x1="${bx}" y1="${y}" x2="${bx}" y2="${y - 12}" stroke="#c9a75e" stroke-width="1"/>`;
    svg += `<circle cx="${bx}" cy="${y - 12}" r="1.6" fill="#e05a4a"/>`;
  }
  if (has("日当たりが悪い")) {
    // 建物に影をかぶせる
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${bottom - y}" fill="#000" opacity="0.4"/>`;
  }

  // --- 公園が近い・郊外：木 ---
  let treeCount = 0;
  if (has("郊外")) treeCount = 3;
  if (has("公園が近い")) treeCount = 5;
  const treeXs = [x - 14, x + w + 14, x - 30, x + w + 30, x + w + 46];
  for (let i = 0; i < treeCount; i++) {
    const tx = treeXs[i];
    const gy = groundY(tx);
    svg += `<rect x="${tx - 1.5}" y="${gy - 10}" width="3" height="10" fill="#4a3a2a"/>`;
    svg += `<circle cx="${tx}" cy="${gy - 15}" r="${rand(7, 10)}" fill="#2f5a3e"/>`;
  }

  // --- 墓地が近い：手前左に墓石 ---
  if (has("墓地が近い")) {
    [22, 36, 50, 64, 78].forEach(function (gx) {
      const gy = groundY(gx) + 8;
      svg += `<rect x="${gx - 3}" y="${gy - 11}" width="6" height="11" rx="1.5" fill="#8b94a3"/>`;
    });
  }

  // --- 駅近：右側に駅舎 ---
  if (has("駅近")) {
    const gy = groundY(268);
    svg += `<rect x="250" y="${gy - 16}" width="36" height="20" fill="#3a4a62" stroke="#c9a75e" stroke-width="0.8"/>`;
    svg += `<text x="268" y="${gy - 3}" font-size="10" fill="#f3eee3" text-anchor="middle">駅</text>`;
  }

  // --- 線路沿い：いちばん手前に線路と電車 ---
  if (has("線路沿い")) {
    for (let tx = 0; tx < 300; tx += 8) {
      svg += `<rect x="${tx}" y="159" width="3" height="9" fill="#4a5363"/>`;   // 枕木
    }
    svg += `<rect x="0" y="160" width="300" height="1.2" fill="#9aa5b5"/>`;
    svg += `<rect x="0" y="166" width="300" height="1.2" fill="#9aa5b5"/>`;
    const trainX = rand(0, 200);
    svg += `<rect x="${trainX}" y="146" width="80" height="13" rx="2" fill="#c9a75e"/>`;
    for (let i = 0; i < 7; i++) {
      svg += `<rect x="${trainX + 5 + i * 11}" y="149" width="6" height="4" fill="#f3eee3"/>`;
    }
  }

  // --- 広告のお約束 ---
  svg += `<text x="294" y="12" font-size="7" fill="#c8ccd4" text-anchor="end">※画像はイメージです</text>`;

  // 全部を <svg> でくるんで画面に入れる
  sceneEl.innerHTML =
    `<svg viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0" stop-color="#0b1424"/>
           <stop offset="1" stop-color="#2a3d60"/>
         </linearGradient>
       </defs>
       ${svg}
     </svg>`;

  // 築30年以上ならセピア色にする（CSSの .old が効く）
  sceneEl.classList.toggle("old", has("築30年以上"));
}

// ---------- 7.6 用意した画像から、特徴に合うものを選ぶ ----------
// images フォルダに画像を置き、ここに「ファイル名」と「タグ（特徴の名前）」を書く。
// 画像が見つからないときは、上の SVG イラストを代わりに描く。
const sceneImages = [
  { file: "01-tower-city.jpg",     tags: ["都心", "高層階"] },
  { file: "02-tower-station.jpg",  tags: ["都心", "駅近", "高層階"] },
  { file: "03-city-midrise.jpg",   tags: ["都心", "駅近"] },
  { file: "04-suburb-lowrise.jpg", tags: ["郊外"] },
  { file: "05-suburb-park.jpg",    tags: ["郊外", "公園が近い"] },
  { file: "06-city-park.jpg",      tags: ["都心", "公園が近い"] },
  { file: "07-sea-tower.jpg",      tags: ["海が近い", "高層階"] },
  { file: "08-sea-lowrise.jpg",    tags: ["海が近い", "郊外"] },
  { file: "09-cemetery.jpg",       tags: ["墓地が近い"] },
  { file: "10-temple-old.jpg",     tags: ["墓地が近い", "築30年以上"] },
  { file: "11-vintage.jpg",        tags: ["築30年以上"] },
  { file: "12-vintage-city.jpg",   tags: ["築30年以上", "都心", "駅近"] },
  { file: "13-hill.jpg",           tags: ["坂の上"] },
  { file: "14-hill-old.jpg",       tags: ["坂の上", "築30年以上", "郊外"] },
  { file: "15-railway.jpg",        tags: ["線路沿い"] },
  { file: "16-railway-station.jpg", tags: ["線路沿い", "駅近", "都心"] },
  { file: "17-pencil.jpg",         tags: ["部屋が狭い", "都心"] },
  { file: "18-shade.jpg",          tags: ["日当たりが悪い", "都心"] },
  { file: "19-factory.jpg",        tags: ["工場が近い"] },
  { file: "20-factory-bay.jpg",    tags: ["工場が近い", "海が近い", "高層階"] },
  { file: "21-far-bus.jpg",        tags: ["駅から遠い", "郊外"] },
  { file: "22-far-field.jpg",      tags: ["駅から遠い"] },
];

let sceneRequest = 0;   // 連打したとき、古い画像があとから表示されるのを防ぐ番号

function showScene(selected) {
  const labels = selected.map(function (f) { return f.label; });

  // 点数をつける：選んだ特徴と合うタグ1つにつき +10点、合わないタグ1つにつき -1点
  // （合うタグが同じ数なら、余計な特徴が少ない画像を優先するため）
  let bestScore = -Infinity;
  let candidates = [];
  sceneImages.forEach(function (img) {
    const matches = img.tags.filter(function (t) { return labels.includes(t); }).length;
    const extras  = img.tags.length - matches;
    const score   = matches * 10 - extras;
    if (score > bestScore) {
      bestScore = score;
      candidates = [img];
    } else if (score === bestScore) {
      candidates.push(img);   // 同点ならあとでランダムに選ぶ
    }
  });

  // 特徴を選んだのに、1つも合う画像がない（点数が0以下）→ イラストで描く
  if (selected.length > 0 && bestScore <= 0) {
    drawScene(selected);
    return;
  }

  // 何も選んでいないときは、全画像からランダム
  const chosen = selected.length === 0 ? pick(sceneImages) : pick(candidates);

  const myRequest = ++sceneRequest;
  const img = new Image();
  img.alt = "物件のイメージ画像";
  img.onload = function () {
    if (myRequest !== sceneRequest) return;   // もっと新しい生成が始まっていたら何もしない
    sceneEl.innerHTML = "";
    sceneEl.classList.remove("old");
    sceneEl.appendChild(img);
    const caption = document.createElement("span");
    caption.className = "caption";
    caption.textContent = "※画像はイメージです";
    sceneEl.appendChild(caption);
  };
  img.onerror = function () {
    if (myRequest !== sceneRequest) return;
    drawScene(selected);   // 画像ファイルがまだ無い → イラストで代用
  };
  img.src = chosen.file;
}

// ページを開いた直後にも絵を出しておく
showScene([]);

// ---------- 8. 履歴に追加（最新5件だけ表示） ----------
function addHistory(text) {
  history.unshift(text);           // 先頭に追加
  if (history.length > 5) {
    history.pop();                 // 6件目以降は捨てる
  }
  historyList.innerHTML = "";      // いったん空にして
  history.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);   // 1件ずつ並べ直す
  });
}

// ---------- 9. コピー機能 ----------
function copyPoem() {
  if (!generated) {
    messageEl.textContent = "先にポエムを生成してください。";
    return;
  }
  let text = mainCopyEl.textContent + "\n" +
             subCopyEl.textContent + "\n";
  // 本文があれば1行ずつ足す
  bodyCopyEl.querySelectorAll("p").forEach(function (p) {
    text += p.textContent + "\n";
  });
  text += propertyEl.textContent;
  if (notesEl.textContent) {
    text += "\n" + notesEl.textContent;   // 注釈もちゃんと付ける
  }

  navigator.clipboard.writeText(text)
    .then(function () {
      messageEl.textContent = "コピーしました。";
    })
    .catch(function () {
      messageEl.textContent = "この環境ではコピーできませんでした。長押しで選択してください。";
    });
}

// ---------- 10. ボタンが押されたら実行 ----------
generateBtn.addEventListener("click", generatePoem);
copyBtn.addEventListener("click", copyPoem);
