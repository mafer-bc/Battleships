/*
 *  Map Class
 *  @autor: Maria Fernanda Bojorquez Cavazos
 * 
 */	


/* This is the class that allows to create the map of the game. It recives a number as a 
 * parameter that declares the size of the map (ex. 10x10).
 */
function Map ( aSize )
{
	var size = aSize;
	var mapArray = [];
	
	this.getSize = function ()
	{
		return size;
	}
	
	this.getMapArray = function ()
	{
		return mapArray;
	}
	
	this.setMapArray = function ( _aMapArray )
	{
		mapArray = _aMapArray;
	}
}





/* Function that creates the mapArray and fill it with zeros
 * This map doesn't show to the player
 */
Map.prototype.makeBackMap = function ()
{
	var backMapSize = this.getSize();
	var aMapArray = [];
	
	//Loop that put arrays in each space of the actual mapArray
	for (var y = 0; y < backMapSize; y++)
	{
		aMapArray[y] = [];
		
		//Loop that name 0 (empty), each space of the arrays in the mapArray
		for (var x = 0; x < backMapSize; x++)
		{
			aMapArray[y][x] = 0;
		}
	}
	this.setMapArray ( aMapArray );
}





/* This function initialize a new Fleet with the name "theFleet".
 * With that, the function "createFleet" is called to make the ships.
 * Then it places those ships in the map by sending the actual "mapArray" to the function "placeShips"
 * and that returns a new map with all the ships placed, which is set as the new "mapArray" 
 */
Map.prototype.createAFleetInMap = function ()
{
	this.theFleet = new Fleet;
	this.theFleet.createFleet();
	this.setMapArray( this.theFleet.placeShips( this.getMapArray() ) );
}





//Creates the visualMap (html map), where the player can click and interact
Map.prototype.makeVisualMap = function ()
{
	//Variable that holds the size of the Map
	var visualMapSize = this.getSize();
	
	//Procedurally generation of the tag "body", that have a tag "div" that will hold the "table" of the visual map
	$("#main-container").append("<div class = \"map-div\"><\div>");
	$(".map-div").html("<table class = \"map-table\">");
	
	/* For loop that generates the rows of the "table" represented by the variable "mapTempRow".
	 * Takes the size of the map to create those
	 */
	for (var y = 0; y < visualMapSize; y++) 
	{ 
		var mapTempRow = "<tr>";
		
		//For loop to generate the "table data" inside the rows, takes the size of the map to create those
		for (var x = 0; x < visualMapSize; x++) 
		{
			//Variable that holds the "mapArray"
			var theMap = this.getMapArray();
			
			/*	Each "table data", in addition to it's "id" and "class", has a "coorx" (value of column), "coory" (value of row) and a "type":
			 * 	- 0 = empty
			 * 	- 1 = there's a ship
			 * 	- 2 = the player clicked it
			 * "type" is assigned with the content of the mapArray
			 */
			mapTempRow += "<td id = \"" + (x + (y*visualMapSize)) + "\" class = \"map-cells\" data-coorx = \"" + x + "\" " +
				"data-coory = \"" + y + "\"  data-type = \"" + theMap[x][y] + "\"></td>";
		}	
		
		mapTempRow += "</tr>";
		
		//The rows are added to the "table"
		$(".map-table").append( mapTempRow );
	}

	$(".map-table").append("</table>");			
}
