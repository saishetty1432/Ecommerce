let fname=document.querySelectorAll("input")[0]
let lname=document.querySelectorAll("input")[1]
let email=document.querySelectorAll("input")[2]
let mobile=document.querySelectorAll("input")[3]
let password=document.querySelectorAll("input")[4]
let cpassword=document.querySelectorAll("input")[5]

let efname=document.querySelectorAll("span")[0]
let elname=document.querySelectorAll("span")[1]
let eemail=document.querySelectorAll("span")[2]
let emobile=document.querySelectorAll("span")[3]
let epass=document.querySelectorAll("span")[4]
let ecpass=document.querySelectorAll("span")[5]

let form=document.querySelector("form")

let storage=[]

let lstorage=JSON.parse(localStorage.getItem("lstorage"))

if(lstorage){
    storage=lstorage
}



// console.log(fname,form,efname);
form.addEventListener("submit",(e)=>{

let regx=/^[a-zA-Z]{2,15}$/
let regx1=/^[6-9][0-9]{9}$/
let regx2=/^[a-zA-Z0-9]{6,15}$/
let flag=true
let mobileval = storage.find((e)=>{
    if(mobile.value == e.userMobile){
        return e;
    }
});

let emailval =storage.find((e)=>{
    if(email.value == e.userEmail){
        return e;
    }
})



    if(fname.value==""){
        efname.innerHTML="first name is required"
        e.preventDefault()
        flag=false

    }else if(regx.test(fname.value)){
        efname.innerHTML=""

    }else {
        efname.innerHTML="min-2 and max-15 character with A-Z"
        e.preventDefault()
        flag=false
    }

    if(lname.value==""){
        elname.innerHTML="last name is required"
        e.preventDefault()
        flag=false

    }else if(regx.test(fname.value)){
        efname.innerHTML=""

    }else {
        efname.innerHTML="min-2 and max-15 character with A-Z"
        e.preventDefault()
        flag=false
    }
    if(email.value==''){
        eemail.innerHTML='Email id is required'
        e.preventDefault()
        flag=false
    }else if(emailval){
        eemail.innerHTML='This email already exist'
        e.preventDefault()
    }

    if(mobile.value==''){
        emobile.innerHTML='Mobile Number is required'
        e.preventDefault()
        flag=false
    }
    else if(mobileval){
        emobile.innerHTML = 'It is already Existed'
        e.preventDefault()
    }
    else if(regx1.test(mobile.value)){
        emobile.innerHTML=''
    }
    
    else{
        emobile.innerHTML='Mobile Number must start in  a range of 6-9 and 10 values are required'
        e.preventDefault()
        flag=false
    }
    if(password.value==''){
        epass.innerHTML='Password is Required'
        e.preventDefault()
        flag=false
    }else if(regx2.test(password.value)){
        epass.innerHTML=''

    }else{
        epass.innerHTML='Minimum 6 and Maximum 8 values are required'
        e.preventDefault()
        flag=false
    }
    if(cpassword.value === password.value){
        ecpass.innerHTML = ''
    }
    else{
        ecpass.innerHTML = 'Confirm Password Does not match'
        e.preventDefault()
        flag=false
    }


    if(flag){
        let obj={
            userName:fname.value,
            userLastName:lname.value,
            userEmail:email.value,
            userMobile:mobile.value,
            userPassword:password.value
        }
        storage.push(obj)
    localStorage.setItem("lstorage",JSON.stringify(storage))
    }
    
    


})
