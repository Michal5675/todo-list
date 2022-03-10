var input = document.getElementById("input");
var div = document.getElementsByClassName("list")[0];
var ul = div.getElementsByTagName("ul")[0];
var icon = document.getElementsByClassName("icon-check")[0];
const tasks = document.getElementsByClassName("tasks")[0];
var list = document.getElementsByClassName("list")[0];
const sortedTasks = document.getElementsByClassName("sorted-tasks")[0];
const all = document.getElementsByClassName("all")[0];
const active = document.getElementsByClassName("active")[0];
const completed = document.getElementsByClassName("completed")[0];
var clearTasks = document.getElementsByClassName("clear-list")[0];
var counter = document.getElementsByClassName("counter")[0];
var count = 0;
var removeCount = 0;
var clearCompl = document.getElementsByClassName("clear-list")[0];
var radio = document.getElementsByClassName("true-radioBtn")[0];
var radioStyle = document.getElementsByClassName("radio__style-2")[0];
//create arrays to manipulate list items
var liArr = [];
var divRadioArr = [];
var imgArr = [];
var bg = document.getElementsByClassName("bg")[0];
//sortedTask div starting postion
var firstDivPostion = 17.8;
var marginDiv = 2.8;
//create list, styling and editing it
radio.addEventListener("click", () => {
    if(input.value !== "") {
        
        var li = document.createElement("li");
        li.draggable = true;
        li.id = count;
        
        liArr.push(li);
        var img = createImgCross();
        var p = document.createElement("p");
        var label = createRadioInput();
        li.classList.add("list-item");
        p.classList.add("text-list-position");
        p.innerHTML = input.value;
        //dark mode
        if(list.classList.contains("dark-list")) {
            li.classList.add("dark-list");
            li.classList.add("list-item-2");
        }
        else {
            li.classList.remove("dark-list");
            li.classList.remove("list-item-2");
        }
        //add list to DOM
        ul.appendChild(li);
        li.appendChild(label);
        li.appendChild(img);
        li.appendChild(p);
        //remove target elem from list
        img.addEventListener("click", (e) => {
            e.target.parentElement.remove();
            var index = liArr.indexOf(e.target.parentElement);
            count--;
            liArr.splice(index,1);
            changePosition();
            changeItemNum(count);
            showList(count);
        });
        count++;
       
        changeItemNum(count);
        showList(count);

      
        firstPostion(count);
        
        if(window.matchMedia("(min-width: 1000px)").matches) {
            img.style.visibility = "hidden";
            p.addEventListener("mouseenter", () => {
                img.style.visibility = "visible";
            });
            
        }
       
    }

    //check radio
     label.addEventListener("click", (e) => {
        var index = imgArr.indexOf(e.target.parentElement.lastChild);
        imgArr[index].style.visibility = "visible";
        p.classList.add("task-completed");
        li.classList.add("completed");
       
    });

  

});

function dragTrue(e) {
    return true;
}


//remove all completed tasks
clearTasks.addEventListener("click", () => {
    clear();
  
});

//filter tasks 

var completedClicked = false;
completed.addEventListener("click",(e) => {
    var result = sortedList();
    completedClicked = true;
    if(result.compTask === 0) {
        return 
    }
    else {
        e.target.classList.add("current-tasks");
        all.classList.remove("current-tasks");
        active.classList.remove("current-tasks");
       completedTasksSort(result.compTask, result.rest);
       changeItemNum(result.completedCount);
       showList(result.completedCount);
    }
     return completedClicked;
    
});


active.addEventListener("click", (e) => {
    
    e.target.classList.add("current-tasks");
    all.classList.remove("current-tasks");
    completed.classList.remove("current-tasks");
    var result = sortedList();
    if(result.rest !== 0) {
        activeTasksSort(result.compTask, result.rest);
        changeItemNum(result.restCount);
        showList(result.restCount);
    }  
});


all.addEventListener("click", (e) => {
    e.target.classList.add("current-tasks");
     completed.classList.remove("current-tasks");
     active.classList.remove("current-tasks");
    var result = sortedList();
    var completedCount = result.completedCount;
    var restCount = result.restCount;
    count = completedCount + restCount;
    changeItemNum(count);
    for(var i in liArr) {
        liArr[i].style.display = "block";
    }
});

function createRadioInput() {
    var label = document.createElement("label");
    var radio = document.createElement("input");
    var div = document.createElement("div");
    var imgIcon = document.createElement("img");
    label.for = "radioTask";
    label.classList.add("radio-input");
    label.classList.add("list-radio-position");
    radio.type = "radio";
    radio.id = "radioTask";
    radio.classList.add("true-radioBtn");
    div.classList.add("radio__style");
    divRadioArr.push(div);
    if(list.classList.contains("dark-list")) {
        div.classList.add("dark-radio-btn");
    }
    else {
        div.classList.remove("dark-radio-btn");
    }
    imgIcon.src = "images/icon-check.svg";
    imgIcon.classList.add("icon-check");
    imgArr.push(imgIcon);
    label.appendChild(radio);
    label.appendChild(div);
    label.appendChild(imgIcon);
    return label;
        
    
}

function createImgCross() {
    var img = document.createElement("img");
    img.src = "images/icon-cross.svg";
    img.classList.add("icon-cross");
    return img;
}



function clear() {
    var newLiArr = [];
    liArr.forEach( (x) => {
        if(x.classList.contains("completed")) {
            removeCount++;
            newLiArr.push(x);
             x.remove();
        }
    });
    for(var k in liArr) {
        for(var i in newLiArr) {
            if(liArr[k] === newLiArr[i]) {
                liArr.splice(k,1);
            }
        }
    }
   
    
    //change position of filter div
    count = count - removeCount;
    var currentPos = changePosition();
    sortedTasks.style.top = currentPos - (removeCount * marginDiv) + "rem";
    changeItemNum(count);
    showList(count);
    removeCount = 0;
    return count;
}


//change position of filter div
function changePosition() {
    var style = window.getComputedStyle(sortedTasks);
    var currentPos = style.getPropertyValue("top");
    var currentPosRem = [Number(currentPos.slice(0,currentPos.length-2))]/16; 
    sortedTasks.style.top = currentPosRem - marginDiv  + "rem";
    return currentPosRem;
    
}

function firstPostion(count) {

    if(count === 1) {
        sortedTasks.style.top = firstDivPostion + "rem";
    }
    if(count > 1) {
        sortedTasks.style.top = firstDivPostion + (count - 1) * marginDiv + "rem"; 
       
    }
}
  //change count of items inside list
function changeItemNum(count) {
   counter.innerHTML = `${count} items left`;
}
 

function showList(count) {
    tasks.style.display = "flex";
    list.style.display = "grid";
    sortedTasks.style.display = "flex";
    if(count === 0) {
        tasks.style.display = "none";
        list.style.display = "none";
        sortedTasks.style.display = "none";
    }
}

//sort list by complition
function sortedList() {
    var rest = [];
    var compTask = [];
    var completedCount = 0;
    var restCount = 0;
   
    for(var i in liArr) {
     if(liArr[i].classList.contains("completed")) {
         compTask.push(liArr[i]);
         completedCount++;
     }
     else {
         rest.push(liArr[i]);
         restCount++;
     }
    }
   
    return {
        compTask: compTask,
        rest: rest,
        completedCount: completedCount,
        restCount: restCount
    };
}
function completedTasksSort(compTask, rest) {
    for(var i in compTask) {
        compTask[i].style.display ="block";
    }
   
    for(var k in rest) {
        rest[k].style.display = "none";
    }

}

function activeTasksSort(compTask, rest) {
    for(var i in compTask) {
        compTask[i].style.display ="none";
    }
   
    for(var k in rest) {
        rest[k].style.display = "block";
    }

}

//dark mode 
var bgDark = "images/bg-mobile-dark.jpg";
var bgLight = "images/bg-mobile-light.jpg";
var body = document.body;
var icon = document.getElementsByClassName("icon-moon")[0];
var inputBox = document.getElementsByClassName("input-box")[0];
icon.addEventListener("click", () => {
    changeTheme();
});

var themeStatus = 0;

function changeTheme() {
    if(icon.classList.contains("icon-moon")) {
        themeStatus = 1;
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`;
        icon.classList.add("icon-sun");
        icon.classList.remove("icon-moon");
        body.classList.add("dark-body");
        list.classList.add("dark-list");
        inputBox.classList.add("dark-input");
        input.classList.add("dark-input");
        sortedTasks.classList.add("dark-sorted-list");
        for(var i in liArr) {
            liArr[i].classList.add("dark-list");
            liArr[i].classList.add("list-item-2");
        }
        for(var i in divRadioArr) {
            divRadioArr[i].classList.add("dark-radio-btn");
        }
     
        bg.src = bgDark;
        radioStyle.classList.add("dark-radio-btn");
        tasks.classList.add("dark-font");
        sortedTasks.classList.add("dark-font");
       
    }
    else {
        themeStatus = 0;
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>`;
        icon.classList.add("icon-moon");
        icon.classList.remove("icon-sun");
        body.classList.remove("dark-body");
        list.classList.remove("dark-list");
        inputBox.classList.remove("dark-input");
        input.classList.remove("dark-input");
        sortedTasks.classList.remove("dark-sorted-list");
        for(var i in liArr) {
            liArr[i].classList.remove("dark-list");
            liArr[i].classList.remove("list-item-2");
        }
        for(var i in divRadioArr) {
            divRadioArr[i].classList.remove("dark-radio-btn");
        }
        bg.src = bgLight;
        radioStyle.classList.remove("dark-radio-btn");
        tasks.classList.remove("dark-font");
        sortedTasks.classList.remove("dark-font");
    }
    return themeStatus;
}

//drag and drop 
document.addEventListener("dragstart", dragstart_handler, false);
document.addEventListener("dragover", dragOver, false);
document.addEventListener("dragleave", dragLeave, false);
document.addEventListener("drop", drop, false);
var drag;
function dragstart_handler(e) {
    drag = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", this.innerHTML);
}


function dragLeave(e) {
    e.stopPropagation();
}


function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
    
}

function drop(e) {
    if(drag != this) {
        drag.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
    }
    
    return false;
   
}


//media queries

if(window.matchMedia("(min-width: 1000px)").matches) {
    var currentPos = changePosition();
    var result = sortedList();
    var number = result.compTask.length;
    marginDiv = 2.85;
    firstDivPostion = 13.8;
    firstPostion(count);
    bgLight = "images/bg-desktop-light.jpg";
    bgDark = "images/bg-desktop-dark.jpg";
    changeTheme();
    function mouseIn() {
        if(themeStatus === 0){
            this.classList.add("hover-light-theme");
        }
        else this.classList.add("hover-dark-theme");
    }
    function mouseOut() {
        this.classList.remove("hover-light-theme");
        this.classList.remove("hover-dark-theme");
    }

    active.addEventListener("mouseenter", mouseIn);
    active.addEventListener("mouseleave", mouseOut);
    all.addEventListener("mouseenter", mouseIn);
    all.addEventListener("mouseleave", mouseOut);
    completed.addEventListener("mouseenter", mouseIn);
    completed.addEventListener("mouseleave", mouseOut);
    clearTasks.addEventListener("mouseenter", mouseIn);
    clearTasks.addEventListener("mouseleave", mouseOut);
}
