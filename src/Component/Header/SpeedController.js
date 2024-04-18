import { useRef } from "react";
import { useContext } from 'react';
import { VisitContext } from '../Grid/GridContainer';
import Form from 'react-bootstrap/Form'



const SpeedController = (props) => {
    const ctx = useContext(VisitContext);
    const selectRef = useRef();
    const changeSpeed = () => {
        console.log("assasdfsdfsd", selectRef.current.value);
        ctx.setSpeed(selectRef.current.value);
    }
    return (
        <div clasaName="h-100">
            <Form.Group className="h-50" as="Row">
                <Form.Range onChange={changeSpeed} id="myRange" ref={selectRef} value={ctx.speed} min="1" max="500"></Form.Range>
            </Form.Group>
        </div>
    );
}

export default SpeedController;