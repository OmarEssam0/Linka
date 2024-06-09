let token = localStorage.getItem("token")
const parts = token.split('.');
const header = JSON.parse(atob(parts[0]));
const payload = JSON.parse(atob(parts[1]));
document.querySelector(".role").innerHTML = payload.roles
console.log(payload.ProfilePicturePath);

document.querySelector(".pro-img img").src = payload.ProfilePicturePath
document.querySelector(".user-img img").src = payload.ProfilePicturePath
// let user = payload.http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name 
// console.log(payload);

document.querySelector(".firstAndLast").innerHTML = payload.FirstName +" "+ payload.LastName

document.querySelector(".identity-information").addEventListener("click" , function(){
    document.querySelector(".overlay").classList.replace("d-none" , "d-flex")
})
document.querySelector(".closeBtn").addEventListener("click" , function(){
    document.querySelector(".overlay").classList.replace("d-flex" , "d-none")
})

async function checkID(id ,realName ,Attachments ){
  let formData = new FormData();
  formData.append('file', Attachments);
  let data = await fetch("https://yolo-3.onrender.com/classify/" ,{
    method:"POST",
    data: formData
  })
  let res = await data.json()
  if(res.classification != "Not ID"){
    addIdentityInformation(id, realName, NationalCard);
  }
}

async function getAllPosts(userName){
    let data = await fetch(`http://linka.runasp.net/api/Posts/GetPostsByUser?username=${userName}`, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    let res = await data.json()
    let cartona = ``

    for(let i = 0 ; i < res.length; i++){
        cartona += `<div class="post-user d-flex gap-3 align-items-center">
        <div class="img-user my-3">
          <img
            src="image/724f72eb2c73d3e7560e01a5f0093700.jpeg"
            alt="user"
            class="img-fluid"
          />
        </div>
        <div class="user-name">
          <p class="fw-bold main-color firstAndLast">${res[i].firstName} ${res[i].lastName}</p>
          <span class="text-black-50 fs-6"
            >${res[i].userName}</span
          >
        </div>
      </div>
      <div class="post-content">
        <p>
        ${res[i].content}
        </p>
      </div>
      <div class="post-img py-2">
        <img
          src="image/9a6daf98248af65119ec79e378fa0b08.jpeg"
          alt="post-img"
          class="img-fluid"
        />
      </div>`
    }
    let ss = document.querySelector(".post-contents").innerHTML = cartona
}
getAllPosts(payload.username)
document.querySelector(".addIdentity1").addEventListener("click", async function() {
 
  let id = document.querySelector(".NationalID").value;
  let realName = document.querySelector(".realName").value;
  let NationalCard = document.querySelector(".NationalCard").files[0];
  checkID(id ,realName , NationalCard )
});
document.querySelector(".addPost").addEventListener("click", async function() {
  let Content = document.querySelector(".Content").value;
  let Attachments = document.querySelector(".Attachmentsfile").files[0];

  addPost(Content, Attachments);
});

async function addPost(Content , Attachments , CategoryId) {
  let formData = new FormData();
  formData.append('Content', Content);
  formData.append('Attachments', Attachments);
  formData.append('CategoryId', "1");
  formData.append('ConnectionsOnly', false);

  let data = await fetch("http://linka.runasp.net/api/Posts/AddPost", {
      method: "POST",
      body: formData,
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });

  let res = await data.json();

  let cartona = ``
if(res.errors){
            for(let i = 0 ; i < res.errors.length ; i++){
                cartona += `<p class="text-start"> * ${res.errors[i]}</p>`
                }
            document.querySelector(".message1").classList.replace("d-none" , "d-block")
            document.querySelector(".message1").innerHTML = cartona
    }else(
      document.querySelector(".overlay2").classList.replace("d-flex" , "d-none")
      )
    getAllPosts(payload.username)
}
async function addIdentityInformation(id , realName , NationalCard) {
  let formData = new FormData();
  formData.append('NationalId', id);
  formData.append('RealName', realName);
  formData.append('NationalCard', NationalCard);

  let data = await fetch(`http://linka.runasp.net/api/Auth/identity-information`, {
      method: "POST",
      body: formData,
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });

  let res = await data.json();
  let cartona = ``
if(res.errors){
            for(let i = 0 ; i < res.errors.length ; i++){
                cartona += `<p class="text-start"> * ${res.errors[i]}</p>`
            }
            document.querySelector(".message").classList.replace("d-none" , "d-block")
            document.querySelector(".message").innerHTML = cartona
            alert(":")
    }else if(res.message){
      document.querySelector(".message").classList.replace("d-none" , "d-block")
            document.querySelector(".message").innerHTML = res.message
    }
}

function popup(){
  if(payload.roles != "Investor"){
     document.querySelector(".offerOverLay1").classList.replace("d-none" , "d-flex")
 }else{
     document.querySelector(".offerOverLay2").classList.replace("d-none" , "d-flex")
 }
}
document.querySelector(".closeBtnOffer2").addEventListener("click" , function(){
 document.querySelector(".offerOverLay2").classList.replace("d-flex" , "d-none")
})
document.querySelector(".closeBtnOffer").addEventListener("click" , function(){
 document.querySelector(".offerOverLay1").classList.replace("d-flex" , "d-none")
})
 
document.querySelector(".offers-select").addEventListener("click" , function(){
 popup()
})
document.querySelector(".GetInvestorOffers").addEventListener("click" , function(){
  window.location.href = "getInvestor.html"
})
document.querySelector(".GetInvestorAcceptedOffers").addEventListener("click" , function(){
  window.location.href = "getInvestorAccept.html"
})
document.querySelector(".GetOffer").addEventListener("click" , function(){
  window.location.href = "getOffer.html"
})
document.querySelector(".GetAcceptedOffer").addEventListener("click" , function(){
  window.location.href = "getRequestOffer.html"
})
document.querySelector(".addPostBtn").addEventListener("click" , function(){
  document.querySelector(".overlay2").classList.replace("d-none" , "d-flex")
})

document.querySelector(".closeBtn2").addEventListener("click", function(){
  document.querySelector(".overlay2").classList.replace("d-flex" , "d-none")
})

document.querySelector(".addPhoto").addEventListener("click" , function(){
  document.querySelector(".offerOverLay3").classList.replace("d-none" , 'd-flex')
})
document.querySelector(".closeBtnOffer3").addEventListener("click" , function(){
  document.querySelector(".offerOverLay3").classList.replace("d-flex" , 'd-none')
})

async function addPhotoPicture(Photo){
  let formData = new FormData();
  formData.append('ProfilePicture', Photo);
  let data = await fetch("http://linka.runasp.net/api/Profile/profile-picture" , {
    method:"PUT",
    body:formData,
    headers: {
      'Authorization': `Bearer ${token}`
  }
  })
  let res = await data.json()
  console.log(res);
  if(res.message == "Profile picture was updated successfully"){
    document.querySelector(".offerOverLay3").classList.replace("d-flex" , 'd-none')
  }
}

document.querySelector(".ADDPHOTO").addEventListener("click" ,  async function(){
  let Photo = document.querySelector(".profilePicture").files[0];
  addPhotoPicture(Photo)
})


document.querySelector(".addqualifications").addEventListener("click" , function(){
  document.querySelector(".offerOverLay4").classList.replace("d-none" , 'd-flex')
})
document.querySelector(".closeBtnOffer4").addEventListener("click" , function(){
  document.querySelector(".offerOverLay4").classList.replace("d-flex" , 'd-none')
})


async function addQualifications(qua, inter) {
  try {
    // إرسال الطلب إلى API
    let response = await fetch("http://linka.runasp.net/api/Profile/update-qualifications-interests", {
      method: "PUT",
      body: JSON.stringify({
        qualifications: qua,
        interests: inter
      }),
      headers: {
        'Authorization': `Bearer ${token}`, // التحقق من أن token معرف
        'Content-Type': 'application/json' // تعيين نوع المحتوى إلى JSON
      }
    });

    // التحقق مما إذا كان الطلب ناجحًا
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // تحويل الاستجابة إلى JSON
    let res = await response.json();
    console.log(res);
    

    // تحديث واجهة المستخدم بعد النجاح
    document.querySelector(".offerOverLay4").classList.replace("d-flex", 'd-none');
  } catch (error) {
    // معالجة الأخطاء
    console.error('Error:', error);
  }
  getQ()
}


document.querySelector(".AddQualifications").addEventListener("click" ,  function(){
  let Qualifications = document.querySelector(".AddQualifications1").value;
  let inters = document.querySelector(".AddInterests").value;

  addQualifications(Qualifications,inters)
})



async function getQ(){
  let data = await fetch("http://linka.runasp.net/api/Profile/get-qualifications-interests" , {
    method:"GET",
    headers: {
      'Authorization': `Bearer ${token}`
  }
  })
  let res = await data.json()
  document.querySelector(".qualication").innerHTML = "qualifications :" + res.qualifications
  document.querySelector(".inte").innerHTML ="interests :" + res.interests
}

getQ()