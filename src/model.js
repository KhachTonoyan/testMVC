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

function isEmpty(text){
  text.trim()
  if(text) return false
  return true
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
        onInputChange = ({target}) => {
            if(!isEmpty(target.value)){
                clearTimeout(this.intID)
                this.intID = setTimeout(() => this.onSearching(searchCharacter(target.value,this.allCharacters)),300)
            } else if(isEmpty(target.value)){
                this.charactersChange(this.allCharacters)
            }
        }
  }
  