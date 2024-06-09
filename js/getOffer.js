let token = localStorage.getItem("token")

async function getOffers(){
    let data = await fetch("http://linka.runasp.net/api/offer/GetOffers" , {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    let res =await data.json()
    console.log(res);
    let cartona = ``

    for (let i = 0; i < res.length; i++) {
        cartona += `
        <tr>
        <td>${res[i].postId}</td>
        <td>${res[i].id}</td>
        <td>${res[i].offerValue}</td>
        <td>${res[i].profitRate}</td>
        <td>${res[i].description}</td>
        </tr>
        `
    }

    document.querySelector(".table-content").innerHTML= cartona
}

getOffers()