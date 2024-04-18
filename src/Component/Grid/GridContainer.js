import React, { useEffect } from "react";
import { useState } from "react";
import Grid from '../Grid/Grid';
import Header from '../Header/Header';

const VisitContext=React.createContext();
const GridInfoContext = React.createContext();

const GridContainer = (props)=>{
    const rows=20;
    const cols=40;

    let visArray = (new Array(rows)).fill().map(function(){ return new Array(cols).fill(0);});
    let weightArray=[];
    for (let i = 0; i < rows; i++) {
        weightArray.push([]);
        for (let j = 0; j < cols; j++) {
        weightArray[i].push(1);
        }
    }

    const initialStartCor={x:-1,y:-1};
    const initialEndCor={x:-1,y:-1};

    const initialCor={
        start:initialStartCor,
        end:initialEndCor
    }

    const [vis,setVis]=useState(visArray);
    const [isCord,setIsCord]=useState(false);
    const [weight,setWeight]=useState(weightArray);
    const [down, setDown] = useState(false);
    const[speed, setSpeed] = useState(1);

    const [cor,setCor]=useState(initialCor);

    useEffect(()=>{
        if(cor.start.x!=-1 && cor.end.x!=-1) setIsCord(true);
    },[cor]);
    
    const visitHandler=(row,col,value)=>{
        let newArray=[...vis];
        newArray[row][col]=value;
        setVis(newArray);
    }

    const weightHandler=(row,col,value)=>{
        let newArray=[...weight];
        newArray[row][col]=value;
        setWeight(newArray);
    }

    const mouseHandler=(curr)=>{
        setDown(curr);
    }

    const SpeedHandler = (val) => {
        setSpeed(val);
    }


    return (
      <>
        <VisitContext.Provider
            value={{
            visited:vis,  //grid array
            setVisited:visitHandler,
            weight:weight,
            setWeight:weightHandler,
            cor:cor,
            setCor:setCor,
            mouseHandler:mouseHandler,
            down: down,
            speed: speed,
            setSpeed:SpeedHandler
            }}
        >
            
                <GridInfoContext.Provider value={{ cor: cor, noRows: { rows }, noCols: { cols } }}>
                <Header typeHandler={props.typeHandler} type="grid" speed={speed} isCord={isCord}/>
                <Grid noRows={rows} noCols={cols} />
            </GridInfoContext.Provider>
        </VisitContext.Provider> 
      </>  
    );
};

export default GridContainer;
export {VisitContext,GridInfoContext};
