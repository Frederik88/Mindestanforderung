#pragma strict

var finished: boolean = false;
public static var timer : float = 0.0;
// var stopTime : float = 0.0;		// gespeicherte Zeit aus der deltaTime
var minutes : String;
var seconds : String;

function Update() {

	if(Game.timerCheck) {		// Zeit Startet wenn man ein Moped anwählt, aus Game.js
		timer += Time.deltaTime;
	}
}

function OnTriggerEnter() {
	
	Debug.Log("Auswahl hat Ziel erreicht!");
	finished = true;
}

function OnGUI() {
	if(finished){			// Box auf
	
		GUI.BeginGroup(Rect(Screen.width/2-50,Screen.height/2-50,200,200));	
		
		// Zeit muss man noch irgendwie stoppen.
		
		minutes = Mathf.Floor(timer / 60).ToString("00");
		seconds = (timer % 60).ToString("00");
		
		GUI.Box(Rect(0,0,200,200),"");
		
		// Zeit anzeigen als GUI.Label()
		GUI.Label(Rect(30,30,150,20),"TIME FOR FINISHHIM");
		GUI.Label(Rect(75,60,150,20), minutes + ":" + seconds);				// Zeit, die man gebraucht hat für das Spiel
		
		if(GUI.Button(Rect(25,150,150,20), "GO TO START")){		// Button; zurück ins Startmenue
			Application.LoadLevel("Startmenue");
		}
	
		GUI.EndGroup();
	}
}