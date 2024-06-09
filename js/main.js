let signUpBtn = document.querySelector(".signUpBtn")

async function registerUser(data) {
    let res = await fetch("http://linka.runasp.net/api/Auth/Register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" }
    })
    let result = await res.json()
    let cartona = ``
    if(result.errors){
        for(let i =0 ; i < result.errors.length ; i++){
            cartona += `<p class="text-start"> * ${result.errors[i]}</p>`
        }
        document.querySelector(".message").classList.replace("d-none" , "d-block")
        document.querySelector(".message").innerHTML = cartona
    }else{
        window.location.href = "sign-in.html"
    }
}

signUpBtn.addEventListener("click", function () {
    let firstName = document.querySelector(".firstName")
    let lastName = document.querySelector(".lastName")
    let fullName = document.querySelector(".fullName")
    let emailAddres = document.querySelector(".EmailAddress")
    let password = document.querySelector(".password")
    let select = Boolean(document.querySelector(".ff"))
    registerUser({
        FirstName: firstName.value,
        LastName: lastName.value,
        IsInvestor: select,
        UserName: fullName.value,
        Email: emailAddres.value,
        Password: password.value,
    })
})

