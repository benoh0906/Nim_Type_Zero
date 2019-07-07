function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }


class Player {
    constructor(name){
        this.name=name;
        this.hand=[];
        this.win=0;
        this.loss=0;
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
    turnCount:0,

    


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
                this.players[0].hand.sort()
            } else if(i>=4 && i<8){
                this.players[1].hand.push(this.finalDeck[i].value)
                this.players[1].hand.sort()
            } else if(i>=8 && i<12){
                this.players[2].hand.push(this.finalDeck[i].value)
                this.players[2].hand.sort()
            } else {
                this.players[3].hand.push(this.finalDeck[i].value)
                this.players[3].hand.sort()
            }
        }
        console.log(this.players)

        for(let j = 0; j<4;j++){
            for(let i = 0; i<4; i++){
                if(j===0){
                    $(`#p${j+1}Card`).append(`<img width="70" height="90" src="css/img/card/${this.players[j].hand[i]}.png">`)
                } else {
                    $(`#p${j+1}Card`).append(`<img width="70" height="90" src="css/img/card/back.jpg">`)
                }
            }
        }

        
    },

    revealCards(turn) {

        for( let i = 1; i< 4 ; i++){
            // $(`#p${i+1}Card`).eq(turn).replace(`<img width="70" height="90" src="css/img/card/${this.players[i].hand[turn]}.png">`)
            // $(`#p${i+1}Card`).prepend(`<img width="70" height="90" src="css/img/card/${this.players[i].hand[turn]}.png">`)

            // $(`#p${i+1}Card`).eq(turn).replace(`<img width="70" height="90" src="css/img/card/back.jpg">`,`<img width="70" height="90" src="css/img/card/${this.players[i].hand[turn]}.png">`)
            // console.log($(`#p${i+1}Card`).eq(turn).src())
            // $(`#p${i+1}Card`).eq(0).attr('src')
            // $(`#p${i+1}Card`).eq(turn).append(`<img width="70" height="90" src="css/img/card/${this.players[i].hand[turn]}.png">`)
            document.querySelector(`#p${i+1}Card`).childNodes[turn].src=`css/img/card/${this.players[i].hand[turn]}.png`;

        }

        
    },

    playCards(serial,index){
        this.cumulative+=this.players[serial].hand[index]

        $(`.total`).html(`${this.cumulative}`)
        console.log(this.cumulative)

    

        if(this.cumulative>=9){
            $(`.total`).html(`${this.players[serial].name} lost!`)
            console.log(this.players[serial].name+' lost!')
            this.players[serial].loss+=1

            for (let i = 0; i <4; i++){
                if (i !== serial){
                    this.players[i].win+=1
                }
            }
            
        }
    }

}



game.playersCreate()
game.cardsCreate()
game.gilbreathCreate()
game.gilbreathShuffle()
game.distributeCards()

$p1Card=$(`#p1Card`);
$p1Card.on('click',(e)=>{
    game.playCards(0,$(e.target).index())
    game.players[0].turn+=1
    $(e.target).css('opacity','0.5')


    for (let i=1;i<4;i++){
        if(game.cumulative <9){
            game.playCards(i,game.turnCount);

        }
    }
    game.revealCards(game.turnCount)
    game.turnCount+=1;

});

$(`body`).on(`click`,(e) =>{
    console.log($(e.target).index())
})