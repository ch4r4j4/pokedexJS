//primeros pasos
const listapokemon = document.querySelector('#listapokemon');

const botonesheader = document.querySelectorAll('.btn-header')

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <=151; i++) {
    fetch(URL + i)
    .then((response) => response.json())
    .then(data => mostrarPokemon(data))
}


function mostrarPokemon(poke){

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId= poke.id.toString();
    if(pokeId.length ===1){
        pokeId = `00${pokeId}`;
    }else if(pokeId.length ===2){
        pokeId = `0${pokeId}`;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <p class="pokemon-idback">#${pokeId}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipo">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat altura">${poke.height}m</p>
            <p class="stat peso">${poke.weight}kg</p>
        </div>
    </div>
    `;
    listapokemon.append(div);
}

botonesheader.forEach(boton => boton.addEventListener("click", (event)=>{
    const botonId = event.currentTarget.id;
    listapokemon.innerHTML = "";
    for (let i = 1; i <=151; i++) {
        fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            if(botonId === "ver-todos"){
                mostrarPokemon(data);
            }else{
                const tipos = data.types.map(type => type.type.name)
                if(tipos.some(tipo => tipo.includes(botonId))){
                    mostrarPokemon(data)
                }
            }
        })
    }
}))

/*tenemos que agregar muchas as funcionalidades a este rpograma de ahi vamos con lo del DOM de manera intensa y de ahi ya nos vamos a la parte de react
solo vaoms a agregar las primera funcionalidades a este programa 
*/