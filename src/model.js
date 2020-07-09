function getCharacters(){
 return fetch("https://rickandmortyapi.com/api/character/")
          .then(data => data.json())          
          .then(({results}) => (
            results.map(character => {
            character.episode = character.episode.length;
            delete character.location;
            delete character.origin;
            character.id = character.name.replace(/\s/g, '').trim().toLowerCase()
            return character
            })
          ))
}
function searchCharacter(text,characters){
        text = text.replace(/\s/g, '').trim().toLowerCase()
          return characters.filter(item => (
            item.id.match(text)
          ))
}

export default class Model {
      constructor(){
        this.allCharacters = [];
        this.searchingCharacters = [];
        this.intID = 0;
        }   

        init = () => {
              getCharacters().then(this.charactersChange)
        }
        charactersChange = (characters) => {
            this.allCharacters = characters;
            this.onCharactersChange(characters)
        }
        onSearching(characters){
          this.searchingCharacters = characters;
          this.onCharactersChange(characters)
        }
        bindOnCharactersChange(fn){
          this.onCharactersChange = fn;
        }
        onInputChange = event => {
          if(event.target.value.trim() !== ""){
            clearTimeout(this.intID)
            this.intID = setTimeout(() => this.onSearching(searchCharacter(event.target.value,this.allCharacters)),300)
          }else if(event.target.value.trim() === ""){
            this.charactersChange(this.allCharacters)
          }
        }
  }
  