import { useRef } from "react";
import Form from 'react-bootstrap/Form';

const AlgoOption = (props) => {
    const selectRef=useRef();

    const changeAlgo=()=>{
        props.handler(selectRef.current.selectedOptions[0].value);
    }
    return (
        <Form.Select ref={selectRef} onChange={changeAlgo} >
            {   props.optionType != "container" &&
                <>
                    <option value="none">Algorithm</option>
                    <option value="dijkstra">Dijkstra</option>
                    <option value="BFS">BFS</option>
                    <option value="DFS">DFS</option>
                    <option value="A*">A*</option>
                </>
            }
            {
                props.optionType==="container" &&
                <>
                    <option value="grid" selected={props.selection=="grid"}>Grid</option>
                    <option value="map" selected={props.selection=="map"}>Map</option>
                </>
            }
        </Form.Select>
    );
}

export default AlgoOption;