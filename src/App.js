import React, {useState } from "react";

import GridContainer from "./Component/Grid/GridContainer";
import LeafletMap from "./Component/Map/Leaflet";
import 'bootstrap/dist/css/bootstrap.min.css';

const App=()=>{ 
  const [containerType,setContainerType]=useState("grid");

  const containerTypeHandler=(container)=>{
    setContainerType(container);
  }

  return (
    <>
        {containerType==="grid" && <GridContainer typeHandler={containerTypeHandler}></GridContainer>}
        {containerType==="map" && <LeafletMap typeHandler={containerTypeHandler}></LeafletMap>}
    </>
  );
};


export default App;
