let { PythonShell } = require('python-shell')
var path = require("path")
var Masonry = require('masonry-layout');

const petForm = document.querySelector('#pet-form');
const diagram = document.querySelector('#diagram');
const results = document.querySelector('#results');

petForm.addEventListener('submit', get_pets);

function showGenderDiagram(genders) {
  var options = {
    scriptPath: path.join(__dirname, '/../engine/'),
    args: [genders[0], genders[1]]
  }

  let pyshell = new PythonShell('diagram.py', options);

  pyshell.on('message', function (message) {
    console.log('已載入 bar chart');
  })
}

/**
 * 取得所選動物的全部品種
 * @param {*} type 所選之動物
 */
function getBreeds(type) {
  var options = {
    scriptPath: path.join(__dirname, '/../engine/'),
    args: [type]
  }

  /* https://www.npmjs.com/package/python-shell */
  let pyshell = new PythonShell('getbreeds.py', options);

  pyshell.on('message', function (message) {
    const breedSelect = document.querySelector('#breed');
    const msg = JSON.parse(message);

    console.log('已取得全部品種!');
    // 動態加上品種選項
    generateOptions(breedSelect, msg);
  })
}

function generateOptions(select, arr) {
  arr.forEach(item => {
    select.options[select.options.length] = new Option(item.name, item.name);
  });
}

/**
 * 依查詢條件取得符合之寵物資料
 * @param {*} e event
 */
function get_pets(e) {
  e.preventDefault();

  // Loading 畫面
  results.innerHTML = '<div class="loading"><p>畫面載入中</p><div class="dot-flashing"></div></div>';

  // 取得前端使用者選擇的查詢條件
  const type = document.querySelector('#type').value;
  const breed = document.querySelector('#breed').value;
  const age = document.querySelector('#age').value;

  var options = {
    scriptPath: path.join(__dirname, '/../engine/'),
    args: [type, breed, age]
  }

  let pyshell = new PythonShell('petfinder.py', options);

  console.log(pyshell);

  pyshell.on('message', function (msg) {
    const petsData = JSON.parse(msg).data;
    const petsGender = JSON.parse(msg).genders;

    showAnimals(petsData);
    diagram.innerHTML = `<button onclick="showGenderDiagram([${petsGender}])" 
    class="btn btn-outline-info mt-3">
    Matching Animal Gender Bar Chart</button>`;
  })

  // resetValue(["type", "breed", "age"]);
}

/**
 * 清空查詢條件
 * @param {*} arr 下拉選單 id
 */
function resetValue(arr) {
  arr.forEach(item => {
    document.getElementById(item).value = "";
  });
}

function showAnimals(pets) {
  results.innerHTML = '';

  pets.forEach(pet => {
    // console.log(pet);
    const figure = document.createElement('figure');
    figure.classList.add('figure', 'grid-item', 'my-4');
    figure.innerHTML = `
      ${pet.photos[0] ?
        `<img src="${pet.photos[0].large}">` : `<img src="images/no-pic.jpg">`
      }  
      <div class="nameblock">
        <span class="name">${pet.name}</span>
      </div>
      <figcaption>
        <h3><span>Age: </span>${pet.age}</h4>
        <h3><span>Gender: </span>${pet.gender}</h3>
        <h3><span>Breed: </span>${pet.breeds.primary}</h3>
      </figcaption>
      <div class="hover">
        ${pet.contact.phone ? `<p>${pet.contact.phone}</p>` : ``}
        ${pet.contact.email ? `<p>${pet.contact.email}</p>` : ``}
      </div>
      <a href="#"></a>
    `;

    results.appendChild(figure);
  });

  setTimeout(() => { execMasonry(); }, 3000);
}

function execMasonry() {
  var msnry = new Masonry(results, {
    // options...
    itemSelector: '.grid-item'
  })
}