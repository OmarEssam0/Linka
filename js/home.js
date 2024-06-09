let token = localStorage.getItem("token")
const parts = token.split('.');
const header = JSON.parse(atob(parts[0]));
const payload = JSON.parse(atob(parts[1]));
document.querySelector(".user-img img").src = payload.ProfilePicturePath
if(payload.roles == "Admin"){
    window.location.href = "admin.html"
}


async function getAllPosts(token) {
    let res = await fetch("http://linka.runasp.net/api/Posts/GetAllPosts", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let result = await res.json()
    console.log(result);
   
    let cartona = ``
    for (let i = 0; i < result.length; i++) {
        cartona += `<div class="post-user d-flex gap-3 align-items-center">
        <div class="img-user my-3">
        <img
        src="image/724f72eb2c73d3e7560e01a5f0093700.jpeg"
        alt="user"
        class="img-fluid"
        />
        </div>
        <div class="user-name">
        <p class="fw-bold main-color">${result[i].firstName} ${result[i].lastName}</p>
        <span class="text-black-50 fs-6">${result[i].userName}</span>
        </div>
        </div>
        <div class="post-content">
        <p>
        ${result[i].content}
        </p>
        </div>
        <div class="post-img py-2">
        <img
        src="image/9a6daf98248af65119ec79e378fa0b08.jpeg"
        alt="post-img"
        class="img-fluid"
        />
        </div>
        <div class="reactions my-2 d-flex justify-content-between align-items-center gap-2">
                <div class="d-flex align-items-center gap-2">
                        <div class="heart d-flex align-items-center">
                        <i class="fa-solid fa-heart fs-3 me-2 cursor-pointer heart-color" onclick="addReact('${result[i].id}')" >
                        </i>
                        <span class="main-color d-inline-block reacts-number fw-bold">
                            ${result[i].reacts}
                        </span>
                        </div>
                                <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-comment fs-3 heart-color"></i>
                        <span class="main-color d-inline-block reacts-number fw-bold">
                        ${result[i].comments}
                                </span>
                        </div>
                </div>
             <div class="d-flex align-items-center gap-2 addOffersBtn">
             <span class="main-color">Add Offer</span>
             <i class="fa-solid fa-up-right-from-square addOffers main-color cursor-pointer" onclick="openPopOffer('${result[i].id}')"></i>
             </div>
        </div>`
    }

    document.querySelector(".post-contents").innerHTML = cartona
    if(payload.roles == "User"){
       let x = document.querySelectorAll(".addOffersBtn")
        for (let i = 0; i < x.length; i++) {
            x[i].classList.replace("d-flex" , "d-none")
            
        }
        // document.querySelectorAll(".addOffersBtn").classList.replace("d-flex" , "d-none")
        }



}
async function getAllRequests(token) {
    let res = await fetch("http://linka.runasp.net/api/Connection/ReceivedConnections", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let result = await res.json()

    let cartona = ``
    for (let i = 0; i < result.connections.length; i++) {
        cartona += `<div class="d-flex align-items-center justify-content-between"> <div class="imgAndName d-flex align-items-center gap-3 my-2 py-1">
        <div class="ConnectImg">
          <img
            src="image/8816bbd4756f4a9e986b19c0233d984f.jpeg"
            alt="user"
            class="img-fluid"
          />
        </div>
        <div class="ConnectName">
          <p class="fw-bold main-color">${result.connections[i].userName}</p>
          <span class="text-black-50 fs-6">Artist</span>
        </div>
      </div>
      <div class="connect-buttons d-flex gap-2 mx-3">
          <div class="btn-igrone">
              <button class="btn main-color" onclick="refuseReq('${result.connections[i].connectionId}')">
                  Ignore
              </button>
          </div>
          <div class="btn-accept">
              <button class="btn main-bg text-white" onclick="acceptReq('${result.connections[i].connectionId}')">
                  Accept
              </button>
          </div>
      </div> </div>`
    }

    let ss = document.querySelector(".connects").innerHTML = cartona
}
async function getAllConnections(token) {
    let res = await fetch("http://linka.runasp.net/api/Connection/recommended-users", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let result = await res.json()
    console.log(result);
    let cartona = ``
    for (let i = 0; i < result.length; i++) {
        cartona += `<div class="d-flex align-items-center justify-content-between"> <div class="imgAndName d-flex align-items-center gap-3 my-2 py-1">
        <div class="ConnectImg">
          <img
            src="image/8816bbd4756f4a9e986b19c0233d984f.jpeg"
            alt="user"
            class="img-fluid"
          />
        </div>
        <div class="ConnectName">
          <p class="fw-bold main-color">${result[i].userName}</p>
          <span class="text-black-50 fs-6">Artist</span>
        </div>
      </div>
      <div class="connect-buttons">
          <div class="btn-accept mx-3">
              <button class="btn main-bg text-white" onclick="sendConnect('${result[i].userName}')">
                  Connect <i class="fa-solid fa-circle-plus fs-6 cursor-pointer"></i>
              </button>
          </div>
      </div> </div>`
    }
    document.querySelector(".connections").innerHTML = cartona


}
async function acceptReq(id) {
    let res = await fetch(`http://linka.runasp.net/api/Connection/AcceptConnection/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let result = await res.json()
    getAllRequests(token)
    getAllConnections(token)
}
async function refuseReq(id) {
    let res = await fetch(`http://linka.runasp.net/api/Connection/RefuseConnection/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let result = await res.json()
    getAllRequests(token)
    getAllConnections(token)
}
async function sendConnect(username) {
    let res = await fetch(`http://linka.runasp.net/api/Connection/Connect/${username}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let result = await res.json()
    getAllConnections(token)
    getAllRequests(token)
}

async function addReact(id) {
    try {
      let response = await fetch("http://linka.runasp.net/api/Posts/AddReact", {
        method: "POST",
        body: JSON.stringify({
          "postId": id
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
  
      // التحقق مما إذا كان الطلب ناجحًا
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      let res = await response.json();
      
      // تحديث واجهة المستخدم بعد النجاح
      document.querySelector(".fa-heart").classList.replace('heart-color', 'main-color');
      console.log(res);
    } catch (error) {
      // معالجة الأخطاء
      console.error('Error:', error);
    }
    getAllPosts(token)
  }

async function sendOffer(id, offer, rate, Descr) {
    console.log( Descr);
   
    let data = await fetch("http://linka.runasp.net/api/offer/SendOffer", {
        method: "POST",
        body:JSON.stringify ({ 
            postId:+id,
            offerValue:offer,
            profitRate:rate,
            description:Descr
        }),
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
    let res = await data.json()
    console.log(res)

    document.querySelector(".errors").innerHTML = res.errors
    if (!res.errors) {
        document.querySelector(".overlay").classList.replace("d-flex", "d-none")
    }



}



function popup() {
    if (payload.roles != "Investor") {
        document.querySelector(".offerOverLay1").classList.replace("d-none", "d-flex")
    } else {
        document.querySelector(".offerOverLay2").classList.replace("d-none", "d-flex")
    }
}
document.querySelector(".closeBtnOffer2").addEventListener("click", function () {
    document.querySelector(".offerOverLay2").classList.replace("d-flex", "d-none")
})
document.querySelector(".closeBtnOffer").addEventListener("click", function () {
    document.querySelector(".offerOverLay1").classList.replace("d-flex", "d-none")
})

document.querySelector(".offers-select").addEventListener("click", function () {
    popup()
})


document.querySelector(".GetInvestorOffers").addEventListener("click", function () {
    window.location.href = "getInvestor.html"
})
document.querySelector(".GetInvestorAcceptedOffers").addEventListener("click", function () {
    window.location.href = "getInvestorAccept.html"
})
document.querySelector(".GetOffer").addEventListener("click", function () {
    window.location.href = "getOffer.html"
})
document.querySelector(".GetAcceptedOffer").addEventListener("click", function () {
    window.location.href = "getRequestOffer.html"
})



getAllConnections(token)
getAllRequests(token)
getAllPosts(token)

function openPopOffer(id) {
    let idPost = id
    document.querySelector(".overlay").classList.replace("d-none", "d-flex")
    document.querySelector(".sendOffer").addEventListener("click", function (eInfo) {
        let OfferValue = +document.querySelector(".OfferValue").value
        let ProfitRate = +document.querySelector(".ProfitRate").value
        let Description = document.querySelector(".Description").value
        console.log(idPost);
        sendOffer(idPost, OfferValue, ProfitRate, Description)
    })
}
document.querySelector(".closeBtn").addEventListener("click", function () {
    document.querySelector(".overlay").classList.replace("d-flex", "d-none")
})