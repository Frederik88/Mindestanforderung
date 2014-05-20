#pragma strict

var liste : GameObject[];
var markierung : GameObject;
var i : int;
var x : int;
var y : int;
var z : int;

function Start () {

	liste = [GameObject.Find("Sphere1"),GameObject.Find("Sphere2"),GameObject.Find("Sphere3"),
			GameObject.Find("Sphere4"),GameObject.Find("Sphere5"),GameObject.Find("Sphere6"),
			GameObject.Find("Sphere7"),GameObject.Find("Sphere8"),GameObject.Find("Sphere9")];
}

function Update () {
if(Input.GetKeyDown("l")){
	i = Random.Range(0, liste.Length);
	print("i= "+i);
	print("Listenwert= "+liste[i]);
	}
	
	markierung = GameObject.Find("Markierung");
	x = liste[i].transform.position.x;
	y = liste[i].transform.position.y + 2.5;
	z = liste[i].transform.position.z;
	markierung.transform.position= Vector3(x, y, z);

}