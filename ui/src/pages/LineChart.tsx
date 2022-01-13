/**
 * Note: the code in this file is BAD... it is fast and hacky to make static charts for a pdf.
 */

import React from 'react';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line';
import { Theme } from '@allenai/varnish';

import { data } from './data';

export const LineChart = () => {
    let convertedData3 = Object.entries(data['BERT LM']).map(([k, v]) => {
        return {
            id: k,
            label: (keys as any)[k] as string,
            data: v.map((v, i) => {
                return { x: i, y: v };
            }),
        };
    });

    convertedData3 = convertedData3.sort((a, b) => {
        let tot = 0;
        a.data.forEach((v) => (tot -= v.y));
        b.data.forEach((v) => (tot += v.y));
        return tot;
    });

    return (
        <ChartWrapper>
            <Title>CO2 Grams Emitted, BERT Language Modeling</Title>
            <ResponsiveLine
                // add in varnish theme at top of all charts
                {...(Theme.nivo.theme.defaults as any)}
                lineWidth={1}
                pointSize={0}
                margin={{
                    top: Theme.spacing.xs.getValue(),
                    right: Theme.spacing.xl5.getValue() + 10,
                    bottom: Theme.spacing.xl3.getValue(),
                    left: Theme.spacing.xl3.getValue(),
                }}
                enableGridY={false}
                axisLeft={{
                    legend: 'CO2 grams',
                    legendOffset: -Theme.spacing.xl2.getValue(),
                    legendPosition: 'middle',
                    format: (v: any) => `${Math.floor(v / 1000)}k`,
                }}
                axisBottom={{
                    legend: '2021',
                    legendOffset: Theme.spacing.xl2.getValue(),
                    legendPosition: 'middle',
                    format: (v: any) =>
                        [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Aug',
                            'Nov',
                            'Dec',
                        ][v],
                }}
                legends={[
                    {
                        data: convertedData3.slice().reverse(),
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 1,
                        symbolSize: 20,
                        symbolShape: ({ x, y, id }) => {
                            const s = getFromKey(id);
                            return (
                                <>
                                    <rect
                                        x={x}
                                        y={y + (20 - s.strokeWidth) / 2}
                                        fill={s.color}
                                        width={20}
                                        height={s.strokeWidth}
                                    />
                                    {s.strokeDasharray === dashed ? (
                                        <rect
                                            x={x + 7.5}
                                            y={y}
                                            fill={'white'}
                                            width={5}
                                            height={20}
                                        />
                                    ) : null}
                                </>
                            );
                        },
                    },
                ]}
                // add data
                data={convertedData3}
                layers={[
                    'grid',
                    'markers',
                    'axes',
                    'areas',
                    'crosshair',
                    'line',
                    'slices',
                    'points',
                    'mesh',
                    'legends',
                    DashedSolidLine,
                ]}
            />
        </ChartWrapper>
    );
};

const ChartWrapper = styled.div`
    height: 365px;
    max-width: 860px;
    margin: 100px;
`;

export const Title = styled.h4`
    text-align: center;
    margin-bottom: ${({ theme }) => `${theme.spacing.xs}`};
`;

const DashedSolidLine = ({ series, lineGenerator, xScale, yScale }: any) => {
    return series.map(({ id, data }: any, index: any) => (
        <path
            key={id}
            d={lineGenerator(
                data.map((d: any) => ({
                    x: xScale(d.data.x),
                    y: yScale(d.data.y),
                }))
            )}
            fill="none"
            stroke={seriesStyle[index].color}
            style={seriesStyle[index]}
        />
    ));
};

const solid = '1,0';
const dashed = '15,5';
const seriesStyle = [
    { color: Theme.darkCategoricalColor.Purple.hex, strokeDasharray: solid, strokeWidth: 2 },
    { color: Theme.lightCategoricalColor.Red.hex, strokeDasharray: dashed, strokeWidth: 2 },
    { color: Theme.darkCategoricalColor.Teal.hex, strokeDasharray: solid, strokeWidth: 2 },
    { color: Theme.lightCategoricalColor.Orange.hex, strokeDasharray: dashed, strokeWidth: 2 },
    { color: Theme.darkCategoricalColor.Blue.hex, strokeDasharray: solid, strokeWidth: 2 },
    { color: Theme.lightCategoricalColor.Green.hex, strokeDasharray: dashed, strokeWidth: 2 },
    { color: Theme.darkCategoricalColor.Magenta.hex, strokeDasharray: solid, strokeWidth: 3 },
    { color: Theme.lightCategoricalColor.Aqua.hex, strokeDasharray: dashed, strokeWidth: 2 },

    { color: Theme.lightCategoricalColor.Purple.hex, strokeDasharray: dashed, strokeWidth: 2 },
    { color: Theme.darkCategoricalColor.Red.hex, strokeDasharray: solid, strokeWidth: 3 },
    { color: Theme.lightCategoricalColor.Teal.hex, strokeDasharray: dashed, strokeWidth: 2 },
    { color: Theme.darkCategoricalColor.Orange.hex, strokeDasharray: solid, strokeWidth: 2 },
    { color: Theme.lightCategoricalColor.Blue.hex, strokeDasharray: dashed, strokeWidth: 2 },
    { color: Theme.darkCategoricalColor.Green.hex, strokeDasharray: solid, strokeWidth: 3 },
    { color: Theme.lightCategoricalColor.Magenta.hex, strokeDasharray: dashed, strokeWidth: 2 },
    { color: Theme.darkCategoricalColor.Aqua.hex, strokeDasharray: solid, strokeWidth: 4 },
];

const keys = {
    France: 'France',
    Norway: 'North Europe 1',
    Canada: 'Canada',
    'West US': 'US West 1',
    'UK South': 'UK',
    'West Europe': 'West Europe',
    'North Europe': 'North Europe 2',
    'West US3': 'US West 2',
    'West US2': 'US West 3',
    'South Central US': 'US Central 1',
    'North Central US': 'US Central 2',
    'East US': 'US East',
    Australia: 'Australia',
    'West Central US': 'US Central 3',
    Germany: 'Germany',
    'Central US': 'US Central 4',
};

const getFromKey = (key: string | number) => {
    return seriesStyle[Object.keys(keys).findIndex((k) => k === key)];
};
