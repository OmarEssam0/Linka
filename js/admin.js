let token = localStorage.getItem("token")

async function getUsers(){
    let data = await fetch("http://linka.runasp.net/api/Roles/ViewUsers" , {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let res =await data.json()
    let cartona =``

    for(let i=0; i < res.length ; i++){
    cartona += `
    <tr class="py-5">
    <td>${res[i].firstName}</td>
    <td>${res[i].lastName}</td>
    <td>${res[i].userName}</td>
    <td>${res[i].email}</td>
    <td>${res[i].roles}</td>
    <td class="btn btn-success my-3" onclick="openUpdate('${res[i].id}',  '${res[i].userName}', '${i+1}')">update</td>
    </tr>
    `
    }

    document.querySelector(".usersBody").innerHTML = cartona

}

getUsers()

function openUpdate(id,userName,userId){
    document.querySelector(".overlay2").classList.replace("d-none" , "d-flex")
    document.querySelector(".id").value = id;
    document.querySelector(".userName").value = userName;
    document.querySelector(".idUser").value = userId;}

    async function updateRole() {
        try {
            // الحصول على القيمة المختارة من الخيارات
            var options = document.getElementsByName('role');
            var selectedValue;
            for (var i = 0; i < options.length; i++) {
                if (options[i].checked) {
                    selectedValue = options[i].value;
                    break;
                }
            }
    
            // الحصول على القيم من الحقول
            let id = document.querySelector(".id").value;
            let userName = document.querySelector(".userName").value;
            let idUser = document.querySelector(".idUser").value;
    
            // إرسال البيانات المحدثة إلى API
            let response = await fetch("http://linka.runasp.net/api/Roles/UpdateUserRoles", {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                    userName: userName,
                    roles: [
                        {
                            name: selectedValue,
                            id: idUser,
                            isSelected: true
                        }
                    ],
                    errorMessage: "string"
                }),
                headers: {
                    'Content-Type': 'application/json', // تأكد من تحديد نوع المحتوى
                    'Authorization': `Bearer ${token}`
                }
            });
    
            // التحقق مما إذا كان الطلب ناجحًا
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // تحويل الاستجابة إلى JSON
            let res = await response.json();
            console.log(res);
        } catch (error) {
            // معالجة الأخطاء
            console.error('Error:', error);
        }
        document.querySelector(".overlay2").classList.replace("d-flex" , "d-none")
        getUsers()
    }
document.querySelector(".closeBtn2").addEventListener("click" , function(){
    document.querySelector(".overlay2").classList.replace("d-flex" , "d-none")
}) 

document.querySelector(".addPost").addEventListener("click" , function(){

    let id = document.querySelector(".id").value
    let username = document.querySelector(".userName").value
    let idUser = document.querySelector(".idUser").value

    updateRole(id,username,idUser)

})