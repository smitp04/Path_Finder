import { useContext } from "react";
import { VisitContext,GridInfoContext } from "./GridContainer";
import { dijkstra } from "../../Algorithm/dijkstra";

import {bfs} from "../../Algorithm/bfs";
import {dfs} from "../../Algorithm/dfs";
import { astar } from "../../Algorithm/astar";

import Button from 'react-bootstrap/Button';

const GridButton = (props)=>{
   
    const visitCtx=useContext(VisitContext);
    const gridCtx=useContext(GridInfoContext);
    let algorithm=props.selectedAlgo === "none"?'':props.selectedAlgo;
    let speed=props.speed;
    let cor=gridCtx.cor,noRows=gridCtx.noRows.rows,noCols=gridCtx.noCols.cols;

    function clearVisited(){
        for(let i=0;i<noRows;i++){
            for(let j=0;j<noCols;j++)
                if(visitCtx.visited[i][j]< -2)
                    visitCtx.setVisited(i,j,0);
        }
            console.log("cleared");
        visitCtx.setVisited(cor.start.x,cor.start.y,-1);
        visitCtx.setVisited(cor.end.x,cor.end.y,-1);
    }

    function execute(){
        if(props.isCord){
        clearVisited();
            switch(algorithm){
                case 'none':
                    alert("Select the algorithm");
                    break;
                case 'dijkstra':
                    dijkstra(visitCtx,gridCtx,speed);
                    break;
                case 'BFS':
                    bfs(visitCtx,gridCtx,speed);
                    break;
                case 'DFS':
                    dfs(visitCtx,gridCtx,speed);
                    break;
                case 'A*':
                    astar(visitCtx,gridCtx,speed);
                    break;
                default:
                    break;
            }
        }else alert("set the cordinates");
    }

    return (
        <Button as="button" size="md" onClick={execute}> Visualize {algorithm} </Button>
    );
};

export default GridButton;