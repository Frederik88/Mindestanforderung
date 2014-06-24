#pragma strict
public var enable : boolean = false;

var markierung : GameObject;	//Grüne Kugel
var x : int;	//x-Wert für grüne Kugel
var y : int;	//y-Wert für grüne Kugel
var z : int;	//z-Wert für grüne Kugel

function Start () {
	markierung = GameObject.Find("Markierung");
}

function Update () {
	if(enable){
		x = this.transform.position.x;				//Wenn Rendomwert vorhanden, Position der grünen Kugel ändern
		y = this.transform.position.y + 10;
		z = this.transform.position.z;
		markierung.transform.position= Vector3(x, y, z);
		}
}