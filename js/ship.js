/*
 *  Ship class
 *  @autor: Maria Fernanda Bojorquez Cavazos
 * 
 */	


function Ship( aSize ) 
{
    var size = aSize;
    this.orientation = 0;
	this.position = [];
	this.hits = 0;
	
	this.getSize = function ()
	{
		return size;
	}
	
	/* Function to check if the size minus the hits are cero, which means the ship is sunk
	 * If it is, it returns true, if not: false
	 */
    this.isSunk = function() 
    { 
        return ((this.getSize() - this.hits) < 1); 
    }
}





/* Function that is used when the player hits a ship.
 * It ingreases by one the value "hits" of the ship
 */
Ship.prototype.beingHit = function ()
{
	this.hits++;
	console.log (this.getSize() + " is being hit");
}





/* This function is use to generate a Random integrer
 * It receives as parameter the maximum number that you want to randombly generate
 * between 0 and that number. This is inclusive, that's why it uses Math.round()
 */  
function Random ( max ) 
{
    return Math.round((Math.random() * max));
}





/* Function that creates de coordinates of the ship in the map.
 * Receives the map as parameter and is use to know which spaces are empty (cero) to place the ship.
 * Return a map with the postition of the ship
 */
Ship.prototype.placeShipInMap = function ( _gameMap ) 
{	
	//Variable that holds the gameMap
	var mapShip = _gameMap;
	
	//Creation of random variables for coordinate X and Y, and orientation 
	var shipX = Random(( mapShip.length - 1 ));
	var shipY = Random(( mapShip.length - 1 ));
	this.orientation = Random(1);
	
	//Variable that trigger the while and ensures the ship fits in the map before allocating it
	var fits = false;
	
	// If the ship's orientation is cero means is Vertical, if is one it's Horizontal
	switch (this.orientation)
	{
		//VERTICAL CASE
		case 0:
			
			// "While" that ends when "fits" became true, meaning the ship can be place based on its orientation and initial coordinate
			while (fits == false)
			{
				
				/* First it's checked if the ship fits in the map. In this case the orientation is vertical then the coordinate revised is Y.
				 * To the value of the coordinate is added the size of the ship minus one, to get the exact amount of spaces
				 */
				if ((shipY + (this.getSize() - 1)) < mapShip.length)
				{
					
					/* "For" that revises if there's empty spaces in the map (zeros), to place the ship with that initial coordinate 
					 * Uses the size of the ship to check this.
					 */
					for (var v = 0; v < this.getSize(); v++)
					{
						
						/* By adding "v" to the Y coordinate checks if the spaces are equals cero
						 * If there's space for every coordinate of the ship, "fits" will be true at the end of the for loop
						 */
						if (mapShip[shipX][shipY + v] == 0)
						{
							fits = true;
						}
						
						
						/* If there's no space for one coordinate:
						 * - "fits" change to false
						 * - New values are assign to the coordinates
						 * - The loop breaks to start checking again.
						 */
						else
						{
							shipX = Random(( mapShip.length - 1 ));
							shipY = Random(( mapShip.length - 1 ));
							fits = false;
							break;
						}
					}
				}
				
				
				//If the ship size is larger than the map length, the value of the Y coordinate is changed
				else
				{
					shipY = Random(( mapShip.length - 1 ));
				}
			}
		
			
			
			// When "fits" becames true, the ship's coordinates and size fit in the map
			if (fits == true)
			{
				
				/* "For" that place the ship in the map, by changing the value to one. 
				 * Also creates, in the "position" array, the points that the ship takes in the map.
				 * This points are created by adding to X the value of Y, plus each space, multiplied by the length of the map
				 */
				for (var i = 0; i < this.getSize(); i++)
				{
					mapShip[shipX][shipY + i] = 1;
					this.position[i] = (shipX + ((shipY + i) * mapShip.length));
				}
			}
			//Case VERTICAL break
			break;
			
		
	
		//HORIZONTAL CASE
		case 1:
			
			// "While" that ends when "fits" became true, meaning the ship can be place based on its orientation and initial coordinate
			while (fits == false)
			{
				
				/* First it's checked if the ship fits in the map. In this case the orientation is horizotal then the coordinate revised is X.
				 * To the value of the coordinate is added the size of the ship minus one, to get the exact amount of spaces
				 */
				if ((shipX + (this.getSize() - 1)) < mapShip.length) 
				{
					
					/* "For" that revises if there's empty spaces in the map (zeros), to place the ship with that initial coordinate 
					 * Uses the size of the ship to check this.
					 */
					for (var h = 0; h < this.getSize(); h++)
					{
						
						/* By adding "h" to the X coordinate checks if the map spaces are equals cero
						 * If there's space for every coordinate of the ship, "fits" will be true at the end of the for loop
						 */
						if (mapShip[shipX + h][shipY] == 0)
						{
							fits = true;
						}
						
						
						/* If there's no space for one coordinate:
						 * - "fits" change to false
						 * - New values are assign to the coordinates
						 * - The loop breaks to start checking again.
						 */
						else
						{
							shipX = Random(( mapShip.length - 1 ));
							shipY = Random(( mapShip.length - 1 ));
							fits = false;
							break;
						}
					}
				}
				
				
				//If the ship size is larger than the map length, the value of the X coordinate is changed
				else
				{
					shipX = Random(( mapShip.length - 1 ));
				}
			}
			
			
			
			// When "fits" becames true, the ship's coordinates and size fit in the map
			if (fits == true)
			{
				
				/* "For" that place the ship in the map, by changing the value to one. 
				 * Also creates, in the "position" array, the points that the ship takes in the map.
				 * This points are created by adding to Y multiplied by the length of the map, X plus each space 
				 */
				for (var e = 0; e < this.getSize(); e++)
				{
					mapShip[shipX + e][shipY] = 1;
					this.position[e] = ((shipX + e) + (shipY * mapShip.length));
				}
			}
			//Case HORIZONTAL break
			break;
	}
	
	//Returns the map with the ship place
	return mapShip;
}		







