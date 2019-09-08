let { PythonShell } = require('python-shell')
var path = require("path")

const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', get_pets);

/**
 * 依查詢條件取得符合之寵物資料
 * @param {*} e event
 */
function get_pets(e) {
  e.preventDefault();

  // Loading 畫面
  

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

  pyshell.on('message', function (message) {
    const msg = JSON.parse(message);
    showAnimals(msg);
  })

  resetValue(["type", "breed", "age"]);
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
  const results = document.querySelector('#results');

  results.innerHTML = '';

  pets.forEach(pet => {
    console.log(pet);
    const div = document.createElement('div');
    div.classList.add('card', 'card-body', 'mb-3');
    div.innerHTML = `
      <div class="row">
        <div class="col-sm-6">
          <h4>${pet.name} (${pet.age})</h4>
          <p class="text-secondary">${pet.breeds.primary}</p>
          <ul class="list-group">
            ${pet.contact.phone ?
        `<li class="list-group-item">Phone: ${
        pet.contact.phone
        }</li>`
        : ``
      }
            ${pet.contact.email ?
        `<li class="list-group-item">Email: ${
        pet.contact.email
        }</li>`
        : ``
      }
          </ul>
        </div>
        <div class="col-sm-6 text-center">
          ${pet.photos[0] ?
        `<img class="img-fluid mt-2" src="
            ${pet.photos[0].small}">`
        : ``
      }
        </div>
      </div>
    `;

    results.appendChild(div);
  });
}