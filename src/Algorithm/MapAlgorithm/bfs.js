import { useContext } from "react";
import { getWays,getCoordinate } from "./queryFunctions";

const qop = require('@derhuerst/query-overpass');

export const mapBFS =  (mapCtx) => {
    const sourceId = 5233390625;
    const destinationId = 5204890047;//5233397149  5204890047

    let visited = new Array();
    let queue= new Array();

    const executeBFS=async()=>{
        visited[sourceId]=true;
        queue.push(sourceId);

        while(true){
            let id=queue.shift();
            if(parseInt(id)==destinationId) return;

            const y = await getWays(id);

            for(let i=0;i<y.length;i++){
                let index=y[i].nodes.indexOf(parseInt(id));
                let adjNode;
                
                let cord=await getCoordinate(id);
                if(index>0 ){
                   adjNode=y[i].nodes[index-1];
                   if(visited[adjNode]!=true){
                        visited[adjNode]=true;
                       queue.push(adjNode);

                       let adjCord=await getCoordinate(adjNode);
                       mapCtx.setLineArray([cord,adjCord]);
                       if(adjNode==destinationId) return;   
                   }
                }
                if(index<y[i].nodes.length-1){
                   adjNode=y[i].nodes[index+1];
                   if(visited[adjNode]!=true){
                       visited[adjNode]=true;
                       queue.push(adjNode);
                       
                       let adjCord=await getCoordinate(adjNode);
                       mapCtx.setLineArray([cord,adjCord]);
                       if(adjNode==destinationId) return;   
                   }
                }
             }

        }
    }
    executeBFS();
};
