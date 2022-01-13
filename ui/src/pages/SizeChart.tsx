/**
 * Note: the code in this file is BAD... it is fast and hacky to make static charts for a pdf.
 */

import React from 'react';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line';
import { Theme } from '@allenai/varnish';

import { Title } from './LineChart';
import { tickFormat } from './BarChart';

export const sizeData = [
    { id: 'Phone\ncharge', value: 7.46, y: 1.5, icon: 'phone2.svg' },
    { id: 'Mile\ndrive', value: 361, y: 1.5, icon: 'mileDriven.svg' },
    // { id: 'lb of coal', value: 821, y: 10, icon:"coal.svg" },
    // { id: 'therm of natural gas', value: 4808, y: 4, icon:"therm.svg" },
    // {id: 'an urban tree sequesters/year', value: 5443, y: 1, icon:".svg"},
    { id: 'Gallon of\ngasoline', value: 8062, y: 1.5, icon: 'gasoline2.svg' },
    // {id: 'gallon of diesel', value: 9235, y: 10, icon:".svg"},
    // {id: 'propane used for barbecues/year/house', value: 21772, y: 1, icon:".svg"},
    // {id: 'light bulb replaced sequesters/year', value: 23949, y: 1, icon:".svg"},
    // { id: 'Mcf of natural gas', value: 49713, y: 4, icon:".svg" },
    { id: 'Barrel\nof oil', value: 390089, y: 1.5, icon: 'oil.svg' },
    // {id: 'acre of trees sequesters/year': 743891, y: 1, icon:".svg"},
    // { id: 'vehicle/year', value: 4173051, y: 10, icon:"car.svg" },
    // {id: 'electricity of home/year', value: 4994053, y: 4, icon:".svg"},
    { id: 'Yearly home\nenergy', value: 7529635, y: 1.5, icon: 'house2.svg' },
    // {id: 'tanker truck of gasoline', value: 68528754, y: 10, icon:"oilTanker.svg"},
    { id: 'Rail car\nof coal', value: 164381922, y: 1.5, ypad: 14, icon: 'coalTrain.svg' },
];
// from: https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references

export const refinedData = [
    {
        id: 'a',
        data: sizeData.map((d) => {
            return { x: d.value, y: d.y, label: d.id, icon: d.icon, ypad: d.ypad };
        }),
    },
];

/*
17.80 'Densenet 201 on'
6783437.5 '6.1B params LM.'
18293.85 'BERT LM'
1069.92 'Vision Transformer small.'
1546.68 'BERT finetune'
13.47 'Densenet 169 on'
2285.04 'Vision Transformer base.'
822.09 'Vision Transformer tiny.'
116748.33 'Vision Transformer huge.'
9.92 'Densenet 121 on'
45801.82 'Vision Transformer large.'
*/
export const SizeChart = () => {
    return (
        <ChartWrapper>
            <Title>CO2 Relative Size Comparison</Title>
            <ResponsiveLine
                // add in varnish theme at top of all charts
                {...(Theme.nivo.theme.defaults as any)}
                margin={{
                    top: Theme.spacing.md.getValue(),
                    right: Theme.spacing.sm.getValue() + 10,
                    bottom: Theme.spacing.xl2.getValue(),
                    left: Theme.spacing.sm.getValue(),
                }}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: 'rgb(119,119,119)',
                                strokeWidth: 1,
                            },
                        },
                    },
                }}
                enableGridX={false}
                enableGridY={false}
                axisLeft={null}
                xScale={{
                    type: 'log',
                    base: 10,
                    min: 1,
                    max: 1000000000,
                }}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 2.5,
                }}
                axisBottom={{
                    legend: 'CO2 grams (log)',
                    legendOffset: Theme.spacing.xl.getValue(),
                    legendPosition: 'middle',
                    tickValues: [
                        1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000,
                    ],
                    format: tickFormat,
                }}
                // add data
                data={refinedData}
                layers={[
                    'grid',
                    'markers',
                    'axes',
                    CustomLayer,
                    'areas',
                    'crosshair',
                    'line',
                    'slices',
                    'mesh',
                    'legends',
                ]}
            />
        </ChartWrapper>
    );
};

const CustomLayer = ({ series }: any) => {
    const height = 60;
    const width = 60;
    return series.map(({ id, data }: any) => (
        <svg
            key={id}
            width="100%"
            height="100%"
            viewBox="0 0 860 200"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            {data.map((d: any) => {
                const ls = d.data.label.split('\n');
                return (
                    <>
                        <line
                            stroke="#265ED4"
                            x1={d.position.x}
                            y1={d.position.y + height / 2}
                            x2={d.position.x}
                            y2={d.position.y + height / 2 + 53}
                        />
                        <image
                            x={d.position.x - width / 2}
                            y={d.position.y - height / 2 - d.data.ypad}
                            width={width}
                            height={height}
                            href={d.data.icon}
                        />
                        <rect
                            fill="white"
                            x={d.position.x - width / 2 - 10}
                            y={d.position.y + height / 2 + 2}
                            width={width + 20}
                            height={30}
                        />
                        <text
                            fill="#265ED4"
                            text-anchor="middle"
                            x={d.position.x}
                            y={d.position.y + height / 2 + 2}
                            width={width}>
                            {ls[0]}
                        </text>
                        <text
                            fill="#265ED4"
                            text-anchor="middle"
                            x={d.position.x}
                            y={d.position.y + height / 2 + 21}
                            width={width}>
                            {ls[1]}
                        </text>
                    </>
                );
            })}
        </svg>
    ));
};

const ChartWrapper = styled.div`
    height: 200px;
    max-width: 860px;
    margin-left: 110px;
`;
