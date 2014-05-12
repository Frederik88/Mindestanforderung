#pragma strict

function start(){



}

public var walkspeed : float = 10f;
public var rotatespeed : float = 50f;
public var horizontalSpeed : float= 2.0;
public var verticalSpeed : float= 2.0;


function Update () {


if( Input.GetKey(KeyCode.W))
	transform.Translate(Vector3.forward  * walkspeed * Time.deltaTime);
	
if( Input.GetKey(KeyCode.S))
	transform.Translate(-Vector3.forward * walkspeed * Time.deltaTime);
	
if(Input.GetKey(KeyCode.A))
        transform.Rotate(Vector3.up, -rotatespeed * Time.deltaTime);
    
if(Input.GetKey(KeyCode.D))
        transform.Rotate(Vector3.up, rotatespeed * Time.deltaTime);

}