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
        this.canSearch = true;
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
        onSearch = event => {
          event.preventDefault()
          if(event.target["childNodes"][1].value.trim() !== "" && this.canSearch){
            this.canSearch = false;
            this.onSearching(searchCharacter(event.target["childNodes"][1].value,this.allCharacters));
            setTimeout(() => this.canSearch = true,1500)
          }
        }
        onInputChange = event => {
          if(event.target.value.trim() !== "" && this.canSearch){
            this.canSearch = false;
            this.onSearching(searchCharacter(event.target.value,this.allCharacters));
            setTimeout(() => this.canSearch = true,1500)
          }else if(event.target.value.trim() === ""){
            this.charactersChange(this.allCharacters)
          }
        }
  }
  