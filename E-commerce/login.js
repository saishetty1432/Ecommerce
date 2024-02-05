let username=document.querySelectorAll("input")[0];

let password = document.querySelectorAll("input")[1];
let form=document.querySelector("form");
let euser=document.querySelectorAll("span")[0]
let epass=document.querySelectorAll("span")[1]
let eform=document.querySelectorAll("span")[2]

let lstorage=JSON.parse(localStorage.getItem("lstorage"))
console.log(lstorage);
// console.log(euser,epass,eform);

// form.addEventListener("submit",()=>{
//     if(username.value==="" && password.value ===""){
//         alert("Both fields are empty!");
//         alert("Fill the details first to login")

//     }
//     else if (username.value === "") {
//         alert("username required");

//     }else if(password.value === ""){
//         alert("password is required")
//     }

//     else if(username.value === "admin" && password.value === "admin"){
//         alert("Login Successful !");
        
//     }else{
//         alert(`Invalid Username or Password`);
//         // alert("details not matched")
//     }
// })
form.addEventListener("submit",(e)=>{
    euser.innerHTML="";
    epass.innerHTML="";
    eform.innerHTML="";
    let matching=lstorage.find((e)=>{
        if((e.userEmail==username.value && e.userPassword==password.value) || (e.userMobile==username.value && e.userPassword==password.value)){
            return e;

        }

    })
    



    

    


    if(username.value =="" && password.value==""){
        euser.innerHTML="username is required";
        epass.innerHTML="password is required";
        e.preventDefault()
    }
    else if(username.value ==""){
        euser.innerHTML="enter username";
        e.preventDefault();

    }
    else if(password.value==""){
        epass.innerHTML="enter password"
        e.preventDefault()
    }
    else if(matching){
        alert("Login Successful !")
        localStorage.setItem("user",JSON.stringify(matching))
    }else{
        eform.innerHTML="doest match with database"
        e.preventDefault()
    }
})


