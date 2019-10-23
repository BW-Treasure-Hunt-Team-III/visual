import React, { useState, useEffect } from "react";
import { coordinates, roadsCoords } from '../coordinates';
import styled from "styled-components";
import {
    LineSeries,
    MarkSeries,
    FlexibleXYPlot,
} from "react-vis";

function Map() {
    const [rooms, setRooms] = useState([]);
    const [roads, setRoads] = useState([]);

    useEffect(() => {
        console.log("Start Code")
        setRooms(coordinates)
        setRoads(roadsCoords)
    }, []);

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
        </Container>
    );
}

export default Map;

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


