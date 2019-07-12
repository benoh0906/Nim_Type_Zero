## Nim Type Zero

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


- According to the rule, four players take turns to start the round because the starting player has higher change of winning the game.
- the roundCount constructor in the game object keeps track of which player to start the game for each round.



## Human-like Mafia Bosses

- This game attempts to add the human attributes to mafia bosses which are essentially the computer
- 



