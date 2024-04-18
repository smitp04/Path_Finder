import Cell from "./Cell";

const Rows=(props)=>{
    const arr = [...Array(props.noCols).keys()].map(x => x++);
    return (
        <>
            <div className={`row ${props.rowNo} g-0 `}>
                {
                    arr.map((ele, index) => ( 
                        <Cell key={index} colNo={ele} rowNo={props.rowNo}></Cell>
                    )) 
                }
            </div>
        </>
    )
}

export default Rows;