#pragma strict

var liste : GameObject[];
var markierung : GameObject;	//Grüne Kugel
var i : int;	//Randomwert
var x : int;	//x-Wert für grüne Kugel
var y : int;	//y-Wert für grüne Kugel
var z : int;	//z-Wert für grüne Kugel
var bool:boolean = false;	//Hilfswert

function Start () {
//Beispielliste
	liste = [GameObject.Find("Sphere1"),GameObject.Find("Sphere2"),GameObject.Find("Sphere3"),
			GameObject.Find("Sphere4"),GameObject.Find("Sphere5"),GameObject.Find("Sphere6"),
			GameObject.Find("Sphere7"),GameObject.Find("Sphere8"),GameObject.Find("Sphere9")];
}

function Update () {
if(Input.GetKeyDown("l")){	//Randomwert wird bei drücken der Taste generiert
	i = Random.Range(0, liste.Length);
	print("i= "+i);
	print("Listenwert= "+liste[i]);
	bool = true;
	}

if(bool){		//Wenn Rendomwert vorhanden, Position der grünen Kugel ändern
	markierung = GameObject.Find("Markierung");
	x = liste[i].transform.position.x;
	y = liste[i].transform.position.y + 2.5;
	z = liste[i].transform.position.z;
	markierung.transform.position= Vector3(x, y, z);
	}
}