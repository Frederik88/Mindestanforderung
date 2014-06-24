#pragma strict


  function OnTriggerEnter (other : Collider){
  
    if (other.gameObject.tag == "neighbour")
    Destroy(other.gameObject);
  }

