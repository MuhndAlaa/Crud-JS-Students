//Student
var sName = document.getElementById("sName");
var sAge = document.getElementById("sAge");
var sEmail = document.getElementById("sEmail");
var sTable = document.getElementById("sTable");
var sBtn = document.getElementById("sBtn");
var sNoData = document.getElementById("sNoData");
var students = [];

//Parent
var pName = document.getElementById("pName");
var pNumber = document.getElementById("pNumber");
var pEmail = document.getElementById("pEmail");
var pTable = document.getElementById("pTable");
var pBtn = document.getElementById("pBtn");
var pNoData = document.getElementById("pNoData");

//Grades
var gName = document.getElementById("gName");
var gId = document.getElementById("gId");
var gSubject = document.getElementById("gSubject");
var gGrade = document.getElementById("gGrade");
var gBtn = document.getElementById("gBtn");

//Constructor functions
function Person(id,name , email){
    this.id = id;
    this.name = name;
    this.email = email;
    this.sayhello =function(){
        console.log("sayhello from person");
    }
}

function Student(id,name,email,age,degree = []){
    Person.call(this,id,name,email);
    this.age = age;
    this.degree = degree;
    
}

function Parent(id,name,email,number){
    Person.call(this,id,name,email);
    this.number = number;
}

Person.prototype.countFn = function(){ return ++this.count};
Student.prototype.count = 0;
Parent.prototype.count = 0;

//Event listener
sBtn.addEventListener("click" , sAdd);
pBtn.addEventListener("click" , pAdd);
gBtn.addEventListener("click" , gAdd);


//Student Function.
function sAdd(){
    var s = new Student(
        Person.prototype.countFn.call(Student.prototype),  
        sName.value,
        sAge.value,
        sEmail.value      
    )
    sDisplay(s);
    students.push(s);
}

function sDisplay(s){
    sNoData.remove();
    createTable(s , sTable);
}

//Parent Function.
function pAdd(){
    var p = new Parent(
        Person.prototype.countFn.call(Parent.prototype),
        pName.value,
        pNumber.value,
        pEmail.value      
    )
    pDisplay(p);
}

function pDisplay(p){
    pNoData.remove();
    createTable(p , pTable);
}

//General Function
function createTable(x ,table){
    var tr = createList(table);
    var x = JSON.parse(JSON.stringify(x));
    for(var key in x){
        var td = createListItem(x, key);
        tr.append(td);
    }
}

function createList(table){
    var tr = document.createElement("tr");
    table.append(tr);
    return tr;
}

function createListItem(x , key){
    if(key == 'degree'){
        var td = document.createElement("select");
        var option = document.createElement("option");
        option.innerText = "Subjects";
        td.append(option);
    }else{
        var td = document.createElement("td");
        td.innerText = x[key] ? x[key] : "N/A";
    }
    return td;
}

//Grades Function
function gAdd(){
    var trArray = document.querySelectorAll("#sTable > tr");
    for(var i=0 ; i < trArray.length ; i++){
        id = trArray[i].firstChild;
        degree = trArray[i].lastChild;
        validDegree(id , degree , i);
    }
}

function validDegree(id , degree , index ){
    if(id.innerText == gId.value){
        var option = document.createElement("option");
        option.innerText = gSubject.value + " : " + gGrade.value; 
        gDisplay(degree , index ,option);
    }
}

function gDisplay(degree , index ,option){
    if(students[index].degree.length == 0){
        students[index].degree.push({"subject" : gSubject.value ,"grade" : gGrade.value});
        degree.append(option);
    }else{
        students[index].degree.map(function(elem, i){
            if(!(elem.subject == gSubject.value)){
                degree.append(option);
                students[index].degree.push({"subject" : gSubject.value ,"grade" : gGrade.value});
            }else{
                alert("This subject alreay inserted");
            }
        })
    } 
}

//Validation
function sValidation(){
    if((sName.value && sAge.value && sEmail.value) != ""){
        sBtn.removeAttribute("disabled");
    }else{
        sBtn.setAttribute("disabled" , "disabled");
    }
}

function pValidation(){
    if((pName.value && pNumber.value && pEmail.value) != ""){
        pBtn.removeAttribute("disabled");
    }else{
        pBtn.setAttribute("disabled" , "disabled");
    }
}

function gValidation(){
    if((gName.value && gId.value && gSubject.value && gGrade.value) != ""){
        gBtn.removeAttribute("disabled");
    }else{
        gBtn.setAttribute("disabled" , "disabled");
    }
}

sName.addEventListener("input" , sValidation);
sAge.addEventListener("input" , sValidation);
sEmail.addEventListener("input" , sValidation);

pName.addEventListener("input" , pValidation);
pNumber.addEventListener("input" , pValidation);
pEmail.addEventListener("input" , pValidation);

gName.addEventListener("input" , gValidation);
gGrade.addEventListener("input" , gValidation);
gSubject.addEventListener("input" , gValidation);
gGrade.addEventListener("input" , gValidation);

