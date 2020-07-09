const modal = document.getElementById("myModal");

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    modal.innerHTML = "";
  }
}

function charactersChange(characters){
  const div = document.createElement("div")
  div.classList.add("list")
  return getCharactersHTML(characters,div)
}

const getCharactersHTML = (characters,div) => (
  characters.reduce((acc,character)=>{
    const child = document.createElement("div")
    child.onclick = () => openModal(character)
    child.innerHTML = `
      <p>Name: ${character.name}</p>
      <img src=${character.image}>`;
    acc.appendChild(child)
    return acc
  },div)
)

function openModal(character){
    modal.style.display = "block"
    const modalContent = document.createElement("div")
    modalContent.classList.add("modal-content")
    modalContent.innerHTML = `
      <p>Name: ${character.name}</p>
      <p>Status: ${character.status}</p>
      <p>Species: ${character.species}</p>
      <p>Episodes count: ${character.episode}</p>
      <p>Gender: ${character.gender}</p>`;
    modal.appendChild(modalContent)
}

 export default class View {
    constructor() {
      this.app = document.getElementById("app")
      this.input = document.getElementById("myInput")
    }
    onCharactersChange = characters => {
      this.app.innerHTML = "";
      this.app.appendChild(charactersChange(characters))
    }
    bindOnInputChange = fn => {
      this.input.onkeyup = fn;
    }
  }
  