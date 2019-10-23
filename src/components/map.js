import React, { useState, useEffect } from "react";
import axios from 'axios'
import axiosWithAuth from '../auth/auth';
import Timer from 'react-compound-timer';
import styled from "styled-components";
import {
    LineSeries,
    MarkSeries,
    FlexibleXYPlot,
} from "react-vis";

function Mapping() {
    const [rooms, setRooms] = useState([]);
    const [roads, setRoads] = useState([]);
    const [serverData, setServerData] = useState([])
    const [currentRoomCoordinate, setCurrentRoomCoordinate] = useState([])
    const [currentID, setCurrentID] = useState("")
    const [status, setStatus] = useState({})
    const [nameSuccess, setNameSuccess] = useState(false)
    const [praySuccess, setPraySuccess] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    useEffect(() => {
        
        // If we have an array of coordinates already in localStorage,
        // it means this is not a new game

        // if(localStorage.getItem('storedRooms').length > 0) {

        //     // get the stored rooms and return it to array form
        //     const storedRooms = JSON.parse(localStorage.getItem('storedRooms'))
        //     setRooms(storedRooms)
        // }

        // curl -X GET -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' 
        // https://lambda-treasure-hunt.herokuapp.com/api/adv/init/
        axiosWithAuth()
            .get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/')
            .then(res => {
                // console.log(res.data)
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
        // console.log("Traveling", direction)
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', direction)
            .then(res => {
                console.log(res)
                console.log("cooldown", res.data.cooldown)
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

    // curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H 
    // "Content-Type: application/json" -d '{"name":"treasure"}' 
    // https://lambda-treasure-hunt.herokuapp.com/api/adv/take/
    const pickup = () => {
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/take/', { "name": "treasure" })
            .then(res => {
                console.log(res)
                setServerData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // You may drop items with the following command:
    // curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' 
    // -H "Content-Type: application/json" -d '{"name":"treasure"}' 
    // https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/
    const drop = () => {
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/', { "name": "treasure" })
            .then(res => {
                console.log(res)
                setServerData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Sell Treasure at Shop
    // curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H 
    // "Content-Type: application/json" -d '{"name":"treasure"}' 
    // https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/
    const sell = () => {
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/', { "name": "treasure" })
            .then(res => {
                console.log(res)
                setServerData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H 
    // "Content-Type: application/json" -d '{"name":"treasure", "confirm":"yes"}' 
    // https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/
    const confirmSell = () => {
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/', { "name": "treasure", "confirm": "yes" })
            .then(res => {
                console.log(res)
                setServerData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' 
    // -H "Content-Type: application/json" 
    // https://lambda-treasure-hunt.herokuapp.com/api/adv/status/
    const viewStatus = () => {
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/status/')
            .then(res => {
                console.log(res)
                setStatus(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H 
    // "Content-Type: application/json" -d '{"name":"[NEW NAME]"}' 
    // https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/

    const changeName = () => {
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/status/', { "name": "[Nguyen Anh Vo]" })
            .then(res => {
                console.log(res)
                setNameSuccess(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' 
    // -H "Content-Type: application/json" 
    // https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/
    const pray = () => {
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/')
            .then(res => {
                console.log(res)
                setPraySuccess(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // It should pull from localStorage any savedRooms and/or savedRoads
    // parse them JSON.parse() and set them to state to be re-rendered
    const saveData = () => {
        console.log("SAVE DATA")

        if(rooms.length > 0 && roads.length > 0) {
            const roomString = JSON.stringify(rooms)
            const roadString = JSON.stringify(roads)
            localStorage.setItem("storedRooms", roomString)
            localStorage.setItem("storedRoads", roadString)
            setSaveSuccess(true)
            console.log(roomString)
            console.log(roadString)
        }
    }

    // Stores what we have inside rooms and roads inside localStorage
    // We will need to stringify the data using JSON.stringify()
    const loadData = () => {
        console.log("LOAD DATA")

        if(localStorage.getItem("storedRooms") && localStorage.getItem("storedRoads")) {
            const storedRooms =  localStorage.getItem("storedRooms")
            const storedRoads = localStorage.getItem("storedRoads")
            console.log(storedRooms)
            console.log(storedRoads)
            setRooms(storedRooms)
            setRoads(storedRoads)
        }
        
        
    }

    return (
        <Container>
            <ID>
                <FlexibleXYPlot width={500} height={500}>
                    <MarkSeries data={rooms} />
                    {serverData.room_id === currentID && <MarkSeries data={currentRoomCoordinate} color="red" />}
                    {/* {roads.map(road => {
                        return <LineSeries data={road} color="black" style={{ fill: 'none' }}/>;
                    })} */}
                    <LineSeries data={roads} color="black" style={{ fill: 'none' }} />

                </FlexibleXYPlot>
            </ID>
            <Game>
                <h1>Legend</h1>
                <p>Red is current position, Blue is visited rooms.</p>
                {saveSuccess ? <p>Game Saved Successfully.</p> : <p>Game not saved yet.</p>}
                <button onClick={saveData}>Save Progress</button>
                <button onClick={loadData}>Load Data</button>

                <h2>Title</h2>
                {serverData.coordinates && <p><b>Current Coordinates:</b> {serverData.coordinates}</p>}
                {serverData.title && <p>{serverData.title}</p>}
                {serverData.description && <p>{serverData.description}</p>}
                <h2>Cooldown Time</h2>
                Timer: <Timer>
                    <Timer.Seconds />
                </Timer>
                {serverData.cooldown && <p>Cooldown: {serverData.cooldown} seconds</p>}

                <h2>Message</h2>
                {serverData.messages && serverData.messages.map(message => <p>{message}</p>)}

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

                <h2>Items</h2>
                {serverData.items && <ul>{serverData.items.map(item => <li>{item}</li>)}</ul>}
                {serverData.items && <button onClick={pickup}>Pickup Items</button>}
                {serverData.items && <button onClick={drop}>Drop Items</button>}
                {serverData.items && <button onClick={sell}>Sell Items</button>}
                {serverData.items && <button onClick={confirmSell}>Confirm Sell Items</button>}

                <h2>Hero Info</h2>
                {status.name && <p>
                    {`Name: ${status.name}, 
                    Gold: ${status.gold},
                    Encumbrance/Strength/Speed: ${status.encumbrance}/${status.strength}/${status.speed}`}
                </p>
                }
                {status.inventory && status.inventory.map(item => {
                    return `${item} `
                })}
                <button onClick={viewStatus}>Check Status</button>
                <button onClick={pray}>Pray to the Gawdess</button>
                {praySuccess && <p>The Gawdess is pleased. Now, get back to werk!</p>}
                
                <h2>Name Changer</h2>
                {nameSuccess ? <p>You have a name now, but at what cost?</p> : <p>A girl has no name.</p>}
                <button onClick={changeName}>Change Your Name using 1000G</button>
            </Game>

        </Container>
    );
}

export default Mapping;

const Container = styled.section`
  width: 100%;
  height: 0 auto;
  display: flex;
  flex-direction: flex-start;
  justify-content: space-around;
`;

const ID = styled.div`
  border: 5px dashed #fe50c2;
  padding-top: 25px;
  width:50%
`;

const Game = styled.div`
  width:30%
`;


