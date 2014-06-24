#pragma strict

function start(){



}

public var walkspeed : float = 10f;
public var rotatespeed : float = 50f;
public var horizontalSpeed : float= 2.0;
public var verticalSpeed : float= 2.0;
public var enable : boolean = false;



function Update () {

	if(enable){

		if( Input.GetKey(KeyCode.W)){
			transform.Translate(Vector3.forward  * walkspeed * Time.deltaTime);
			
			}
	
		if( Input.GetKey(KeyCode.S)){
			transform.Translate(-Vector3.forward * walkspeed * Time.deltaTime);
			
			}
			
		if(Input.GetKey(KeyCode.A)){
        	transform.Translate(Vector3.left * walkspeed * Time.deltaTime);
    		
    		}
    		
		if(Input.GetKey(KeyCode.D)){
       		transform.Translate(Vector3.right * walkspeed * Time.deltaTime);
       		
       		}
	}
}