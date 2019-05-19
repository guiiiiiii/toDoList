const toDoForm=document.querySelector(".js-toDoForm"),
    toDoInput=toDoForm.querySelector(".todo"),
    toDoList=document.querySelector(".js-toDoList"),
    toDoImportant=toDoForm.querySelector(".star"),
    toDoDate=toDoForm.querySelector(".date");

const TODOS_LS='toDos';
let toDos=[]



function updateToDo(event){
    const upBtn=event.target;
    
}

function finishToDo(event){
    const finBtn=event.target;
    const li=finBtn.parentNode;
    li.classList.toggle('todoFinsh');

    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos=cleanToDos;
    saveToDos();
}

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
    
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    
}

function paintToDo(date,text,importance){
    const li=document.createElement('li');
    const delBtn =document.createElement("button");
    const finishBtn=document.createElement("button");
    const updateBtn=document.createElement("button");
    const span=document.createElement('span');
    const spanStar=document.createElement('span');
    const spanDate=document.createElement('span');
    const newId=toDos.length+1;
    
    delBtn.innerText="❌";
    delBtn.addEventListener("click",deleteToDo);
    finishBtn.innerText="✔️";
    finishBtn.addEventListener("click",finishToDo);
    updateBtn.innerText='✏️';
    updateBtn.addEventListener("click",updateToDo);
    span.innerText=text;
    spanStar.innerText=importance;
    spanDate.innerText=date;
    li.appendChild(spanStar);
    li.appendChild(spanDate);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finishBtn);
    li.appendChild(updateBtn);
    li.id=newId;
    toDoList.appendChild(li);
    const toDoObj={
        text:text,
        id:newId,
        importance:importance,
        date:date
    };
    toDos.push(toDoObj);
    saveToDos();
    
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    const importance=toDoImportant.options[toDoImportant.selectedIndex].text;
    const date=toDoDate.value;

    paintToDo(date,currentValue,importance);
    toDoInput.value=""; //add submit event


}

function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if (loadedToDos!==null){
        //localstorage에서 가져온것은 또한 string이므로 다시 변환
        const parseToDos=JSON.parse(loadedToDos);
        parseToDos.forEach(function(toDo){
            paintToDo(toDo.date,toDo.text,toDo.importance);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener('submit',handleSubmit);
}

init();