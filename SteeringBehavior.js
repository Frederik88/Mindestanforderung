#pragma strict

private var agent : vehicle = new vehicle();
public var target : GameObject;
public var obstacle : GameObject;
private var currentEntity : int;
public var tagged : boolean;
public var BRadius: float = 2.0f;

public var neighbour_list : GameObject[];


//Markiert die GameObjects die den Tag "neighbour" tragen und in der 
//passenden Reichweite sind
function TagNeighbour(){

for(var neighbour:GameObject in neighbour_list ){
	//aktuelle Tags löschen
	neighbour.GetComponent(SteeringBehavior).tagged = false;
	
	//Berechnung Abstand
	var sqrdistance : float;
	var distance : Vector3 = neighbour.transform.position - transform.position;
	
	sqrdistance = distance.sqrMagnitude;
	
	//Radien addieren
	var range : float = BRadius + neighbour.GetComponent(SteeringBehavior).BRadius;
	
	//Wenn Nachbar innerhalb der Range ist, tagge ihn
	if( (neighbour != this.gameObject) && (sqrdistance < range*range) ){
		neighbour.GetComponent(SteeringBehavior).tagged = true;
	}
		
	}
}
//Separation gibt einen Vektor zurück, der den Agenten weg von seinen
//Nachbarn lenkt
function Separation () : Vector3 {
	var steeringForce : Vector3;
	
	
	for(var neighbour:GameObject in neighbour_list ){
		//Prüft ob der momentane Agent kein Nachbar ist und ob der Nachbar getagged ist
		if( (neighbour != this.gameObject) && neighbour.GetComponent(SteeringBehavior).tagged){
			//Berechnung der steeringForce weg vom Agenten
			var to_agent : Vector3 = this.transform.position - neighbour.transform.position;
			steeringForce += Vector3.Normalize( to_agent / to_agent.magnitude );
		}
	}
	return Vector3(steeringForce.x, 0, steeringForce.z);
 } 
 
 
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

//NOCH ALPHA-VERSION
function ObstacleAvoidance( obstacle : GameObject ) : Vector3{
/*
var dir : Vector3 = ( obstacle.transform.position - transform.position).normalized;
var hit : RaycastHit;
var leftRay : Vector3 = transform.position;
var rightRay: Vector3 = transform.position;
var force : Vector3;
var ray : boolean = Physics.Raycast( transform.position, transform.forward, 5.0, 1 );
var leftR : boolean = Physics.Raycast( leftRay, transform.forward, 10.0, 1 );
var rightR : boolean = Physics.Raycast( rightRay, transform.forward, 10.0, 1 );
var posObs : Vector3 = obstacle.transform.position;
var posRadius : float = 20.0;
var steeringForce : Vector3;
var brakeForce : float = 1.0;
var multiplier : float = 1.0 + ( 5.0  -posObs.x) / 5.0;
*/
var avoid_dist : float = 1.0f;
var avoid_rad : float = 1.0f;
var avoid_y_scalar : float = 1.5f;
var AvoidBrakeWeight : float = 0.2f;
	
var hide_obj_width : float = 2.0f;
var hide_from_obj : float = 3.0f;

/*
leftRay.x += 1;
rightRay.x -= 1;
*/

var hit : RaycastHit;
var sphere : boolean = Physics.SphereCast(transform.position, avoid_rad, transform.forward*avoid_dist, hit, avoid_dist,1);
Debug.Log(sphere);
/*
if( sphere ){
//lateral force
steeringForce.z = (( posRadius - posObs.z )-transform.position.z) * multiplier;

//breaking force
steeringForce.x = (( posRadius - posObs.x )-transform.position.x) * brakeForce;




}
return steeringForce;
*/
var box_length : float = 10 + (agent.velocity.z / agent.maxSpeed ) * 10;

var localPos : Vector3 = transform.InverseTransformPoint(obstacle.transform.position);
var multiplier : float = 1.0 + (box_length - localPos.z) / box_length;
var steeringForce : Vector3;
var brakingWeight = 0.2;

if(sphere){
	steeringForce.x =(2.0 - localPos.x) * brakingWeight;
	
	steeringForce.z = (2.0 - localPos.z) * multiplier;
}

return Vector3(steeringForce.x, 0, steeringForce.z);


}
//Berechung aller steeringForces
function Calculate () : Vector3{

var total_steering_force : Vector3;

neighbour_list = GameObject.FindGameObjectsWithTag("neighbour");
TagNeighbour();
total_steering_force += Seek(target)*5.0;
//total_steering_force += Wander()*1.0;
//total_steering_force += ObstacleAvoidance(obstacle)*10.0;
total_steering_force += Separation();


return total_steering_force;
}