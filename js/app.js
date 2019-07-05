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


    playersCreate () {
        for (let i = 0; i <4; i++){
            this.players.push(new Player(`player${i+1}`))
        }
        console.log(this.players)
    },

    cardsCreate() {

        for( let j = 0; j <4; j++){
            for( let i = 0; i<10; i++){
                this.cards.push(new Card(j))
            }
        }
        console.log(this.cards)
    },
    

    

}

game.playersCreate()
game.cardsCreate()