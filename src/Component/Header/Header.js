// import './Header.css';
import { useState } from 'react';
import AlgoOption from './AlgoOption';
import RandomGrid from '../Grid/RandomGrid';
import ClearGrid from '../Grid/ClearGrid';
import SpeedController from './SpeedController';
import GridButton from '../Grid/GridButton';
import MapButton from '../Map/MapButton';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

const Header=(props)=>{
    const [selectedAlgo,setSelectedAlgo]=useState("none");
    // const [selectedSpeed,setSelectedSpeed]=useState(500);
    
 
    const optionHandler=(option)=>{
        props.handler(option);
    }
    // const SpeedHandler=(speed)=>{
    //     setSelectedSpeed(speed);
    // }

    const AlgorithmHandler=(algorithm)=>{
        setSelectedAlgo(algorithm);
    }

    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            {/* <Container className=""> */}
                <Navbar.Brand className="mx-5" style={{fontSize : 30}}>Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto px-5">
                            <Nav.Link><AlgoOption selection={props.type} handler={props.typeHandler} optionType="container"></AlgoOption></Nav.Link>
                            <Nav.Link><AlgoOption selection={selectedAlgo} handler={AlgorithmHandler} optionType="algorithm"></AlgoOption></Nav.Link>
                        {props.type==="grid" &&
                            <>
                                <Nav.Link><GridButton selectedAlgo={selectedAlgo} isCord={props.isCord} ></GridButton></Nav.Link>
                                <Nav.Link><Form.Label className="text-white">Speed</Form.Label></Nav.Link>
                                <Nav.Link><SpeedController ></SpeedController></Nav.Link>
                                <Nav.Link><RandomGrid></RandomGrid></Nav.Link>
                                <Nav.Link><ClearGrid></ClearGrid></Nav.Link>
                            </>
                        }
                        {
                            props.type==="map" &&
                            <Nav.Link>
                                <MapButton selectedAlgo={selectedAlgo}  ></MapButton>
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
        </Navbar>

    );
}

export default Header;  