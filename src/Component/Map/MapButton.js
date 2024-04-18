import { useContext } from "react";
import { MapContext } from "./Leaflet";
import { mapBFS } from "../../Algorithm/MapAlgorithm/bfs";
import { mapDijkstra } from "../../Algorithm/MapAlgorithm/dijkstra";
import { mapAstar } from "../../Algorithm/MapAlgorithm/MapAstar";

import Button from 'react-bootstrap/Button';

const MapButton = (props)=>{
    const mapCtx = useContext(MapContext);
    let algorithm=props.selectedAlgo === "none"?'':props.selectedAlgo;

    function execute(){
        switch(algorithm){
            case 'none':
                alert("algorithm select karle pahle");
                break;
            case 'dijkstra':
                mapDijkstra(mapCtx);
                break;
            case 'BFS':
                mapBFS(mapCtx);
                break;
            case 'DFS':
                alert("DFS cannot be implemented");
            //     dfs(mapCtx);
                break;
            case 'A*':
                mapAstar(mapCtx);
                break;
            default:
                break;
        }
    }
    

    return (
        <Button onClick={execute} >Visualize {algorithm}</Button>
        // {/* <button class="btn btn-lg btn-primary px-4" onClick={execute}>Visualize {algorithm}</button> */}
    );
};

export default MapButton;