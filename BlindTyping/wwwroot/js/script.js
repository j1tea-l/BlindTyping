document.querySelector('.main__input').readOnly = true;

/*
    Функция добавляющая класс "active" зажатой кнопке
*/
function setActiveOnButton(keyCode, isEnable) {
    let classBtnOfKeyCode = '.k' + keyCode;
    let elements = document.querySelectorAll(classBtnOfKeyCode);
    if (isEnable === true) {
        elements.forEach((element) => {
            element.classList.add("active");
        })
    } else {
        elements.forEach((element) => {
            element.classList.remove("active");
        })
    }
}

document.addEventListener('keydown', function (event) {
    //    console.log(event.keyCode);
    setActiveOnButton(event.keyCode, true);
});

document.addEventListener('keyup', function (event) {
    //    console.log(event.keyCode);
    setActiveOnButton(event.keyCode, false);
});


/*
    Отключение ненужных клавиш
*/
let disabledKeys = [9, 20, 17, 18, 91, 37, 38, 39, 40];
window.onkeydown = event => {
    //    console.log(event.keyCode)
    if (disabledKeys.includes(event.keyCode)) {
        event.preventDefault();
    }
}


/*
    Обработка нажатий 
 */
window.onkeyup = event => {
    let inputElement = document.querySelector(".main__input");
    if (inputElement.value[0] === event.key) {
        inputElement.value = inputElement.value.substring(1, inputElement.value.length);
    }
}

document.getElementById("generateButton").addEventListener("click",
    function () {
        //отправляет post в метод RunAPI(bool) 
        fetch('/Home/RunAPI',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ torun: true })
            })
            .then(response => response.json({ result: true }))
            .then(data => {
                var el = document.querySelector(".main__input");
                el.setAttribute("placeholder", data);
                var sampleString = el.getAttribute("placeholder");
                //иниц переменых сюда пришлось вьебать, по другому не работает хз поч
                let inputElement = document.querySelector(".main__input");
                inputElement.value = sampleString;
            })
            .catch(error => console.error('Error:', error));
    });
//короче я инпут сломал, но пусть виталик разберется

