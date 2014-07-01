#pragma strict
public var second_camera : Camera;
public var main_camera : Camera;
public var liste : GameObject[];	//Liste kugeln
public var auswahl : GameObject;	//angeklickte "person"
var ziel : GameObject; //markierte "person"
public var i : int;	//Randomwert
public static var timerCheck : boolean = false; //Boolean variable die Bestimmt wann der Timer startet

public var start_position : Vector3; //Startposition der Kamera
public var start_rotation : Quaternion; //Startrotation der Kamera

var bool:boolean = false;	//Hilfswert 
public var aktivierung : boolean = false;

function Start () {
	main_camera.active = true;
	//Position und Rotation werden gespeichert damit Kamera nacher wieder resettet werden kann
	start_position = main_camera.transform.position;
	start_rotation = main_camera.transform.rotation;
	
	second_camera.active = false;
	main_camera.GetComponent(keymovement).enable = true;
	main_camera.GetComponent(Mouselook).enable = true;
}

function Update () {
if( Input.GetKeyDown("enter") || Input.GetKeyDown("return") ){

		//Main Camera springt wieder zurück in ihre Ausgangspositon/rotation und lässt sich
		//nicht mehr bewegen
		main_camera.transform.position = start_position;
		main_camera.transform.rotation = start_rotation;
		main_camera.GetComponent(keymovement).enable = false;
		main_camera.GetComponent(Mouselook).enable = false;		
		
		second_camera.GetComponent(keymovement).enable = false;
		bool = true;
		}
		
	if(bool && Input.GetMouseButtonDown(0)){  //Linke maustaste
		var hit : RaycastHit;
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		timerCheck = true; //Start des Timers
		
		if(Physics.Raycast(ray, hit)){
			
			if(hit.transform.tag == "neighbour"){		//wenn angeklicktes objekt ein Player ist - wechseln
    			main_camera.active = false;
    			second_camera.active = true;
    			
				print("you clicked at " + hit.transform.name +"   "+ hit.transform.tag); //test
				auswahl = hit.transform.gameObject;
				
				liste = auswahl.GetComponent(SteeringBehavior).neighbour_list;
				
				print("länge "+ liste.Length);
				i = Random.Range(0, liste.Length);	//Randomwert wird generiert
				while(liste[i].Equals(hit.transform.gameObject)){
					i = Random.Range(0, liste.Length);
					print("i= "+i);
					print("Listenwert= "+liste[i]);
					}
				print("Listenwert= "+liste[i]);
				ziel = liste[i];
				//print(ziel.name);

				auswahl.GetComponent(SteeringBehavior).enable=false;
				auswahl.GetComponent(vehicle).enable = false;
				auswahl.GetComponent(keymovement).enable = true;
				auswahl.renderer.material.color = Color.red;
				//auswahl.GetComponent(Rigidbody).constraints = RigidbodyConstraints.FreezePosition;
				
				//rotation der kamera an mouselook anpassen
				//second_camera.transform.rotation = Quaternion.Euler(Mouselook.rotationX,0F,0F);
				
				ziel.GetComponent(markierung).enable = true;
				ziel.renderer.material.color = Color.green;
				aktivierung = true;
				}
			}
		}
	if(aktivierung){
	second_camera.transform.position = Vector3( auswahl.transform.position.x, auswahl.transform.position.y+3, auswahl.transform.position.z-3 );
	//second_camera.transform.rotation = Quaternion.LookRotation						
	}
}