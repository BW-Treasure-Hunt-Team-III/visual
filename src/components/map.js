import React, { useState, useEffect } from "react";
import axios from 'axios'
import axiosWithAuth from '../auth/auth';
// import { coordinates, roadsCoords } from '../coordinates';
import styled from "styled-components";
import {
    LineSeries,
    MarkSeries,
    FlexibleXYPlot,
} from "react-vis";

// Add a request interceptor - use your own API Keys
// axios.interceptors.request.use(function (config) {
//     const token = `Token df3a9ea1d4d5804d830fe93267242281cedd59ec`;
//     config.headers.Authorization =  token;
//     config.headers['Content-Type'] = "application/json";
//     return config;
// });


function Mapping() {
    const [rooms, setRooms] = useState([]);
    const [roads, setRoads] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([])

    useEffect(() => {
        console.log("Start Code")
        // setRooms(coordinates)
        // setRoads(roadsCoords)

        // curl -X GET -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' 
        // https://lambda-treasure-hunt.herokuapp.com/api/adv/init/
        axiosWithAuth()
            .get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/')
            .then(res => {
                console.log(res.data)
                setCurrentRoom(res.data)
                let cordX = parseInt(res.data.coordinates[1])
                let cordY = parseInt(res.data.coordinates[2])
                console.log(cordX, cordY)
            })
            .catch(err => {
                console.log(err)
            })

        axios.get()
    }, []);

    const travel = direction => {
        console.log("Traveling")
    }

    return (
        <Container>
            <ID>
                <FlexibleXYPlot width={500} height={500}>
                    <MarkSeries data={rooms} />
                    {/* <MarkSeries data={users.cords} color="yellow" /> */}
                    {roads.map(road => {
                        return <LineSeries data={roads} color="#59c2fe" />;
                    })}
    
                </FlexibleXYPlot>
            </ID>
            <div className='room-info'>
                <h1>Title</h1>
                {currentRoom.title && <p>{currentRoom.title}</p>}
                <h2>Description</h2>
                {currentRoom.description && <p>{currentRoom.description}</p>}
                <h2>Items</h2>
                {currentRoom.items && <ul>{currentRoom.items.map(item => <li>{item}</li>)}</ul>}
                <h2>Exits</h2>
                {currentRoom.exits && currentRoom.exits.map(direction => {
                    if(direction === "n") {
                        return <button onClick={() => travel({"direction":"n"})}>Travel North</button>
                    } else if(direction === "s") {
                        return <button onClick={() => travel({"direction":"s"})}>Travel South</button>
                    } else if(direction === "e") {
                        return <button onClick={() => travel({"direction":"e"})}>Travel East</button>
                    } else if (direction === "w") {
                        return <button onClick={() => travel({"direction":"w"})}>Travel North</button>
                    }
                })}

            </div>
        </Container>
    );
}

export default Mapping;

const Container = styled.section`
  width: 100%;
  height: 0 auto;
  display: flex;
  flex-direction: flex-start;
  justify-content: space-between;
  margin-left: 20px;
`;

const ID = styled.div`
  border: 5px dashed #fe50c2;
  padding-right: 40px;
  padding-top: 25px;
`;


