const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    finishList = document.querySelector(".js-finishList");

const TODOS_LS = 'toDos';
const COMPS_LS = 'compToDos';

let toDos = [];
let comps = [];

function deleteComp (event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishList.removeChild(li);
    const cleanComps = comps.filter(function(comp) {
        return comp.id !== parseInt(li.id);
    });
    comps = cleanComps;
    saveComps();
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveComps() {
    localStorage.setItem(COMPS_LS, JSON.stringify(comps));
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintComp(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const returnBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = comps.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteComp);
    returnBtn.innerText = "⏪";
    returnBtn.addEventListener("click", handleReturn);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(returnBtn);
    li.id = newId;
    finishList.appendChild(li);

    const compObj = {
        text: text,
        id: newId
    };
    comps.push(compObj);

    saveComps();
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const compBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    compBtn.innerText = "✅";
    compBtn.addEventListener("click", handleComp);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(compBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);

    saveToDos();
}

function handleReturn (event) {
    event.preventDefault();
    deleteComp(event);
    const btn = event.target;
    const value = btn.parentNode.childNodes[0].innerText;
    paintToDo(value);
}

function handleComp(event) {
    event.preventDefault();
    deleteToDo(event);
    const btn = event.target;
    const value = btn.parentNode.childNodes[0].innerText;
    paintComp(value);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedComps = localStorage.getItem(COMPS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
    if(loadedComps !== null) {
        const parsedComps = JSON.parse(loadedComps);
        parsedComps.forEach(function (comp) {
            paintComp(comp.text);
        })
    }
}

function initToDo () {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}


initToDo();