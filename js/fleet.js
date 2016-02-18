/*
 *  Fleet class
 *  @autor: Maria Fernanda Bojorquez Cavazos
 * 
 */	


//Constructor
function Fleet ()
{
	this.fleetContainer = [];
	var fleetSize = 5;
	
	//Function that removes one to the "fleetSize" when a ship of the fleet gets sunk 
	this.aShipSunk = function ()
	{
		fleetSize--;
	}
	
	this.getFleetSize = function ()
	{
		return fleetSize;
	}
}





/* Function that initialize 5 different ships. The ships are store in the 
 * "fleetContainer" where are identified by its position number in the array.
 * It ship has a defined size
 */
Fleet.prototype.createFleet = function ()
{
	for (var i = 0; i < this.getFleetSize(); i++)
	{
		switch (i)
		{
			case 0:
				this.fleetContainer[0] = new Ship (2);
				break;
			case 1:
				this.fleetContainer[1] = new Ship (3);
				break;
			case 2:
				this.fleetContainer[2] = new Ship (4);
				break;
			case 3:
				this.fleetContainer[3] = new Ship (4);
				break;
			case 4:
				this.fleetContainer[4] = new Ship (5);
				break;
		}
	}
}





/* This function gets as parameter a map (the "mapArray" with zeros in it)
 * It uses a "for" to send the map to each ship stored in the "fleetContainer",
 * so each ship can place it in the map.
 * When finish, it returns the map with all the ships placed.
 */
Fleet.prototype.placeShips = function ( _theGameMap )
{
	var mapFleet = _theGameMap;
	for (var i = 0; i < this.getFleetSize(); i++)
	{
		aShip = this.fleetContainer[i];
		mapFleet = aShip.placeShipInMap( mapFleet );
	}
	return mapFleet;
}





/* Function to check if the size of the fleet is 0, which means the fleet is sunk
 * If it is, it returns true, if not: false
 */
Fleet.prototype.isFleetSunk = function ()
{
	return (this.getFleetSize() < 1);
}