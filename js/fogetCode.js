

let forgetCodeBtn = document.querySelector(".forgetCodeBtn")

forgetCodeBtn.addEventListener("click"  , function(){
    let num1 =document.querySelector(".num1")
    let num2 =document.querySelector(".num2")
    let num3 =document.querySelector(".num3")
    let num4 =document.querySelector(".num4")
    let num5 =document.querySelector(".num5")
    let num6 =document.querySelector(".num6")

    let result = num1.value+num2.value+num3.value+num4.value+num5.value+num6.value
    console.log(result);

    getCode(result)

})

async function getCode(code){
    let res = await fetch("http://linka.runasp.net/api/Auth/verify-code" , {
        method:"POST",
        body:JSON.stringify({
            email: localStorage.getItem("email"),
            code:code
        }),
        headers:{"content-type" : "application/json"}
    })
     let result = await res.json()
     console.log(result);

     if(result.message == "Code Was Verified Successfully"){
        window.location.href = 'resetPassword.html'
        localStorage.setItem("token" , result.token)
     }
}