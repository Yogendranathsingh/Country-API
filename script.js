const input = document.querySelector('input');
root = document.getElementById("root");
const tagRegions = document.querySelector('#regions');

let Data;
const url=window.location.href

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
        <button onclick="">
        <a href="page2.html?Name=${val.Name}"  class="card-1">
        <img src= ${val.Flag2} alt="reload"></a>
        </button>
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
    })
}

foo();


