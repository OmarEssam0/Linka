let token = localStorage.getItem("token")

async function getOffers(){
    let data = await fetch("http://linka.runasp.net/api/offer/GetInvestorOffers" , {
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
        <td>${res[i].offerValue}</td>
        <td>${res[i].profitRate}</td>
        <td>${res[i].description}</td>
        <td>
        <button class="btn btn-success my-2" onclick="acceptOffer('${res[i].id}')">Accept Offer</button></td>
        <td>
        <button class="btn btn-danger" onclick="refuseOffer('${res[i].id}')">Refuse Offer</button></td>
        </tr>
        `
    }

    document.querySelector(".table-content").innerHTML= cartona
}

getOffers()

async function acceptOffer(id){
    let data = await fetch(`https://localhost:7020/api/offer/AcceptOffer/${id}` , {
        method:"POST", 
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    let res =await data.json()
    console.log(res);

    getOffers()
    
}
// async function refuseOffer(id){
//     let data = await fetch(`http://linka.runasp.net/api/offer/AcceptOffer/${id}` , {
//         headers: {
//             "Authorization": `Bearer ${token}`,
//         }
//     })
//     let res =await data.json()
//     console.log(res);


    
// }