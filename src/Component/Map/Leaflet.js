import './map.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import Header from '../Header/Header';



const sourceIcon = new L.Icon({
   iconUrl: require("../../Images/sourceIcon.png"),
   iconSize: [40, 40],
   iconAnchor: [17, 45],
   popupAnchor: [3, -46]
});

const destIcon = new L.Icon({
   iconUrl: require("../../Images/destIcon.png"),
   iconSize: [40, 40],
   iconAnchor: [17, 45],
   popupAnchor: [3, -46]
});



const MapContext = React.createContext();
const LeafletMap = (props) => {
   const [source, setSource] = useState([23.1295773, 72.541998]);
   const [destination, setDestination] = useState([23.1296306, 72.5439978]);
   const [multiPolyline, setMultiPolyLine] = useState([]);
   const limeOptions = { color: 'lime' };
   const LineArrayHandler = (cords) => {
      setMultiPolyLine((oldArray) => {
         return [...oldArray, cords];
      });
   };

   return (
      <div>
         <MapContext.Provider value={{
            lineArray: multiPolyline,
            setLineArray: LineArrayHandler,
            source: source,
            destination: destination
         }}
         >
            <Header typeHandler={props.typeHandler} type="map"/>

            <MapContainer className='leaflet-container' center={[23.1295773, 72.5419998]} zoom={17} scrollWheelZoom={true}>
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Marker position={source} icon={sourceIcon} draggable={true} eventHandlers={{
                  click: (e) => {
                     console.log('marker clicked', e);
                  },
                  dragend: (e) => {
                     let cord = e.target._latlng;
                     console.log('source dragged', cord);               // let cord=e.cord.lat,cordoncord._latlng
                     setSource([cord.lat, cord.lng]);
                  }
               }}>
               </Marker>

               <Marker position={destination} icon={destIcon} draggable={true} eventHandlers={{
                  click: (e) => {
                     console.log('marker clicked', e);

                  },
                  dragend: (e) => {
                     let cord = e.target._latlng;
                     console.log('destination dragged', cord);
                     setDestination([cord.lat, cord.lng]);
                  }
               }}>
               </Marker>
               <Polyline pathOptions={limeOptions} positions={multiPolyline} />
            </MapContainer>
         </MapContext.Provider>
      </div>
   );
}

export default LeafletMap;
export { MapContext };