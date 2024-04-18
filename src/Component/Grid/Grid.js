import Rows from './Rows';
import './Grid.css';


const Grid=(props)=>{
    
    const arr = [...Array(props.noRows).keys()].map(x => x++);
    return (
        <>
            <div className="grid m-5">
                <div className="">
                    {
                        arr.map((ele, index) => (
                            <Rows 
                                key={index}
                                rowNo={ele}
                                noCols={props.noCols}
                            ></Rows>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Grid;