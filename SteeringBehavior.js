#pragma strict

private var agent : vehicle = new vehicle();
public var target : GameObject;

//Seek gibt einen Vektor zurück der in die Richtung der Position
//des übergebenen GameObjects zeigt
function Seek( target:GameObject ) : Vector3 {
	
	var targetPosition: Vector3 = target.transform.position;
	var desiredVelocity : Vector3;

	//Berechnung der desiredVelocity. Differenzvektor von momentaner velocity des Agenten
	//und der desiredVelocity in einer idealen Welt
	desiredVelocity =Vector3.Normalize((targetPosition-transform.position)*agent.maxSpeed)- agent.velocity;

	//Vektor wird an 2D-Raum angepasst
	return Vector3(desiredVelocity.x,0,desiredVelocity.z);
}


function Wander() : Vector3{

	//Erläuterung zu Variablen:
	//radius: Radius des Kreises auf dem sich wander target bewegt
	//distance: Abstand zwischen dem Agenten und dem wander circle
	//jitter: Zufälliger Versatz, der auf die Position des wander targets
	//draufgerechnet wird
	//last: momentane Position des Agenten
	var w_radius : float = 5.0;
	var w_distance : float = 5.0;
	var w_jitter : float = 5.0;
	var w_last : Vector3;
	var w_circle_target : Vector3;
	var desiredVelocity : Vector3;
	var w_target : Vector3;
	
	w_target += (w_distance*-transform.forward)+(transform.position-w_last);
	w_target += Vector3( UnityEngine.Random.Range(-w_jitter,w_jitter), UnityEngine.Random.Range(-w_jitter,w_jitter), UnityEngine.Random.Range(-w_jitter,w_jitter));
	w_last = transform.position;

	w_circle_target = Vector3.Normalize(w_target-transform.position)*w_radius;

	w_circle_target +=  transform.forward * w_distance;
	w_target = transform.position + w_circle_target;
	desiredVelocity = Vector3.Normalize(w_circle_target) * agent.maxSpeed;

return Vector3(desiredVelocity.x, 0, desiredVelocity.z);
}

//Berechung aller steeringForces
function Calculate () : Vector3{

return Wander();
}