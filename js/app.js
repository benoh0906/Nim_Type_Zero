function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }


class Player {
    constructor(name){
        this.name=name;
        this.hand=[];
        this.score=0;
        this.turn=0;
    }
}

class Card {
    constructor(value){
        this.value=value
    }
}

const game = {
    cumulative: 0,
    players: [],
    cards:[],
    gilbreathDeck:[],
    finalDeck:[],
    


    playersCreate () {
        for (let i = 0; i <4; i++){
            this.players.push(new Player(`player${i+1}`))
        }
        console.log(this.players)
    },

    cardsCreate() {

        for( let j = 0; j <4; j++){

            
            for( let i = 0; i<6; i++){
                this.cards.push(new Card(j))
            }
        }
        console.log(this.cards)
    },

    gilbreathCreate(){

        for( let j = 0; j <4; j++){
            
            for( let i = 0; i<4; i++){
                this.gilbreathDeck.push(new Card(j))
            }
        }
        console.log(this.gilbreathDeck)
    },

    gilbreathShuffle(){
        let shuffleGil = shuffle(this.gilbreathDeck)
        let shuffleCard= shuffle(this.cards)
        this.finalDeck=this.gilbreathDeck.concat(this.cards)
        // this.finalDeck.push(shuffle(this.gilbreathDeck))
        // this.finalDeck.push(shuffle(this.cards))
        console.log(this.finalDeck)
    },

    distributeCards () {

        for (let i = 0; i < 16; i++){
            if(i>=0 && i<4){
                this.players[0].hand.push(this.finalDeck[i].value)
            } else if(i>=4 && i<8){
                this.players[1].hand.push(this.finalDeck[i].value)
            } else if(i>=8 && i<12){
                this.players[2].hand.push(this.finalDeck[i].value)
            } else {
                this.players[3].hand.push(this.finalDeck[i].value)
            }
        }
        console.log(this.players)
    },

    playCard() {
    
    }


    





    

}

game.playersCreate()
game.cardsCreate()
game.gilbreathCreate()
game.gilbreathShuffle()
game.distributeCards()