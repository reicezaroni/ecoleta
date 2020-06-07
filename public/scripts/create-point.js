
function populateUFs(){
    const ufSelect =document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json() })
    .then(states =>{

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect =document.querySelector("[name=city]")
    const stateInput =document.querySelector("[name=state]")


    const ufValue = event.target.value

    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    //limpar o query das cidades anteriores
    citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
    citySelect.disabled = true

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then((res) => {return res.json() })
    .then(cities =>{

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



//itens de coleta
//pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

//atualizar o campo escondido com o item selecionado
const collectedItems =  document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    //add ou temover uma classe com JS
   const itemLi = event.target
   itemLi.classList.toggle("selected")
   
   //itemID recebe o valor de 1 a 6 caso o evento ocorra ao clicar nos item
    const itemID = event.target.dataset.id

    //verificar se existems itens selecionados
    //se sim, pegá-los
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemID //vai procurar em selectedItem se item tem o mesmo valor, se for retorna true ou false
        return itemFound
        // item => item == itemID se deixar so isso funciona igual
    })

    //se ja estiver selecionado, tirar da selção
    if(alreadySelected != -1){
        const filteredItems = selectedItems.filter(item => item != itemID)//caso for diferente do itemID ele retorna falso, e não faz o filtro
        selectedItems = filteredItems
    } else[ //se nao estiver, adicionar a seleção
        selectedItems.push(itemID)
    ]

    //atualizar o campo escondido
    collectedItems.value =selectedItems

}


