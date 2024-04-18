import { getWays,getCoordinate, getDistance } from "./queryFunctions";

export const mapAstar =  (mapCtx) => {
   const sourceId = 5233390625;
   const destinationId = 5204890047;
   let destinationCords,sourceCords;
   let visited=new Array();
   let distance =new Array(); 
   let parent = new Array();
   let cords = new Array();

   const findMinVertex=(distance)=>{
      let minVertex,minDist=Number.MAX_SAFE_INTEGER;
   
      for (const key in distance) {
         if (visited[key] != true) {
            const value = distance[key] + getDistance([cords[key].lat, cords[key].lon], destinationCords);

            if(value<minDist){
               minDist=value;
               minVertex=key;
            }
         }
      }
      return minVertex;
   }


   async function executeAstar() {
      destinationCords = await getCoordinate(destinationId);
      sourceCords = await getCoordinate(sourceId);
      
      cords[sourceId] = {lat :sourceCords[0], lon : sourceCords[1]};
      distance[sourceId] = 0;
      
      while(true){
         let u = findMinVertex(distance);
     
         let cord=await getCoordinate(u);
         if(parent[u]){
            mapCtx.setLineArray([cord,parent[u]]); 
         }
         if(parseInt(u) === destinationId) return;

         visited[u]=true;
         const y = await getWays(u);

         for(let i=0; i<y.length; i++){
            let index=y[i].nodes.indexOf(parseInt(u));
            let adjNode;
            
            if(index > 0){
               adjNode = y[i].nodes[index - 1];
               let adjNodeCord = y[i].geometry[index - 1];
               cords[adjNode] = adjNodeCord;

               if (distance[adjNode] === undefined) {
                  distance[adjNode] = distance[u] + getDistance(cord, [adjNodeCord.lat, adjNodeCord.lon]);
               } else {
                  distance[adjNode] = Math.min(distance[adjNode] , distance[u] + getDistance(cord,[adjNodeCord.lat,adjNodeCord.lon]));
               }
               parent[adjNode]= cord;
               
            }
            if(index<y[i].nodes.length-1){
               adjNode=y[i].nodes[index+1];
               let adjNodeCord = y[i].geometry[index + 1];
               cords[adjNode] = adjNodeCord;
      
               if (distance[adjNode] === undefined) {
                  distance[adjNode] = distance[u] + getDistance(cord, [adjNodeCord.lat, adjNodeCord.lon]);
               } else {
                  distance[adjNode] = Math.min(distance[adjNode] , distance[u] + getDistance(cord,[adjNodeCord.lat,adjNodeCord.lon]));
               }
               parent[adjNode]=cord;
            }
         }

      }
     
   }
   executeAstar();
};