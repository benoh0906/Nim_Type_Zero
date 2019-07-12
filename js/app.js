function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// let time = null

function intervalFunc(num){
    let i = num
    if(i===1 || i===2 ){
        $(`#dont`).show()
        
    } 
    game.highlight()
    time = setInterval(()=>{
        game.compPlay(i)
        game.highlight()

        if (i === 3 || game.cumulative>=10){
            $(`#dont`).hide()
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

function conspireAI(index){
    if (index===1){
        const p4WinHigh=[]
        const p4WinMid=[]
        const p4WinLow=[]
        const p4Lose=[]


        for(let i = 0; i < game.players[index].hand.length;i++){
            const usedOrNotCons1=document.querySelector(`#p${index+1}Card`).childNodes[i].src

            if(usedOrNotCons1 ==="file:///Users/jungbinoh/sei-autumn-sweaters/nim_type_zero/css/img/card/back.jpg"){
                if (game.players[index].hand[i]+3+game.cumulative < 10){
                    p4WinHigh.push([game.players[index].hand[i],i])

                } else if (game.players[index].hand[i]+2+game.cumulative < 10) {

                    p4WinMid.push([game.players[index].hand[i],i])

                } else if(game.players[index].hand[i]+1+game.cumulative < 10){
                    p4WinLow.push([game.players[index].hand[i],i])
                } else {
                    p4Lose.push([game.players[index].hand[i],i])
                }
        
            }
        }

        if(p4WinHigh.length>=1){
            return p4WinHigh[0][1]
        } else if (p4WinMid.length>=1){
            return p4WinMid[0][1]
        } else if (p4WinLow.length>=1){
            return p4WinLow[0][1]
        } else {
            return p4Lose[0][1]
        }

    } else {
        const win = []
        const lose=[]
        
        for(let i = 0; i < game.players[index].hand.length;i++){
            const usedOrNotCons2=document.querySelector(`#p${index+1}Card`).childNodes[i].src
            if(usedOrNotCons2 ==="file:///Users/jungbinoh/sei-autumn-sweaters/nim_type_zero/css/img/card/back.jpg"){
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
}




class Player {
    constructor(){
        this.name='';
        this.hand=[];
        this.used=[];
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
    roundCount:0,
    totalRound:0,
    loser:0,

    


    playersCreate () {
        for (let i = 0; i <4; i++){
            this.players.push(new Player())
        }
        console.log(this.players)
    },

    reName (){
        this.players[0].name='Q'
        this.players[1].name='Cassel'
        this.players[2].name='Damon'
        this.players[3].name='Mikkelsen'
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
                    $(`#p${j+1}Card`).append(`<img class='playOrNot' width="70" height="90" src="css/img/card/${this.players[j].hand[i]}.png">`)
                } else {
                    $(`#p${j+1}Card`).append(`<img width="70" height="90" src="css/img/card/back.jpg">`)
                }
            }
        }
    },




    revealCards(i,turn) {
        document.querySelector(`#p${i+1}Card`).childNodes[turn].src=`css/img/card/${this.players[i].hand[turn]}.png`;
    },



    playCards(serial,index){
        this.cumulative+=this.players[serial].hand[index]
        if (game.turnCount===3){
            game.turnCount=0
    
        } else{
            game.turnCount+=1
        }
        $(`.total`).html(`${this.cumulative}`)
        

        if(this.cumulative>=10){
            this.loser=(serial)
            console.log(this.players[serial].name+' lost!')
            $(`.whoOne`).text(`${this.players[serial].name} lost!`)
            $(`.regameModal`).show()
            game.scoreBoard()
            clearInterval(time);
            return true
        }
    },



    mePlay(){
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

            console.log(`comPlay activated`)
            let cardSelect = conspireAI(i)
            game.playCards(i,cardSelect);
            game.revealCards(i,cardSelect)
        }
    },

    highlight(){
        $(`.mugshot`).css(`border`,`none`)
        $(`#player${game.turnCount+1}`).css(`border`,`3px solid yellow`)
    },

    roundLocator(){
        if (this.roundCount===0){
            this.highlight()
            this.mePlay()
                
        } else if (this.roundCount===1){
            for (let i = 0; i <2;i++){
                if(i===0){
                    intervalFunc(1)
                } else{
                    this.highlight()
                    this.mePlay()
                }
            }

        } else if (this.roundCount===2){
            for (let i = 0; i <2;i++){
                if(i===0){
                    intervalFunc(2)
                } else{
                    this.highlight()
                    this.mePlay()
                }
            }
            
        } else if (this.roundCount===3){
            for (let i = 0; i <2;i++){
                if(i===0){
                    intervalFunc(3)
                } else{
                    this.highlight()
                    this.mePlay()
                }
            } 
        }
    },

    scoreBoard() {
        $(`#currentRound`).text(`Round ${this.totalRound+1}`)
        for(let i = 0; i<4;i++){
            $(`#p${i+1}Name`).text(`${this.players[i].name}`)
            $(`#p${i+1}won`).text(`Win: ${this.players[i].win}`)
            $(`#p${i+1}lost`).text(`Loss: ${this.players[i].loss}`)
        }    
        if(this.totalRound===8){
            if(this.players[0].win>this.players[1].win &&this.players[0].win>this.players[2].win&&this.players[0].win>this.players[3].win){
            $(`.gameOverModal`).show()
            $(`#result`).html('Mission complete! <br>You won!')
            return 
            
            } else {
                $(`.gameOverModal`).show()

                $(`#result`).html(`Mission failure!<br>Mafias used the prize money to <br>expand their dark businesses.`)
                return

            }
        }
        
    },

    reset(){

        this.cumulative=0;
        this.cards=[]
        this.gilbreathDeck=[]
        this.finalDeck=[]
        this.turnCount=this.roundCount;
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

        game.roundLocator()

    }


}


$(`.tempRuleModal`).hide()
$(`.gameOverModal`).hide()
$(`.turnModal`).hide()

$(`.regameModal`).hide();
$(`.convinceModal`).hide();
$(`.scoreBoard`).hide();
$(`#showRule`).hide()
$(`.cardTable`).hide()
$(`header`).hide()
$(`.ruleModal`).hide()

$(`#dont`).hide()

$(`.startModal`).hide()

$(`.storyModal`).hide()


$(`#page1`).on('click', () =>{
    $(`.introModal`).hide()
    $(`.storyModal`).show()
})

$(`#skip`).on('click', ()=>{
    $(`.introModal`).hide()
    $(`.startModal`).show()
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
    $(`#showRule`).show()
    $(`.cardTable`).show()
    $(`header`).show()
    
    game.playersCreate()
    game.reName()
    game.cardsCreate()
    game.gilbreathCreate()
    game.gilbreathShuffle()
    game.distributeCards()

    game.roundLocator()
})

$(`#showRule`).on(`click`,()=>{
    $(`.tempRuleModal`).show()
})

$(`#ruleClose`).on(`click`,()=>{
    $(`.tempRuleModal`).hide()
})

$(`#page4`).on(`click`, ()=>{
    $(`.startModal`).hide()
    $(`.ruleModal`).show()
})

$(`#retry`).on(`click`,()=>{
    location.reload()
})

$(`.continueBtn`).on(`click`,()=>{
    $(`.regameModal`).hide()
    game.players[game.loser].loss+=1

    for (let i = 0; i <4; i++){
        if (i !== game.loser){
            game.players[i].win+=1
        }
    }
    game.totalRound+=1

    if (game.roundCount===3){
        game.roundCount=0

    } else{
        game.roundCount+=1
    }
    game.reset()

})

$(`#player3`).on('click',()=>{
    $(`.convinceModal`).show()
})

$(`#helpSubmit`).on(`click`,()=>{
    console.log('helpsubmit works')
    if ($(`#helpMe`).val()==='sos'){
        // $(`.convinceModal`).hide()
        let briber=[]
        for (let i = 0; i<4;i++){
            $(`#challenge1`).text('Damon: You better win')
            $(`#helpMe`).hide()
            $(`#helpSubmit`).hide()
            $(`.convince`).append(`<img class="leak" width="70" height="90" src="css/img/card/${game.players[2].hand[i]}.png">`)
            
        }
        $(`.convince`).append(`<button id='iWill'>Thank You</button>`)
    }
    $(`#iWill`).on(`click`,()=>{
        $(`.convinceModal`).hide()
    })
})

