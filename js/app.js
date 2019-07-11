function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

let time = null

function intervalFunc(num){
    let i = num
        time = setInterval(()=>{
            game.compPlay(i)
            if (i === 3 || game.cumulative>=10){
                clearInterval(time)
            }
            else{
                i++
            }
        }, 1000)
}

function compAI(index){

    const win = []
    const lose=[]
    
    for(let i = 0; i < game.players[index].hand.length;i++){
        const usedOrNot=document.querySelector(`#p${index+1}Card`).childNodes[i].src
        if(usedOrNot ==="file:///Users/jungbinoh/sei-autumn-sweaters/nim_type_zero/css/img/card/back.jpg"){
            if (game.players[index].hand[i]+game.cumulative < 10){
                win.push([game.players[index].hand[i],i])

            } else {

                lose.push([game.players[index].hand[i],i])

            }
        }
    }

    if(win.length>=1){

        return win[0][1]

    } else{

        return lose[0][1]

    }
}




class Player {
    constructor(name){
        this.name=name;
        this.hand=[];
        this.used=[];
        this.win=0;
        this.loss=0;
        this.turn=0;
        this.ally=false;
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
    roundCount:0,

    


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
    },

    gilbreathCreate(){

        for( let j = 0; j <4; j++){
            
            for( let i = 0; i<4; i++){
                this.gilbreathDeck.push(new Card(j))
            }
        }
    },

    gilbreathShuffle(){
        let shuffleGil = shuffle(this.gilbreathDeck)
        let shuffleCard= shuffle(this.cards)
        this.finalDeck=this.gilbreathDeck.concat(this.cards)

    },

    distributeCards () {

        for (let i = 0; i < 16; i++){
            if(i>=0 && i<4){
                this.players[0].hand.push(this.finalDeck[i].value)
                this.players[0].hand.sort()
            } else if(i>=4 && i<8){
                this.players[1].hand.push(this.finalDeck[i].value)
                this.players[1].hand.sort()
                this.players[1].hand.reverse()
            } else if(i>=8 && i<12){
                this.players[2].hand.push(this.finalDeck[i].value)
                this.players[2].hand.sort()
                this.players[2].hand.reverse()
            } else {
                this.players[3].hand.push(this.finalDeck[i].value)
                this.players[3].hand.sort()
                this.players[3].hand.reverse()
            }
        }

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

    // decideTurn () {
    //     for( let i = 0; i<4; i++){
    //         $(`.cardBack`).append(`<img data-index=${i} width="100" height="130" src="css/img/card/back.jpg">`)
    //     }
    //     let rndArray=shuffle([0,1,2,3])
    //     let myOrder=0
    //     console.log(rndArray)
    //     $(`.cardBack`).on('click', (e)=>{
    //         const ind = $(e.target)[0].dataset.index
    //         $(e.target).attr('src',`css/img/card/${rndArray[ind]}.png`)
    //         myOrder=parseInt(rndArray[ind])
    //         console.log(myOrder)
    //     })

    // },



    revealCards(i,turn) {


        document.querySelector(`#p${i+1}Card`).childNodes[turn].src=`css/img/card/${this.players[i].hand[turn]}.png`;
    
    
    },

    playCards(serial,index){
        this.cumulative+=this.players[serial].hand[index]

        $(`.total`).html(`${this.cumulative}`)



        if(this.cumulative>=10){
            console.log(this.players[serial].name+' lost!')
            this.players[serial].loss+=1

            for (let i = 0; i <4; i++){
                if (i !== serial){
                    this.players[i].win+=1
                }
            }

            
            $(`.whoOne`).text(`${this.players[serial].name} lost!`)
            $(`.regameModal`).show()
            game.scoreBoard()
            if (this.turnCount===3){
                this.turnCount=0
                this.roundCount+=1

            } else{
                this.turnCount+=1
            }

            clearInterval(time);
            return true
            
        }
    },


    mePlay(){
        console.log('mePlay starts')

        $p1Card=$(`#p1Card`);
        $p1Card.on('click',(e)=>{

        if($(e.target).css('opacity')!=0.5) {
           if(game.playCards(0,$(e.target).index())) {
               return 
           } else {
                $(e.target).css('opacity','0.5')
                intervalFunc(1)
           }
            


        


        console.log('interval starts')

        

        
        
    }
    })
    

    }, //end of meplay
        
    

    compPlay(i){
        if(game.cumulative <10){
            // $(`profile`).css('border','none')
            // $(`#player${i}`).css('border','3px solid yellow')

            console.log(`comPlay activated`)
            let cardSelect = compAI(i)
            game.playCards(i,cardSelect);
            game.revealCards(i,cardSelect)
        }
    },

    turnLocator(){

        if (this.turnCount===0){
            console.log(`turn 1 starts`)

            this.mePlay()
                
        } else if (this.turnCount===1){
            console.log(`turn 2 starts`)


            console.log('turn 2 interval starts')

            intervalFunc(1)
            this.mePlay()

            

        } else if (this.turnCount===2){

            intervalFunc(2)
            this.mePlay()

            

        } else if (this.turnCount===3){

            intervalFunc(3)
            this.mePlay()


            
            
        }
    },

    scoreBoard() {
        for(let i = 0; i<4;i++){
            $(`#p${i+1}Name`).text(`${this.players[i].name}`)
            $(`#p${i+1}won`).text(`Win: ${this.players[i].win}`)
            $(`#p${i+1}lost`).text(`Loss: ${this.players[i].loss}`)
        }    
        if(this.players[1].win===8 || this.players[2].win===8 ||this.players[3].win===8){
            $(`.gameOverModal`).show()
            $(`#result`).text('Mission failure!')
            $(`#regame`).on(`click`,()=>{
                location.reload()
            })
        } else if(this.players[0].win===8 ) {
            $(`.gameOverModal`).show()
            $(`#result`).text('Mission complete!')
            $(`#regame`).on(`click`,()=>{
                location.reload()
            })
        }
        
    },
        



    reset(){

        this.cumulative=0;
        this.cards=[]
        this.gilbreathDeck=[]
        this.finalDeck=[]
        $(`.total`).html(`${this.cumulative}`)

        for(let i = 0; i<4; i++){
            game.players[i].hand=[];
            game.players[i].used=[];
            $(`.p${i+1}`).empty()
        }

        game.scoreBoard()
        game.cardsCreate()
        game.gilbreathCreate()
        game.gilbreathShuffle()
        game.distributeCards()

        game.turnLocator()

    }


}

// game.decideTurn();
$(`.gameOverModal`).hide()
$(`.turnModal`).hide()

$(`.regameModal`).hide();

$(`.scoreBoard`).hide();
$(`.cardTable`).hide()
$(`header`).hide()
$(`.ruleModal`).hide()


$(`.startModal`).hide()

$(`.storyModal`).hide()


$(`#page1`).on('click', () =>{
    $(`.introModal`).hide()
    $(`.storyModal`).show()
})



$(`#page2`).on(`click`, ()=>{
    $(`.storyModal`).hide()
    $(`.ruleModal`).show()
})

$(`#backTo1`).on('click',()=>{
    $(`.storyModal`).hide()
    $(`.introModal`).show()
})



$(`#page3`).on(`click`, ()=>{
    $(`.ruleModal`).hide()
    $(`.startModal`).show()
})

$(`#backTo2`).on(`click`, ()=>{
    $(`.ruleModal`).hide()
    $(`.storyModal`).show()
})


$(`#start`).on('click',e=>{
    $(`.startModal`).hide()
    $(`.scoreBoard`).show();
    $(`.cardTable`).show()
    $(`header`).show()
    
    game.playersCreate()
    game.cardsCreate()
    game.gilbreathCreate()
    game.gilbreathShuffle()
    game.distributeCards()

    game.turnLocator()
})

$(`#page4`).on(`click`, ()=>{
    $(`.startModal`).hide()
    $(`.ruleModal`).show()
})

$(`.continueBtn`).on(`click`,()=>{
    $(`.regameModal`).hide()
    game.reset()

})



