/*
 *  Game
 *  @autor: Maria Fernanda Bojorquez Cavazos
 * 
 */	

var game = (function() {

    function update() {
    	
    };

    function render() {

    };

    function handler() {
        render();
    };
    
    function init () 
    {
    	/* Variables that hold the shots and score
    	 * The player will earn points when hits a ship (200), when destroys one ship (500) 
    	 * and when wins the game (700)
    	 * Will lose points when hits an empty space in the map, 
    	 * the less amount of misses means higher score 
    	 */
        var shots = 0;
        var score = 0;
        
        
        
        // Variables that hold the music for the game
        var soundMenu = new buzz.sound("../battleships/sounds/Background/menu.wav", 
        {
        	preload: true,
            autoplay: true,
            loop: true
        });
        
        var soundGame = new buzz.sound("../battleships/sounds/Background/game.wav", {loop: true});
        
        // Variables that hold the SFX of the game
        var soundShot = new buzz.sound("../battleships/sounds/SFX/shotShip.wav");
        var soundMiss = new buzz.sound("../battleships/sounds/SFX/miss.wav");
        var soundSunk = new buzz.sound("../battleships/sounds/SFX/sunkShip.wav");
        
        //Variable that makes a group of all the sounds to mute or unmute  them easier
        var sounds = new buzz.group(soundMenu, soundGame, soundShot, soundMiss, soundSunk);
        
        
        
        /*Function to show objects
    	 *Reicives a jQuery object an then changes its css property "dislplay" to "inline-block" to show that object 
    	 */
        var show = function ( _somejQuery )
        {
        	_somejQuery.css( "display" , "inline-block" );
        }

        
    	/*Function to hide objects
    	 *Reicives a jQuery object an then changes its css property "dislplay" to "none" to hide that object 
    	 */
        var hide = function ( _somejQuery )
        {
        	_somejQuery.css( "display" , "none" );
        }
        
        

        
        /* Function that starts when the div "sound" is clicked 
         * It mutes the sounds, hides the div and shows the one that means there's no sound
         */ 
        $("#sound").click(function()
    	{
        	sounds.mute();
        	hide( $("#sound") );
        	show( $("#noSound") );
    	});
        
                
        /* Function that starts when the div "noSound" is clicked 
         * It unmutes the sounds, hides the div and shows the one that means there's sound
         */ 
        $("#noSound").click(function()
        {
        	sounds.unmute();
        	show( $("#sound") );
        	hide( $("#noSound") );
    	});    	
        
        
        
        
        /*Function that starts when the player clicks the button "easy"
         * This calls the function to start the game and assign 99 shots. 
         * It plays a SFX
         */
        $("#button-easy").click(function()
    	{
        	shots = 99;
        	gameStarts();
        	soundSunk.play();
    	});
        
        
        
        
        /*Function that starts when the player clicks the button "medium"
         * This calls the function to start the game and assign 70 shots. 
         * It plays a SFX
         */
        $("#button-med").click(function()
        {
        	shots = 70;
        	gameStarts();
        	soundSunk.play();
        });
        
        
        
        
        /*Function that starts when the player clicks the button "hard"
         * This calls the function to start the game and assign 40 shots. 
         * It plays a SFX
         */
        $("#button-hard").click(function()
        {
        	shots = 40;
        	gameStarts();
        	soundSunk.play();
        });
        
        
        
        
        //When the player clicks on the button "play again" this function reloads the game
        $(".button-again").click(function ()
        {
        	location.reload();
        });
    	
     
        
        
        /* Function that display the div where the information of the player is. (shots, ships left, score)
         * And hides the buttoms
         * The value of the variables "shots" and "score" are added to its correspondant div
         * It also changes the location of the logo and fades the music of the menu with the music for the game
         * Is used when the game starts
         */
        var prepareGame = function ()
        {
        	hide ( $(".button") );
        	
        	show( $("#player-info") );
	        show( $("#instructions") );
	        
	        $("#shots").html( shots );
	        $(".score").html( score );
	        
	        $("#logo").css("right" , "auto");
	        
	        soundMenu.fadeWith( soundGame, 1000 );
        }
        
        
        
        
        /* Function that receives a number to add or substract from the current score
         * It also checks if the score goes below cero to restore it avoiding show negative numbers.
         */        
        var changeScore = function ( points )
        {
        	score += points;
			if(score < 0)
			{
				score = 0;
			}
        }   
        
       
        
        //The function where everything needed for the game is called.
    	var gameStarts = function ()
    	{
    		prepareGame();
    		
	    	//Instance of the gameMap
	        var gameMap = new Map(10);
	        
	        //The "mapArray" gets done by calling this function. Starts full of zeros.
	        gameMap.makeBackMap();
	        
	        //Function called to create "theFleet", which creates the ships and place them in the map
	        gameMap.createAFleetInMap();
	        
	        //By calling this function the html code is created, so the map is visual
	        gameMap.makeVisualMap();
	        
	        
	        
	        
	        //Function that starts when a cell is clicked
	        $(".map-cells").click(function()
	        {
	        	//"If" that checks if there's shots available
	        	if (shots > 0)
	            {
		        	//Variable to hold the cell clicked
	        		var aCell = $(this);
		        	
	        		
	        		
	        		/* "If" to revise if the value "type" of the cell is cero.
	        		 * Cero means there's no ship and that cell wasn't click before
	        		 */
		        	if (aCell.data("type") == 0)
					{
		        		/* When an unclicked and empty cell is clicked:
		        		 *  -The sound for an empty cell is play
		        		 *  -The sprite is change
		        		 *  -One shot is taken from the variable "shots"
						 *	-The "type" of the cell change to "2", which means that was clicked
						 *	-100 points are taken from the variable "score" 
		        		 */
		        		soundMiss.play();
		        		
		        		aCell.css(
						{
							"background" : "url(../BattleShips/images/hitCell.jpg)" , 
							"background-size" : "100%" 
						});
						
						shots--;
						
						aCell.data("type",2);
						
						changeScore (- 100);
					}
		        	
		        	
		        	
		        	/* This "if" revises if the value "type" of the cell is one.
	        		 * One means there's a ship in it
	        		 */
		        	if (aCell.data("type") == 1)
		        	{
		        		//Variable that holds "theFleet" of the "gameMap" 
		        		var theGameFleet = gameMap.theFleet;
		        		
		        		
		        		/* This for loop uses the length of the "fleetContainer" that "theFleet" has,
		        		 * to go over the container and get to each ship
		        		 */
		        		for (var i = 0; i < theGameFleet.fleetContainer.length; i++)
		        		{
		        			//Variable that holds the ships (one each time)
		        			var aFleetShip = theGameFleet.fleetContainer[i];
		        			
		        			/* Loop that uses the size of the ship to revise if the cell clicked is the same
		        			 * cell where the ship is. Goes over each position of the ship
		        			 */
		        			for (var e = 0; e < aFleetShip.getSize(); e++)
		        			{
		        				
	        					/*If the value of the cell id is the same as one of the positions of the ship:
	        					 * - The sound when shot a ship is play
	        					 * - The function "beingHit" is called, which makes the ship increase it "hits"
	        					 * - The sprite of the cell is change
	        					 * - To the variable score are added 200 points (hits a ship). 
	        					 */
		        				if (aCell.attr("id") == aFleetShip.position[e])
		        				{
		        					soundShot.play();
		        					
		        					aFleetShip.beingHit();
		        					
		        					aCell.css(
		        					{
		        						"background" : "url(../BattleShips/images/hitShip.jpg)" ,
		        						"background-size" : "100%" 
		        					});		        	        		
		        	        		
		        	        		changeScore ( 200 );
		        					
		        	        		
		        	        		/* "If" that uses the function "isSunk" of the ship to check if the hit was effective to destroy it:
		        					 * - The sound when sunk a ship is play
		        					 * - The sprite that informs to the player which ship is sunk is shown
		        					 * - To the variable score are added 500 points (destroys a ship). 
		        					 */
		        	        		if (aFleetShip.isSunk() == true)
		        					{	
		        	        			soundSunk.play();
		        	        			
		        	        			show( $("#S"+ i) );
		        	        			
		        						changeScore ( 500 );
		        	        			
		        	        			/* The function "aShipSunk" is called to inform there's a ship sunk 
		        	        			 * It reduces one the "fleetSize"
		        	        			 */
		        						theGameFleet.aShipSunk();
		        						
		        						
		        						
		        						/* "If" that uses the function "isFleetSunk" of the fleet to look if there's ships left:
		        						 * - To the variable score are added 700 points (destroys the fleet). 
		        						 * - The map, logo, player info and instructions are hidden.
		        						 * - Shows the div where the image of win is located and fades out the music of the game
		        						 * - The value of the "score" is added to the div "score" 
		        						 */ 
		        						if (theGameFleet.isFleetSunk() == true)
		            	        		{
		        							changeScore ( 700 );
		        							
		        							hide( $("#main-container") );
		        							hide( $("#instructions") );

		        							show( $("#win") );
		        							soundGame.fadeWith( soundMenu , 1000 );
		        							
		        							$(".score").html(score);
		            	        		}
		        					}
		        	        		
		        	        		// A shot is removed from the variable "shots"
		        					shots--;
		        					
		        					// The "type" of the cell change to "2", which means was clicked
		        					aCell.data("type",2);
		        					
		        					/* This breaks the "for loop" because the ship was found and is not necessary
		        					 * to keep reviewing the positions
		        					 */
		        					break;
		        				}
		        			}
		        		}
		        	}
	        	
		        	//The value of "shots" and "score" are added to each div, so the player can see those
		        	$("#shots").html(shots);
		        	$(".score").html(score);
		        	
		        	
		        	/* This "if" revises if the value of "shots" is cero. Which means the player lose because is out of bullets:
		    		 * - Hide the map, logo, player info and instructions.
		    		 * - Shows the div where the image of win is located and fades out the music of the game
		    		 */
		        	if (shots == 0)
		            {
		        		hide( $("#main-container") );
						hide( $("#instructions") );

						show( $("#lose") );
						soundGame.fadeWith( soundMenu , 1000 );
		            }
	            }
	        });
    	}
    };

    function run () {
        update();
        render();
    };

    return {
    	init: init,
    	run: run
    };
    
})();
