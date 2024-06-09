let token = localStorage.getItem("token")

async function getCat(){
    let data = await fetch("http://linka.runasp.net/api/Categories/get-categories" , {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let res = await data.json()
    let catona=``
    for(let i = 0; i < res.length ; i++){
        catona += `
        <tr class="text-center">
        <td onclick="getCatPosts('${res[i].id}')" class="cursor-pointer">${res[i].name}</td>
        <td onclick="getCatPosts('${res[i].id}')">
        <button class="btn btn-success my-2">
            Add 
        </button>
        </td>
        <td onclick="getCatPosts('${res[i].id}')">
        <button class="btn btn-danger my-2">
            Remove
        </button>
        </td>
        </tr>
        `
    }
    document.querySelector("tbody").innerHTML = catona
}

getCat()


async function getCatPosts(id){
    let data = await fetch(`http://linka.runasp.net/api/Categories/get-category-posts?id=${id}` , {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let result = await data.json()
    console.log(result);
     let catona=``
    if(result.errors){
        catona = result.errors;
    }
   
    for(let i = 0; i < result.length ; i++){
        catona += `<div class="post-user d-flex gap-3 align-items-center">
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
             <div class="d-flex align-items-center gap-2">
             <span class="main-color">Add Offer</span>
             <i class="fa-solid fa-up-right-from-square addOffers main-color cursor-pointer" onclick="openPopOffer('${result[i].id}')"></i>
             </div>
        </div>`
    }
    document.querySelector(".post-contents").innerHTML = catona
}
