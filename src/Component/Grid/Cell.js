import { useContext } from 'react';
import { VisitContext } from './GridContainer';
import './Cell.css';


const Cell = (props) => {

    const ctx = useContext(VisitContext);

    let isTerminal = "";
    let row = props.rowNo, col = props.colNo;

    if ((ctx.cor.start.x === row && ctx.cor.start.y === col) ||
        (ctx.cor.end.x === row && ctx.cor.end.y === col)) {
            console.log(ctx.visited);
        isTerminal = "terminal"
    }

    let color='';
    let colorArray=["#c6f7f1","#b6fcf3","#9bfaed","#81fcec","#54ebd7","#48dbc8","#2eab9a","#09695d","#09695e","#09695e"];
    let vis="";
    if(ctx.visited[row][col]=== -3){ //visited 
        color="yellow";
        vis="anime";
    }
    else if (ctx.visited[row][col] === -2)
        color = "#1f0914";  //block
    else if (ctx.visited[row][col] === -1)
        color = "selmon"; //end point
    else if (ctx.visited[row][col] === -4)
        color = "green";  //path
    else if (ctx.weight[row][col] > 1)
        color = colorArray[ctx.weight[row][col] - 1]; // weighted block

    return (
        <>
            <div      
                className={`col ${row}_${col} ${isTerminal}`} 
                onMouseDown={()=>ctx.mouseHandler(true)}
                onMouseUp={()=>ctx.mouseHandler(false)}
                onMouseOver={()=>ctx.down?ctx.setVisited(row,col,-2):ctx.down}
                onClick={(() => { 
                    if(ctx.cor.start.x==row && ctx.cor.start.y==col){
                        let cor={...ctx.cor,start:{x:-1,y:-1}};
                        ctx.setCor(cor);
                        ctx.setWeight(row,col,1);
                    }
                    else if(ctx.cor.end.x==row && ctx.cor.end.y==col){
                        let cor={...ctx.cor,end:{x:-1,y:-1}};
                        ctx.setCor(cor);
                        ctx.setWeight(row,col,1);
                    }
                    else if(ctx.cor.start.x==-1){
                        console.log('hi');
                        let cor={...ctx.cor,start:{x:row,y:col}} 
                        ctx.setCor(cor);
                        ctx.setWeight(row,col,1);
                    }else if(ctx.cor.end.x==-1){
                        let cor={...ctx.cor,end:{x:row,y:col}} 
                        ctx.setCor(cor);
                        ctx.setWeight(row,col,1);
                    }
                    else if (ctx.visited[row][col] == 0) {
                        console.log("clicked");
                        ctx.setVisited(row, col, -2);
                    }
                    else {
                        ctx.setVisited(row,col,0);
                    }
                })}

                style={{
                    backgroundColor: color,
                }}
            >

                <div className={`${vis} cell`} > </div>
            </div>
        </>
    )
}

export default Cell;