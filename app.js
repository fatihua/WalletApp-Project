//^ Selectors

const ekleBtn = document.getElementById("ekle-btn")
const gelirInput = document.getElementById("gelir-input")
const ekleFormu = document.getElementById("ekle-formu")
const temizleBtn = document.getElementById("temizle-btn")

//^ Hesap Tablosu
const gelirinizTd = document.getElementById("geliriniz")
const giderinizTd = document.getElementById("gideriniz")
const kalanTd = document.getElementById("kalan")

//^ variables
let gelirler = 0
let harcamaListesi = []


//^ Harcama Formu
const harcamaFormu = document.getElementById("harcama-formu")
const harcamaAlaniInput = document.getElementById("harcama-alani")
const tarihInput = document.getElementById("tarih")
const harcamaInput = document.getElementById("miktar")

//^ Harcama  Tablosu

const harcamaBody = document.getElementById("harcama-body")


//? Ekle Formu

ekleFormu.addEventListener("submit", (e)=>{
    e.preventDefault() //reload u önler
    gelirler = gelirler + Number(gelirInput.value)
    // console.log(gelirler)
    // gelirInput.value = ''
    ekleFormu.reset()
    localStorage.setItem("gelirler", gelirler)
    gelirinizTd.textContent = new Intl.NumberFormat().format(gelirler)  

})

window.addEventListener("load",()=>{
    gelirler = Number(localStorage.getItem("gelirler")) || 0
    // gelirinizTd.textContent = new Intl.NumberFormat().format(gelirler)  
    tarihInput.valueAsDate = new Date()
    harcamaListesi = JSON.parse(localStorage.getItem("harcamalar")) || []
    harcamaListesi.forEach((harcama)=>harcamaYaz(harcama))
    hesapla()
})


harcamaFormu.addEventListener("submit", (e)=>{
    e.preventDefault() //reload u önler
    const yeniHarcama = {
        id: new Date().getTime(), //! sistem saatini milisaniye olarak verir
        tarih:new Date(tarihInput.value).toLocaleDateString(),
        miktar: harcamaInput.value,
        alan: harcamaAlaniInput.value

    }
    
    harcamaListesi.push(yeniHarcama)
    console.log(harcamaListesi)
    harcamaFormu.reset()
    tarihInput.valueAsDate = new Date()
    localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi))
    harcamaYaz(yeniHarcama)
    hesapla()
})


const harcamaYaz = ({id, tarih, miktar,alan})=>{
    // const {id, tarih, miktar,alan} = yeniHarcama //data destruction
    // harcamaBody.innerHTML += `
    //         <tr>
    //         <td>${tarih}</td>
    //         <td>${alan}</td>
    //         <td>${miktar}</td>
    //         <td><i id=${id} class="fa-solid fa-trash-can text-danger"  type="button"></i></td>
    //       </tr>
       
    // `

    const tr = document.createElement("tr");

    const appendTd = (content) => {
        const td = document.createElement("td")
        td.textContent = content
        return td
    }

    const createLastTd = () => {
        const td = document.createElement("td")
        const i = document.createElement("i")
        i.id = id;
        i.className = "fa-solid fa-trash-can text-danger"
        i.type = "button"
        td.appendChild(i)
        return td

    }

    tr.append(
        appendTd(tarih),
        appendTd(alan),
        appendTd(miktar),
        createLastTd()
    )

    // harcamaBody.append(tr) //sona ekler
    harcamaBody.prepend(tr) // üste ekler


}


const hesapla = () => {
    const giderler = harcamaListesi.reduce(
        (toplam, harcama)=> toplam + Number(harcama.miktar),0
        )

        // console.log(giderler)
        giderinizTd.textContent = new Intl.NumberFormat().format(giderler)  
        gelirinizTd.textContent = new Intl.NumberFormat().format(gelirler)  
        kalanTd.textContent = new Intl.NumberFormat().format(gelirler - giderler)
        
        const borclu = gelirler - giderler < 0

        kalanTd.classList.toggle("text-danger",borclu)
        document.getElementById("kalanTh").classList.toggle("text-danger",borclu)

}

harcamaBody.addEventListener("click", (e)=>{
    if(e.target.classList.contains("fa-trash-can")){
        e.target.parentElement.parentElement.remove()

        const id = e.target.id
        harcamaListesi = harcamaListesi.filter((harcama)=>harcama.id != id)

        localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi))
        
        hesapla()
    }
})

//! Bilgileri temizle butonu fonksiyonu

temizleBtn.addEventListener("click", ()=>{
    if(confirm("Tüm Bilgileri Silmek İstediğinizden Emin Misiniz?")){
        harcamaListesi =[]
        gelirler = 0
        harcamaBody.innerHTML = ""
        // localStorage.clear()
        localStorage.removeItem("gelirler")
        localStorage.removeItem("harcamalar")
        hesapla()
    }
})






//* projeyule ilgisi yok, quiz soruları çalışması *//
// let x=1;
// function first (){
//     x=2;
//     return function second (y){
//         console.log(y);
//         console.log(x+y);
//     }
// }
// let result = first()
// // result(3)

// first()(3) //! iç içe fonksiyon = function ()()....


//*********

// let person = {name:"Anthony"};
// const instructors = [person]
// console.log(instructors);
// person = null;
// console.log(instructors);

//***** */

// const myFoods = ["1","2","3"];
// let myFovorite = myFoods.some(item => item === "1");
// console.log(myFovorite);
// myFovorite = myFovorite ? "4" : "1"
// console.log(myFovorite);
// const indexFavoruite = myFoods.indexOf("2")
// console.log(indexFavoruite);
// myFoods[indexFavoruite]="5"
// console.log(myFoods);

//** */

//  const myObj ={
//     name:"clarusway",
//     path: "fullstack",
//     module:{
//         frontend:{
//             m1:["html", "css", "react", "Bootstrap"],
//             m2:["react", "tailwindcss", "mui", "ts"],
//         }, 
//         backend :["node", "express"],
//     },
//  };
