const input = document.querySelector('input');
root = document.getElementById("root");
const tagRegions = document.querySelector('#regions');
const body=document.querySelector("body")

let Data;
console.log(body.classList);
let isDarkMode=body.classList.value.search('dark-mode-1');
const url=window.location.href

let filteredData=[]

async function foo() {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const countries = await response.json();

    Data = countries.map((val) => {
        const { name, flags, capital, region, population } = val;

        return {
            Name: name.common,
            Flag1: flags.png,
            Flag2: flags.svg,
            Capital: capital ? capital[0] : 'Unknown',
            Region: region,
            Population: population
        };
    });


    // Data.splice(3, 247);
    let regions = new Set()
    Data.forEach((val) => {
        regions.add(val.Region)
    })

    regions.forEach((val, ind) => {
        let option = document.createElement('option')
        option.value = val;
        option.innerHTML = val;
        tagRegions?.appendChild(option);
    })
    let currRegion = "";


    let filteredData = Data.slice()
    let tempFilteredData = Data.slice()
    
    function updateHTML() {
        let text = ``;
        filteredData?.forEach((val, index) => {
            if (val == undefined) {
             
            }
            const newCard = `
        <div class="card">
        <div class="card-1">
        <a href="page2.html?Name=${val.Name}&isDarkMode=${isDarkMode}">
        <img src= ${val.Flag2} alt="reload"></a>
        </div>
        <div class="card-2">
            <h2>${val.Name}</h2>
            <p>Population: ${val.Population}</p>
            <p>Region: ${val.Region}</p>
            <p>Capital: ${val.Capital}</p>
        </div>
        </div>
        `
            text += newCard;
        });
        root.innerHTML = text;

    }
    updateHTML()
    if(isDarkMode!=-1) adm()

    let val = "";
    input.addEventListener('input', (e) => {

        val = e.target.value.toLowerCase()
        filteredData = []
        filteredData = Data.filter((element) => {
            element.Name = element.Name.toLowerCase()
            return element.Name.includes(val)
        })

        if (currRegion != "") {
            let newData = [];
            newData = filteredData.filter((element) => element.Region == currRegion || currRegion=="All")
            filteredData = newData
        }
        updateHTML()
        if(isDarkMode!=-1) adm(),updateHTML()
    })


    tagRegions.addEventListener('change', (e) => {
        currRegion = e.target.value
        let newData = [];
        newData = Data.filter((element) => element.Region == currRegion || currRegion=="All")
        if (val != "") {
            filteredData = []
            filteredData =newData.filter((element) => {
                element.Name = element.Name.toLowerCase()
                return element.Name.includes(val)
            })
        }
        else filteredData=newData
        updateHTML()
        if(isDarkMode!=-1) adm()
    })
}

foo();


function adm(){
    const body=document.querySelector('body')
    const cards=document.querySelectorAll('.card')
    const card2s=document.querySelectorAll('.card-2')
    const as= document.querySelectorAll('a')

    cards.forEach((card)=>{
        card.classList.add('dark-mode-2')
        })
        
        card2s.forEach((card2)=>{
        card2.classList.add('dark-mode-2')
        })
        
        as.forEach((a)=>{
        a.classList.add('dark-mode-1')
        })
        body.classList.add('dark-mode-1')
        isDarkMode=body.classList.value.search('dark-mode-1');
        console.log("isDarkMode ",isDarkMode)

}

function rdm(){
    const body=document.querySelector('body')
    const cards=document.querySelectorAll('.card')
    const card2s=document.querySelectorAll('.card-2')
    const as= document.querySelectorAll('a')

    cards.forEach((card)=>{
        card.classList.remove('dark-mode-2')
        })
        
        card2s.forEach((card2)=>{
        card2.classList.remove('dark-mode-2')
        })
        
        as.forEach((a)=>{
        a.classList.remove('dark-mode-1')
        })
        body.classList.remove('dark-mode-1')
        isDarkMode=body.classList.value.search('dark-mode-1');
}

function tdm(){
if(isDarkMode==-1){
  adm()
  foo()
}
else rdm();
}



