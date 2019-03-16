const toDoForm=document.querySelector(".js-toDoForm"),
    toDoInput=toDoForm.querySelector("input"),
    toDoList=document.querySelector(".js-toDoList");

const TODOS_LS='toDos';
let toDos=[]

function deleteToDo(event){
    const btn=event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li); //html에서 delete

    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos=cleanToDos;
    saveToDos();
}

function saveToDos(){
    //JSON.stringify은 js의 date type(object)을 string으로 변환해줌
    //localstorage에는 string만 사용할 수 있기 때문
    if(toDos.length>4){
        alert("4개까지만 저장할수 있어요!");
    }
    else{
        localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    }
}

function paintToDo(text){
    const li=document.createElement('li');
    const delBtn =document.createElement("button");
    const span=document.createElement('span');
    const newId=toDos.length+1;
    delBtn.innerText="delete";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=newId;
    toDoList.appendChild(li);
    const toDoObj={
        text:text,
        id:newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value=""; //add submit event


}

function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if (loadedToDos!==null){
        //localstorage에서 가져온것은 또한 string이므로 다시 변환
        const parseToDos=JSON.parse(loadedToDos);
        parseToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener('submit',handleSubmit);
}

init();