let step = 0;
let lang = 'en';
//Family size and income limit pairings
const limits = {
  1: 111700, 2: 127650, 3: 143600, 4: 159550,
  5: 172350, 6: 185100, 7: 197850, 8: 210650
};

//source:https://www.habitatebsv.org/hubfs/_PDFs/Home%20Repair/LSHP%20Term%20Sheet_Final.pdf?hsLang=en
const content = {
  en: [
    ["Is your property located in Santa Clara County?",
     " "],

    ["Was your home built before 1978?",
     "Homes built before 1978 are more likely to contain lead-based paint"],

    ["Does your property have 9 or fewer units?",
     "The program is designed for smaller residential properties"],

    ["Is your property residential (not Airbnb/commercial)?",
     "Short-term rentals and commercial buildings are not eligible"],

    ["Is the home occupied full-time?",
     " "],

    ["Does a child under 6 or pregnant person live there?",
     "Young children are especially vulnerable to lead poisoning"]
  ],

  es: [
    ["¿Su propiedad está en el condado de Santa Clara?",
     "La exposición al plomo es más común en viviendas antiguas."],
    ["¿Fue construida antes de 1978?", ""],
    ["¿Tiene 9 unidades o menos?", ""],
    ["¿Es una propiedad residencial?", ""],
    ["¿Está ocupada a tiempo completo?", ""],
    ["¿Hay un niño menor de 6 años o persona embarazada?", ""]
  ],

  zh: [
    ["您的房产是否位于圣克拉拉县？", ""],
    ["房屋是否建于1978年之前？", ""],
    ["是否少于或等于9个单元？", ""],
    ["你的房产是否为住宅用途（不是 Airbnb 或商业用途？", ""],
    ["该住房是否有人长期居住？", ""],
    ["该住房中是否有6岁以下的儿童或孕妇？", ""]
  ]
};

function render() {
  if (step < content[lang].length) {
    document.getElementById("question").innerText = content[lang][step][0];
    document.getElementById("blurb").innerText = content[lang][step][1];

    document.getElementById("buttons").innerHTML = `
      <button onclick="answer('yes')">Yes</button>
      <button onclick="answer('no')">No</button>
    `;
  }
}

function answer(choice) {
  if (choice === 'no') return fail();

  step++;
  saveProgress();

  if (step === content[lang].length) {
    document.getElementById("question").innerText = "Check income eligibility";
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("incomeSection").style.display = "block";
    return;
  }

  render();
}

function checkIncome() {
  let size = document.getElementById("size").value;
  let income = document.getElementById("income").value;

  if (income <= limits[size]) {
    success();
  } else {
    fail();
  }
}

function success() {
  document.getElementById("app").innerHTML = `
    <h2 class="success">You may be eligible! Please fill out the online interest form at: https://www.tfaforms.com/5202298
    <button onclick="restart()">Restart</button>
  `;
}

function fail() {
  document.getElementById("app").innerHTML = `
    <h2 class="fail">You may not be eligible. Please contact (510)803-3388 or HomeRepair@HabitatEBSV.org for further questions.</h2>
    <button onclick="restart()">Try Again</button>
  `;
}

function setLang(l) {
  lang = l;
  step = 0;
  render();
}

function saveProgress() {
  localStorage.setItem("quizStep", step);
}

function loadProgress() {
  let saved = localStorage.getItem("quizStep");
  if (saved) step = parseInt(saved);
}

function restart() {
  step = 0;
  localStorage.clear();
  document.getElementById("incomeSection").style.display = "none";
  render();
}

// Init
loadProgress();
render();
