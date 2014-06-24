#pragma strict

enum RotationAxes { MouseXAndY = 0, MouseX = 1, MouseY = 2 };
public var axes : RotationAxes = RotationAxes.MouseXAndY;
public var sensitivityX : float = 15F;
public var sensitivityY : float = 15F;

public var minimumX : float = -360F;
public var maximumX : float = 360F;

public var minimumY : float = -60F;
public var maximumY : float = 60F;

var rotationY : float = 0F;

public var enable : boolean = true;

function Start () {

	if (rigidbody)
		rigidbody.freezeRotation = true;

}

function Update () {

	if(enable){


			if (axes == RotationAxes.MouseXAndY)
			{
				var rotationX : float = transform.localEulerAngles.y + Input.GetAxis("Mouse X") * sensitivityX;
			
				rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
				rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
			
				transform.localEulerAngles = new Vector3(-rotationY, rotationX, 0);
			}
			else if (axes == RotationAxes.MouseX)
			{
			transform.Rotate(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
			}
			else
			{
				rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
				rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
				
				transform.localEulerAngles = new Vector3(-rotationY, transform.localEulerAngles.y, 0);
			}

		}

}