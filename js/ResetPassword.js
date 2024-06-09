let confrimBtn = document.querySelector(".confrimBtn")

confrimBtn.addEventListener("click"  , function(){
 let password = document.querySelector(".Password")
 let confirmPassword = document.querySelector(".confirmPassword")

    
    getCode(password.value , confirmPassword.value)
    window.location.href="sign-in.html"

})

async function getCode(passwrod , confirmPassword){
    let res = await fetch("http://linka.runasp.net/api/Auth/reset-password" , {
        method:"POST",
        body:JSON.stringify({
            token:localStorage.getItem("token"),
            email: localStorage.getItem("email"),
            password:passwrod,
            confirmPassword:confirmPassword
        }),
        headers:{"content-type" : "application/json"}
    })
     let result = await res.json()
     console.log(result);

}