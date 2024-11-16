import User from "../model/userModel.js";

const USERSERVICE = {

    uuid:0,
    userList : [],
    createUser:function(rawData){
        const user = new User(this.createUUID(),rawData.firstName,rawData.lastName,rawData.dob,rawData.phoneNumber,rawData.address);
        this.userList.push(user);
        this.storeDataInLocalStore()
    },
    updateUser:function(id,rawData){
        const index =  this.userList.findIndex((user)=>user.id == id);
        console.log("index : ",index);
        const newUser = new User(parseInt(id),rawData.firstName,rawData.lastName,rawData.dob,rawData.phoneNumber,rawData.address);
        this.userList[index] = newUser;
        this.storeDataInLocalStore()
    },
    getUserByUUID:function(id){
        return this.userList.find((user)=>user.id==id)
    },
    deleteUser:function(id){
        this.userList = this.userList.filter((user)=>user.id!= id);
        this.storeDataInLocalStore()
    },
    getUsers:function(){
        return this.userList;
    },
    createUUID:function(){
        return Math.floor(100000 + Math.random()*99999);
    },
    storeDataInLocalStore:function(){
     const data = JSON.stringify(this.userList)
     console.log(data);
     localStorage.setItem("userList",data)
    },
    getDataFromLocalStorage:function(){
        const data = localStorage.getItem("userList")
        const list = JSON.parse(data);
        this.userList = list;
        
    }

    
}

export default USERSERVICE;