import React from 'react';
// import styled from 'styled-components';

// import { FunChart } from './FunChart';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import { SizeChart } from './SizeChart';
// import { SparkLineChart } from './SparkLineChart';
// import { SparkLineChart2 } from './SparkLineChart2';
// import { data } from './data';

export const Home = () => {
    /*    const keys: string[] = [
        'Canada',
        'N. Central US',
        'North Europe',
        'Norway',
        'West US',
        'W. Central US',
        'UK South',
        'Germany',
        'West US2',
        'Central US',
        'West Europe',
        'France',
        'West US3',
        'S. Central US',
        'East US',
        'Australia',
    ];

    const getConvertedData = (thisId: string) =>
        Object.entries(data['BERT LM']).map(([k, v]) => {
            return {
                id: k,
                color: k === thisId ? 'red' : 'lightGray',
                data: v.map((v, i) => {
                    return { x: i, y: v };
                }),
            };
        }); */
    return (
        <>
            <LineChart />
            <BarChart />
            <SizeChart />

            {/* <SparkGrid2>
                {Object.keys(data).map((k: string) => (
                    <SparkLineChart2 model={k} />
                ))}
            </SparkGrid2>

            <SparkGrid>
                {keys.map((k: string) => (
                    <SparkLineChart data={getConvertedData(k)} />
                ))}
            </SparkGrid>
                <FunChart /> */}
        </>
    );
};
/*
const SparkGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, auto);
`;

const SparkGrid2 = styled.div`
    display: grid;
    grid-template-columns: repeat(11, auto);
    height: 365px;
    max-width: 860px;
`; */
