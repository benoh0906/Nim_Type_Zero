## Nim Type Zero

[Play Nim Type Zero](https://pages.git.generalassemb.ly/benoh0906/nim_type_zero/l)

### Rule

1. The game is played with a deck of 40 cards, labeled with number 0, 1, 2, 3.
2. The deck is shuffled using Gilbreath Shuffle 
3. 4 cards are dealt to each player.
4. The game starts with each player having four cards in their hand not revealed to their opponents.
5. The players play 8 rounds, and the starting player changes every turn
6. At a player's turn, one must play a card from their hand by declaring its number and placing it down on the table.
7. The card's value is added to the total value.
8. If the player adds the card that makes the total value exceeding 9, the player loses the round.


Gilbreath shuffle

- A way to shuffle decks that ensures that with a deck of 4 different suits, each 4 cards will always feature all suits.
- Since the suits in this game are instead the values 0, 1, 2, 3 in simple terms it means that in every game there were a total of four of each number, redistributed randomly. 


### User journey

**Story:**

- The player's goal is to prevent the evil mafia bosses from earning the prize money from the gambling tournament
- The player is called Agent Q, playing against three mafia family bosses called Cassel, Damon, and Mikkelsen
- The game that the gamblers will play is called Nim Type Zero, which the player has to win in order to stop the evil mafia bosses
- The player's mission is to win the competition in order to prevent madia families from expanding their business

**Tutorial:**

- Tutorial of how to play the game
    - Modals with an arrow to flip the page
    - Skip button below to head straight to the game


**Game Page template:**

Scoreboard

- Displays how many wins and losses all players have
- Displays the current round

Rule Button

- When the player clicks the button, the rule modal shows up again
- By clicking the close button, the player can close the rule page 


Player Profile

- The profile at the bottom of the page represents the player's picture and cards on hand
- By clicking the card image, the player can submit that card one desires to play
- While other players play the card, the player cannot click the card image by blocking the card section with a box of div

	- HTML:
```
<div id="dont"> </div>
```

	* CSS:

```
#dont{
    position: relative;
    width: 280px;
    height: 85px;
    background-color: rgba(255, 255, 255, 0);
    top: -20rem;
    left: 5rem;
	}
```

### Game Play

**Class Players**

```
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
```

The class Player contains constructors that are necessary to play the game.

- this.hand

	- contains the card that is distributed to player for each round


- this.win/this.loss
	- help the scoreboard to keep track of the game status

	

**Game Object**

```
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
    .
    .
    .
```

- The game invokes methods in the game object in order to facilitate the gaming algorithms.

- The game object creates players, cards, shuffle cards, distribute, and determines the winner/loser of the game.


**Rotation algorithm**

```
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
    }
```


According to the rule, four players take turns to start the round because the starting player has higher change of winning the game.

roundLocator() method in the game object verifies the order.

- this.roundCount ()
	- keeps track of which player to start the game for each round.

- this.highlight ()
	- higlights the profile of the player that player the game

```
highlight(){
        $(`.mugshot`).css(`border`,`none`)
        $(`#player${game.turnCount+1}`).css(`border`,`3px solid yellow`)
    },
```


## Human-like Mafia Bosses

This game attempts to add the human attributes to mafia bosses which are essentially the computer

**game.playCards**

```
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
    }
```
The method that adds the card's value to the center of the game.

Keeps track of the turn of the game to define whose turn was it to play.

If somebody adds the card value that makes the total value exceeding 9, this method declares the player as the looser.

- parameters
	- serial: the index number of the player in the players array
	- index: the type of card that the player adds to the total value


**Interval Func**

```

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
```
- Slows down the pace of the mafia bosses playing the game so the player can keep track of the game flow like a real card game


**Conspire AI**

```

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
```

The algorithm that determines what card the mafia boss has to play in order for them to win the game.

The algorithm accepts the list of cards on hand as the prameters.

Adds the value of the card on their hand to the current total value, and categorize them as winning or losing card array.

However, Cassel is made in a way that helps Mikkelson to win. Therefore, he will not play the card that can potentially lead Mikkelson to loose. He does so by categorizing his cards into the level of danger that can be posed to Mikkelson.


**Ask for Help**

```

$(`#player3`).on('click',()=>{
    $(`.convinceModal`).show()
})

$(`#helpSubmit`).on(`click`,()=>{
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
```


The player can ask for help to Damon.

When the player clicks the profile of Damon, the player at the top side of the table, the modal shows up that receives the string input value.

When the player types 'sos' in the input and click the button, Damon will display what card he has.




