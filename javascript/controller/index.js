import USERSERVICE from "../services/userService.js";

window.addEventListener("DOMContentLoaded",events)

function events(){
    USERSERVICE.getDataFromLocalStorage();
    printData();
    document.getElementById("addBtn").addEventListener("click",showForm)
    document.getElementById("details").addEventListener("submit",getDataForm);
}

function showForm(){
    const dataForm = document.querySelector(".dataForm");

    dataForm.classList.toggle("showForm");

}

function getDataForm(event){
    event.preventDefault()
    if(validateFirstName(event.target[0].value) === false){
        return
    }
    console.log(event);
    const userId = document.getElementById("details").getAttribute("userId");
    console.log(userId);
    
    
    const rawData = {
        firstName : event.target[0].value,
        lastName : event.target[1].value,
        dob: event.target[2].value,
        phoneNumber : event.target[3].value,
        address : event.target[4].value,
    }

  for (let i = 0; i < 5; i++) {
    event.target[i].value = ""
  }
  showForm()
  if(userId === null){
    USERSERVICE.createUser(rawData);
  }
  else{
    USERSERVICE.updateUser(userId,rawData);
  }
  document.getElementById("details").removeAttribute("userId");
    printData();
}


function printData(){
    const tbody = document.getElementById("printData");
    tbody.innerHTML = "";
    const userList =  USERSERVICE.getUsers();

    for (let i = 0; i < userList.length; i++) {
       const tr = document.createElement("tr")

       const idTd = document.createElement("td");
       idTd.innerText = userList[i].id
    //    <tr>
    //     <td></td>
    //    </tr>
       tr.appendChild(idTd)
       const firstNameTd = document.createElement("td");
       firstNameTd.innerText = userList[i].firstName
       tr.appendChild(firstNameTd)
       const lastNameTd = document.createElement("td");
       lastNameTd.innerText = userList[i].lastName
       tr.appendChild(lastNameTd)
       const dobTd = document.createElement("td");
       dobTd.innerText = userList[i].dob
       tr.appendChild(dobTd)
       const phoneNumberTd = document.createElement("td");
       phoneNumberTd.innerText = userList[i].phoneNumber
       tr.appendChild(phoneNumberTd);
       const addressTd = document.createElement("td");
       addressTd.innerText = userList[i].address
       tr.appendChild(addressTd);
       const updateUserBtn = document.createElement("button")
       updateUserBtn.innerText = "Update"
       updateUserBtn.setAttribute("id",userList[i].id)
       updateUserBtn.addEventListener("click",updateUser)
       const deleteUserBtn = document.createElement("button")
       deleteUserBtn.innerText = "Delete"
       deleteUserBtn.setAttribute("id",userList[i].id)
       deleteUserBtn.addEventListener("click",deleteUser);
       const operationtd = document.createElement("td");
       
       operationtd.appendChild(updateUserBtn);
       operationtd.appendChild(deleteUserBtn);
       tr.appendChild(operationtd);

       tbody.appendChild(tr);
    }

}


function validateFirstName(name){
    if(name ===undefined || name === null || name === ""){
        alert("Please Provide a name");
        return false
    }
    return true
}



// update -> delete old add new 

// we can create new form update 

// when we update store the id somewhere in html 

// delete 

function updateUser(){
    const id = this.getAttribute("id")
    const user = USERSERVICE.getUserByUUID(id);
    showForm();
    document.getElementById("details").setAttribute("userID",user.id)
    document.getElementById("firstName").value = user.firstName
    document.getElementById("lastName").value = user.lastName
    document.getElementById("dob").value = user.dob
    document.getElementById("phoneNumber").value = user.phoneNumber
    document.getElementById("address").value = user.address
    console.log(user);
}


function deleteUser(){
    const id = this.getAttribute("id");

    USERSERVICE.deleteUser(id);
    printData()
}



// Crud - user
