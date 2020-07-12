# ticTacToe
    * Fortunately I didn't see any requirement of using any 3rd party library outside node
    * Coming towards logic
        * I have used Single responsibility principle in all over the project
        * Every function and variable names are chosen in a sensible manner
        * Together, I have provided a comment on every function.
    
    # Note
        * User Symbol : 'X'
        * Bot/Computer Symbol : 'o'

    # Algo behind choosing the place number by the bot goes like:
        * First it will check, is there any possibility where bot can win the game
        * Else, is there any possibilty where use is gonna win the game, stop him from win
        Note: If there are more than one possibility in any of the above two cases, it will choose randomly any possibility

        * Worst Case, if neither Bot nor user can win, choose any random places from the available places

