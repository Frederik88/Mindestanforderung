using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Spawner : MonoBehaviour {
	public enum State{
		Idle,
		Initialize,
		Setup,
		SpawnAgent
	}
	
	public GameObject[] agentPrefabs; //Array für Prefabs der Agenten die gespawnt werden sollen
	public GameObject[] spawnPoints;  //
	
	public State state;               //lokale Variable die den aktuelle State hält
	
	void Awake(){
		state = Spawner.State.Initialize;
	}
	
	
	// Use this for initialization
	IEnumerator Start () {
		while(true){
			switch(state){
			case State.Initialize:
				Initialize();
				break;
			case State.Setup:
				Setup();
				break;
			case State.SpawnAgent:
				SpawnAgent();
				break;
			}
			yield return 0;
		}
	}
	
	
	private void Initialize(){
		Debug.Log ("***We are in the Initialize function***");
		
		if(!CheckForAgentPrefabs())
			return;
		
		if(!CheckForSpawnPoints())
			return;
		
		state = Spawner.State.Setup;
	}
	
	//vergewissert sich ob alles kjorrekt ist bevor der nächste schritt kommt
	private void Setup(){
		Debug.Log ("***We are in the Setup function***");
		
		state = Spawner.State.SpawnAgent;
	}
	
	//spawnt einen agent wenn ein offener spawnpoint vorhanden
	private void SpawnAgent(){
		Debug.Log ("***spawnt Agent***");
		
		GameObject[] gos = AvailableSpawnPoints();
		
		for( int cnt = 0; cnt < gos.Length; cnt++){
			GameObject go = Instantiate(agentPrefabs[Random.Range (0,agentPrefabs.Length)],
				gos[cnt].transform.position,
				Quaternion.identity
				) as GameObject;
			go.transform.parent = gos[cnt].transform;
				
		}
		
		state = Spawner.State.Idle;
	}
	
	
    //überprüfe ob AgentPrefab vorhaNDEN
	private bool CheckForAgentPrefabs(){
		if(agentPrefabs.Length > 0)
			return true;
		else return false;
	}
	
	//überprüfe ob spawnPoint vorhaNDEN
	private bool CheckForSpawnPoints(){
		if(spawnPoints.Length > 0)
			return true;
		else return false;
	}
	
	//generiert eine liste spawnpoints das keine mobs child von spawnpoints haben
	private GameObject[] AvailableSpawnPoints(){
		List<GameObject> gos = new List<GameObject>();
		
		//iterate though our spawn points and add the ones that do not have a agent under it to the list
		for(int cnt = 0; cnt < spawnPoints.Length; cnt++){
			if(spawnPoints[cnt].transform.childCount == 0){
				Debug.Log ("***Spawn Point Available***");
				gos.Add(spawnPoints[cnt]);
			}
		}
		return gos.ToArray();
	}
}
