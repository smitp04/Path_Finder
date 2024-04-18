import { useContext } from "react";
import { GridInfoContext, VisitContext } from '../Grid/GridContainer';
import Button from 'react-bootstrap/Button';

let generateClearGrid;

const ClearGrid=()=>{
    const visitCtx=useContext(VisitContext);
    const gridCtx=useContext(GridInfoContext);

    const noRows=gridCtx.noRows.rows;
    const noCols=gridCtx.noCols.cols;
    const cor=gridCtx.cor;

    function generate(visitCtx){
        for(let i=0;i<noRows;i++){
            for(let j=0;j<noCols;j++){
                visitCtx.setVisited(i,j,0);
                visitCtx.setWeight(i,j,1);
            }
        }
    }
    
    generateClearGrid = () => {
        generate(visitCtx);
    }

    return (
        <Button onClick={generateClearGrid}>Clear Grid </Button>
    );
}
export { generateClearGrid };
export default ClearGrid;