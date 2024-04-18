import { useContext } from "react";
import { GridInfoContext, VisitContext } from "../Grid/GridContainer";
import { generateClearGrid } from "./ClearGrid";
import Button from 'react-bootstrap/Button';

const RandomGrid = () => {
    const visitCtx = useContext(VisitContext);
    const gridCtx = useContext(GridInfoContext);

    const noRows = gridCtx.noRows.rows;
    const noCols = gridCtx.noCols.cols;
    const cor = gridCtx.cor;


    async function generate(visitCtx) {
        for (let i = 0; i < noRows; i++) {
            for (let j = 0; j < noCols; j++) {
                let x = Math.random();
                if ((i === cor.start.x && j === cor.start.y) || (i === cor.end.x
                    && j === cor.end.y)) visitCtx.setVisited(i, j, -1);
                else if (x > 0.7) visitCtx.setVisited(i, j, -2);
                else if (x > 0.3) visitCtx.setWeight(i, j, Math.floor(Math.random() * 10) + 1); //weighted
                else visitCtx.setWeight(i, j, 1);
            }
        }
    }

    function generateRandomGrid() {
        generateClearGrid();
        generate(visitCtx);

    }
    return (
        <Button onClick={generateRandomGrid} > Generate RandomGrid </Button>
    );
}

export default RandomGrid;