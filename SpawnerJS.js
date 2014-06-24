#pragma strict

	public var agentPrefabs : GameObject[]; //Array für Prefabs der Agenten die gespawnt werden sollen
	public var AgentNumber : int;          // Startanzahl der Agenten  
	public var spawn : GameObject;          // Spawnpunkt
	AgentNumber = Startmenue.Agenten_Wert;
	
	//Delay für Spawn
	function MyWaitFunction (delay : float) {
		var timer = Time.time + delay;
		while (Time.time < timer) {
			yield;
		}
	}
	

	//Spawn Agent
	function SpawnAgent(){
	Instantiate(agentPrefabs[Random.Range (0,agentPrefabs.Length)],spawn.transform.position,Quaternion.identity) ;
	}

	//überprüfe ob AgentPrefab vorhaNDEN
	function CheckForAgentPrefabs() : boolean{
		if(agentPrefabs.Length > 0)
			return true;
		else return false;
	}
	
	//spawnt Startagenten
function Start () {
 	for( var cnt = 0; cnt < AgentNumber; cnt++ ){
		 yield MyWaitFunction (1.0);
    	 SpawnAgent();
    	 
    }
}

//SteeringBehavior.neighbour_list
//InGameSettings.Agenten_Wert
//agentPrefabs.Length


//Anzahl der Agenten während der Laufzeit verändern
function Update () {

	if ( InGameSettings.Agenten_Wert > SteeringBehavior.neighbour_list.Length)
 		//yield MyWaitFunction (1.0);
 		SpawnAgent();
 		
 		
 		
 	if ( InGameSettings.Agenten_Wert < SteeringBehavior.neighbour_list.Length)
 		Destroy(SteeringBehavior.neighbour_list[SteeringBehavior.neighbour_list.Length - 1]);
 		
 		
}