let forgetPassBtn = document.querySelector(".forgetPassBtn")

async function ForgetPass(email){
    let res = await fetch("http://linka.runasp.net/api/Auth/forgot-password" , {
        method:"POST",
        body:JSON.stringify({
            email: email,
        }),
        headers:{"content-type" : "application/json"}
    })
     let result = await res.json()

    }
    
    forgetPassBtn.addEventListener("click" , function(){
        let email = document.querySelector(".email")
        localStorage.setItem("email" , email.value)
        window.location.href = 'forgetCode.html'
        console.log(typeof(email.value));
    ForgetPass(email.value)
   
})