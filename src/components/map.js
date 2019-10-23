import React, { useState, useEffect } from "react";
import axios from 'axios'
import axiosWithAuth from '../auth/auth';
// import { Timer } from 'react-compound-timer';
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
    const [serverData, setServerData] = useState([])
    const [currentRoomCoordinate, setCurrentRoomCoordinate] = useState([])
    const [currentID, setCurrentID] = useState("")

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
                setServerData(res.data)

                // Change (60, 60) into workable numbers
                const xCoordinate = res.data.coordinates.slice(1, -1).split(',')[0]
                const yCoordinate = res.data.coordinates.slice(1, -1).split(',')[1]
                const newRoomCoordinate = { "x": xCoordinate, "y": yCoordinate }
                setRooms([...rooms, newRoomCoordinate])
                // Set Current ID to change color
                setCurrentRoomCoordinate([{ "x": xCoordinate, "y": yCoordinate }])
                setCurrentID(res.data.room_id)

            })
            .catch(err => {
                console.log(err)
            })

        axios.get()
    }, []);

    // curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' 
    // -H "Content-Type: application/json" -d '{"direction":"n"}' 
    // https://lambda-treasure-hunt.herokuapp.com/api/adv/move/
    const travel = direction => {
        console.log("Traveling", direction)
        axiosWithAuth()
        .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', direction)
        .then(res => {
            console.log(res)
            setServerData(res.data)
            const xCoordinate = res.data.coordinates.slice(1, -1).split(',')[0]
            const yCoordinate = res.data.coordinates.slice(1, -1).split(',')[1]
            const newRoomCoordinate = { "x": xCoordinate, "y": yCoordinate }
            setRooms([...rooms, newRoomCoordinate])
            setRoads([...roads, ...currentRoomCoordinate, newRoomCoordinate])
            setCurrentRoomCoordinate([newRoomCoordinate])
            setCurrentID(res.data.room_id)

        })
        .catch(err => {
            console.log(err)
        })
    }

    console.log("ROADS", roads)

    return (
        <Container>
            <ID>
                <FlexibleXYPlot width={500} height={500}>
                    <MarkSeries data={rooms} />
                    {serverData.room_id === currentID && <MarkSeries data={currentRoomCoordinate} color="red" />}
                    {/* {roads.map(road => {
                        return <LineSeries data={roads} color="black" />;
                    })} */}
                    <LineSeries data={roads} color="black" />

                </FlexibleXYPlot>
            </ID>
            <div className='room-info'>
                <h1>Legend</h1>
                <p>Red is current position, Blue is visited rooms.</p>
                <h1>Title</h1>
                {serverData.title && <p>{serverData.title}</p>}
                <h2>Description</h2>
                {serverData.description && <p>{serverData.description}</p>}
                <h2>Items</h2>
                {serverData.items && <ul>{serverData.items.map(item => <li>{item}</li>)}</ul>}
                <h2>Exits</h2>
                {serverData.exits && serverData.exits.map(direction => {
                    if (direction === "n") {
                        return <button onClick={() => travel({ "direction": "n" })}>Travel North</button>
                    } else if (direction === "s") {
                        return <button onClick={() => travel({ "direction": "s" })}>Travel South</button>
                    } else if (direction === "e") {
                        return <button onClick={() => travel({ "direction": "e" })}>Travel East</button>
                    } else if (direction === "w") {
                        return <button onClick={() => travel({ "direction": "w" })}>Travel West</button>
                    }
                })}
                <h2>Cooldown Time</h2>
                {serverData.cooldown && <p>{serverData.cooldown} seconds</p>}
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


