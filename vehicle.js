#pragma strict


//Attribute der vehicle klasse
public var mass : float = 5.0f;
public var rotation : float = 1.0f;
public var velocity : Vector3;
public var position : Vector3;
public var acceleration : Vector3;
public var steeringForce : Vector3;
public var forward : Vector3;
public var maxSpeed : float = 20.0f;
public var util : Utility = new Utility();






function Start () {


}

function Update () {

	Update_Velocity();
	Update_Position();
	Update_Coordinates();
	
	
	//Rotation
	transform.rotation = Quaternion.Slerp(transform.rotation,Quaternion.LookRotation(forward,new Vector3(0,0,-1)),Time.deltaTime*rotation);







}
function Update_Velocity() : void {
//Berechnung des Bewegungsvektors
//Beschleunigung Kraft/Masse

steeringForce = this.GetComponent(SteeringBehavior).Calculate();
acceleration=steeringForce/mass;

velocity = util.truncate(velocity + acceleration, maxSpeed);
//velocity += this.GetComponent<SteeringBehavior>().Calcul
}

function Update_Position() : void {

transform.position += velocity * Time.deltaTime;

}

function Update_Coordinates() : void {

if (velocity.magnitude >= 0.05f){
	velocity.Normalize();
	forward=velocity;
}



}