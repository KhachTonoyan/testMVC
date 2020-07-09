function getCharacters(){
 return fetch("https://rickandmortyapi.com/api/character/")
          .then(data => data.json())          
          .then(({results}) => (
            results.map(character => {
            character.episode = character.episode.length;
            delete character.location;
            delete character.origin;
            return character
            })
          ))
}

export default class Model {
      constructor(){
        this.characters = []
        }   

        init = () => {
              getCharacters().then(this.charactersChange)
        }
        charactersChange = (characters) => {
            this.characters = characters;
            this.onCharactersChange(characters)
        }
        bindOnCharactersChange(fn){
          this.onCharactersChange = fn;
        }
  }
  