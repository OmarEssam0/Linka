let loginBtn = document.querySelector(".loginBtn")

async function loginUser(user , password){
    let res = await fetch("http://linka.runasp.net/api/Auth/Login" , {
        method:"POST",
        body:JSON.stringify({
            userName: user,
            password: password
        }),
        headers:{"content-type" : "application/json"}
    })

    let result = await res.json()
    let cartona = ``
    if(result.message == "Login successful."){
        localStorage.setItem("token" , result.token)
        window.location.href = "Home.html"
    }else if(result.errors){
            for(let i = 0 ; i < result.errors.length ; i++){
                cartona += `<p class="text-start"> * ${result.errors[i]}</p>`
            }
            document.querySelector(".message").classList.replace("d-none" , "d-block")
            document.querySelector(".message").innerHTML = cartona
    }
}

loginBtn.addEventListener("click" , function(){
    let userName = document.querySelector(".userName")
    let password = document.querySelector(".password")

    loginUser(userName.value , password.value)

})
