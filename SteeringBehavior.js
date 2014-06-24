#pragma strict
// test
private var agent : vehicle = new vehicle();
public var target : GameObject;
public var obstacle : GameObject;
private var currentEntity : int;
public var tagged : boolean;
public var BRadius: float = 2.0f;
private var slider : InGameSettings = new InGameSettings();
//Gewichtung der Bewegungsvektoren
public var seek_weight : float;
public var wander_weight : float;
public var obstacle_avoidance_weight : float;
public var separation_weight : float; 
public var alignment_weight : float; 
public var cohesion_weight : float;
public var wall_avoidance_weight : float;
//Variablen für Wander
public var wander_cycle_skip : int = 20;
public var wander_timer : int = 0;

public var enable : boolean = true;

public var feelers : Vector3[];
public var feeler_angle : float = 45.0f;
var f_wall_feeler : Vector3;
var s1_wall_feeler : Vector3;
var s2_wall_feeler : Vector3;
public var sideFeelerLength : float = 1.0f;
public var forwardFeelerLength : float = 1.5f;
public var wallLayerMask : int = 1 << 9;

feelers = new Vector3[3];
feelers[0] = f_wall_feeler;
feelers[1] = s1_wall_feeler;
feelers[2] = s2_wall_feeler;

//obstacale avoidance
public var avoid_dist : float = 5.0f;
public var avoid_rad : float = 1.0f;
public var avoid_y_scalar : float = 1.5f;
public var AvoidBrakeWeight : float = 0.2f;
public var p1 : Vector3; 
public var layerMask : int = 1 << 8; 




public static var neighbour_list : GameObject[];




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
function Cohesion() : Vector3{
	var steeringForce : Vector3;
	var centerOfMass : Vector3;
	
	var neighbour_count : int;
	
	for(var neighbour:GameObject in neighbour_list ){
		//Prüft ob der momentane Agent kein Nachbar ist und ob der Nachbar getagged ist
		if( (neighbour != this.gameObject) && neighbour.GetComponent(SteeringBehavior).tagged){
			centerOfMass += neighbour.GetComponent(vehicle).position;
			neighbour_count++;
		}
	}
	
	if( neighbour_count > 0 ){
		centerOfMass /= neighbour_count;
		
		steeringForce = Seek(centerOfMass);
		}
	return Vector3( steeringForce.x, 0, steeringForce.z );
	
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
 
 function Alignment () : Vector3{
 	var average_heading : Vector3;
 	var neighbour_count : int;
 	
 	for(var neighbour:GameObject in neighbour_list ){
		//Prüft ob der momentane Agent kein Nachbar ist und ob der Nachbar getagged ist
		if( (neighbour != this.gameObject) && neighbour.GetComponent(SteeringBehavior).tagged){
			average_heading += neighbour.GetComponent(vehicle).velocity.normalized;
			neighbour_count++;
		}
	}
	
	//wenn mehr als ein Nachbar vorhanden ist, wird der heading vektor gemittelt
	if( neighbour_count > 0 ){
		average_heading /= neighbour_count;
		average_heading -= agent.velocity.normalized;
		}
	return Vector3( average_heading.x, 0, average_heading.z );
		
 }
 
//Seek gibt einen Vektor zurück der in die Richtung der Position
//des übergebenen GameObjects zeigt
function Seek( target : Vector3 ) : Vector3 {
	
	var targetPosition: Vector3 = target;
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
	
	wander_timer++;
	
	if(wander_timer >= wander_cycle_skip){
	
		w_target += (w_distance*-transform.forward)+(transform.position-w_last);
		w_target += Vector3( UnityEngine.Random.Range(-w_jitter,w_jitter), UnityEngine.Random.Range(-w_jitter,w_jitter), UnityEngine.Random.Range(-w_jitter,w_jitter));
		w_last = transform.position;

		w_circle_target = Vector3.Normalize(w_target-transform.position)*w_radius;

		w_circle_target +=  transform.forward * w_distance;
		w_target = transform.position + w_circle_target;
		desiredVelocity = Vector3.Normalize(w_circle_target) * agent.maxSpeed;
	}
	else{
		return Vector3.zero;
		}
		
return Vector3(desiredVelocity.x, 0, desiredVelocity.z);
}

//NOCH ALPHA-VERSION
function ObstacleAvoidance() : Vector3{

var steering_force : Vector3 = Vector3.zero;
var hit : RaycastHit;
p1 = transform.position;
		
		
	if(Physics.SphereCast(p1,avoid_rad,transform.forward*avoid_dist,hit,avoid_dist,layerMask)){			
		var to_target : Vector3 = hit.point - transform.position;
		var collision_line : Vector3 = transform.TransformDirection(Vector3.forward*avoid_dist); 
		var distance_on_line : float = Vector3.Dot(collision_line.normalized,to_target.normalized);
			
		if(distance_on_line == 0){
			distance_on_line = avoid_dist;
		}
			var point_on_line : Vector3 = (transform.position+transform.forward*distance_on_line);
			steering_force = ((point_on_line-hit.point)*avoid_y_scalar);
			steering_force += (transform.position-point_on_line)*AvoidBrakeWeight;
			
	}
		steering_force = new Vector3(steering_force.x,steering_force.y,0);
		return Vector3.Normalize(steering_force)*agent.max_force;
}

function WallAvoidance() : Vector3{

var steeringForce : Vector3 = Vector3.zero;
var DistToClosestHit : float  = 99999f;
var closestHit : RaycastHit = new RaycastHit();
var hit : RaycastHit;
		
var i : int = 0;
var index : int = -1;
var length : float = forwardFeelerLength;
		
//Feelers
feelers[0] = transform.forward * forwardFeelerLength;
feelers[1] = (Quaternion.AngleAxis(feeler_angle, Vector3.forward) * transform.forward) * sideFeelerLength;
feelers[2] = (Quaternion.AngleAxis(-feeler_angle, Vector3.forward) * transform.forward) * sideFeelerLength;

		
		
		
for(var feeler : Vector3 in feelers ){

if (i>0){
	length=sideFeelerLength;
}
	if(Physics.Raycast(this.transform.position, feeler, hit, length, wallLayerMask)){
		if (hit.distance < DistToClosestHit){
			DistToClosestHit = hit.distance;
			closestHit = hit;
			index = i;
		}
				
	}
			
	if (index >= 0){
		var overShoot : Vector3 = feelers[index]-(closestHit.point - transform.position);
		steeringForce=closestHit.normal*overShoot.magnitude;
	}
	i++;
}

return Vector3(steeringForce.x,steeringForce.y,0);
}


//Berechung aller steeringForces
function Calculate () : Vector3{

	if(enable){
	
		var total_steering_force : Vector3;
		target = GameObject.FindGameObjectWithTag("seek");
		neighbour_list = GameObject.FindGameObjectsWithTag("neighbour");
		TagNeighbour();
		separation_weight = InGameSettings.Seperation_Wert/10;
		alignment_weight = InGameSettings.Alignement_Wert/10;
		cohesion_weight = InGameSettings.Cohesion_Wert/10;
		
		total_steering_force += Seek(target.transform.position)*seek_weight;
		total_steering_force += Wander()*wander_weight;
		total_steering_force += ObstacleAvoidance()*50.0;
		total_steering_force += Separation()*separation_weight;
		total_steering_force += Alignment()*alignment_weight;
		total_steering_force += Cohesion()*cohesion_weight;
		total_steering_force += WallAvoidance()*wall_avoidance_weight;
	}
return total_steering_force;
}