//For placing the image of the mini map.
var miniMap : GUIStyle;
//Two transform variables, one for the player's and the enemy,
var player : Transform;
var enemy : Transform;
//Icon images for the player and enemy(s) on the map.
var playerIcon : GUIStyle;
var enemyIcon : GUIStyle;
//Offset variables (X and Y) - where you want to place your map on screen.
var mapOffSetX = 762;
var mapOffSetY = 510;
//The width and height of your map as it'll appear on screen,
var mapWidth = 200;
var mapHeight = 200;
//Resolution (both width and height) of your terrain.
var sceneWidth = 500;
var sceneHeight = 500;
//The size of your player and enemy's icon as it would appear on the map.
var iconSize = 10;
var iconHalfSize;

function Update () {
iconHalfSize = iconSize/2;
}

function GetMapPos(pos : float, mapSize : float, sceneSize : float) {
return pos * mapSize/sceneSize;
}

function OnGUI() {
//Everything about the map.
GUI.BeginGroup(Rect(mapOffSetX,mapOffSetY,mapWidth,mapHeight), miniMap);
var pX = GetMapPos(transform.position.x, mapWidth, sceneWidth);
var pZ = GetMapPos(transform.position.z, mapHeight, sceneHeight);
var playerMapX = pX - iconHalfSize;
var playerMapZ = ((pZ * -1) - iconHalfSize) + mapHeight;
GUI.Box(Rect(playerMapX, playerMapZ, iconSize, iconSize), "", playerIcon);
  
var sX = GetMapPos(enemy.transform.position.x, mapWidth, sceneWidth);
var sZ = GetMapPos(enemy.transform.position.z, mapHeight, sceneHeight);
var enemyMapX = sX - iconHalfSize;
var enemyMapZ = ((sZ * -1) - iconHalfSize) + mapHeight;
GUI.Box(Rect(enemyMapX, enemyMapZ, iconSize, iconSize), "", enemyIcon);
GUI.EndGroup();
}
