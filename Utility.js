#pragma strict


public static function truncate ( vec : Vector3, max : float ) : Vector3{

if( vec.magnitude > max){
	vec.Normalize();
	vec*max;
	}
return vec;
}