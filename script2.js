const url=window.location.href;
console.log(url)
async function res() {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const countries = await response.json();
    const data = countries.map((val) => {
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
    return data;
}
let root=null
let country=null
root=document.getElementById("root")
let z=-1;
let values=null
const data=res().then((value)=>{
    // console.log("value",value)
    if(z==-1){
        let text = ``;
        for(let i=0;i<value.length;i++){
            const val=value[i];
            // const path="/"+i+".html" ;
            // console.log("val",val)
            const newCard = `
                <div class="card">
                <button onclick="()=>{z=i}" class="card-1">
                <img src= ${val.Flag2} alt="reload">
                </button>
                <div class="card-2">
                    <h2>${val.Name}</h2>
                    <p>Population: ${val.Population}</p>
                    <p>Region: ${val.Region}</p>
                    <p>Capital: ${val.Capital}</p>
                </div>
                </div> `
            text += newCard;

        }  
        // console.log("text",text)
         root.innerHTML = text;
         values=value
    }else{
        // const file=url.split("/")[3]
        // const i=file.split(".")[0]
        // console.log("i",i)
        

    }
    
})
// while(true){
    if(z!=-1){
        const val=values[z];
        const newCard = `
                <div class="card">
                <button onclick="">
                <img src= ${val.Flag2} alt="reload">
                </button>
                <div class="card-2">
                    <h2>${val.Name}</h2>
                    <p>Population: ${val.Population}</p>
                    <p>Region: ${val.Region}</p>
                    <p>Capital: ${val.Capital}</p>
                </div>
                </div> `
                root.innerHTML = newCard;
    }
}
