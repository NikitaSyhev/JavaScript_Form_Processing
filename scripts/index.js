const myForm = document.querySelector('#my-form'); //создали константу, описывающие событие
const commentsContainer = document.querySelector('#comments-container');

let commented = false; // проверка, есть стандартные комментарии или нет




//добавляем обработччик события ( слушатель )
myForm.addEventListener('submit', e=>{
    //прерывает событие, происходящее по умолчанию 
    e.preventDefault(); 
    console.log(extractForm(myForm));
    myForm.reset(); //сброс формы - но страница не обновляется (!)
});

forum.addEventListener('submit', e => {
    e.preventDefault();
    const formElems = extractForm(forum); //возвращает массив, хранящий все поля нашей Формы

    if(!commented) {
        commented = true;
        empty.remove();
    }
    let newComment = document.createElement('div'); //создаем новый комментарий
    const date = new Date();
    newComment.className = 'comment'; //добавили класс
    newComment.innerHTML += `<h4>${formElems[0].value} написал(а):</h4>`; //добавили заголовок
    newComment.innerHTML += `<p>${formElems[1].value}</p>`;// добавили параграф
    //добавляем даты
    newComment.innerHTML += `<p>
        ${date.getHours()}:${date.getMinutes()} 
        ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}
    </p>`;

    commentsContainer.appendChild(newComment); //добавляем на форму
    forum.reset();
})


//метод для отображения ключ и значения формы
function extractForm(form) {
    return Array.from(form.elements).filter(el=>{  //функция,  c помощью которой убираем кнопку - возврашает отфильрованный массив, мы сами выбираем критерии фильтра
        return el.type != 'submit'; // исключили все элементы с id submit, а это кнопка
        //кнопку мы убрали потому, что она не несет в себе никакой информации
    })                          
    .map(el =>{  //преобразовали в массив, чтобы мы могли работать с коллекцией как с массивом, т.е. переибрать циклом. и т д 
        const {id, type} = el; //сделали деструктуризацию объекты
        const value = type == 'checkbox' ? el.checked : el.value; //проверка чекбокса ( если галочка нажата - true, не нажата - false)
        return {id, value };
    });
}

