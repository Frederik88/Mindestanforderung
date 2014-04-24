#pragma strict

public var mass:float = 5.0;
public var velocity: Vector3;
public var position: Vector3;
public var maxSpeed: float = 20.0;
public var tar : GameObject;






function Start () {


}

function Update () {

position= transform.position;

var steeringForce: Vector3;
steeringForce=Seek(tar);
Debug.Log(steeringForce);

//Beschleunigung = Kraft/Masse
var acceleration: Vector3;
acceleration=steeringForce/mass;
Debug.Log(acceleration);
velocity+=acceleration*Time.deltaTime;
Debug.Log(velocity);
//update position
//position+=velocity;

transform.Translate(velocity);


}

function Seek( target:GameObject ) : Vector3 {

var targetPosition: Vector3=target.transform.position;

var desiredVelocity : Vector3;
desiredVelocity = targetPosition-position;
desiredVelocity.Normalize();
desiredVelocity*maxSpeed;


return (desiredVelocity - velocity);

}