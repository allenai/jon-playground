/**
 * Note: the code in this file is BAD... it is fast and hacky to make static charts for a pdf.
 *
 * This specific chart was abandoned, not used.
 */

import React from 'react';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line';
import { Theme } from '@allenai/varnish';

import { data } from './data';

export const SparkLineChart2 = ({ model }: { model: string }) => {
    let convertedData3 = Object.entries((data as any)[model]).map(([k, v]: any) => {
        return {
            id: k,
            label: (keys as any)[k] as string,
            data: v.map((v: any, i: any) => {
                return { x: i, y: Math.log10(v) };
            }),
        };
    });

    convertedData3 = convertedData3.sort((a, b) => {
        let tot = 0;
        a.data.forEach((v: any) => (tot -= v.y));
        b.data.forEach((v: any) => (tot += v.y));
        return tot;
    });

    return (
        <ChartWrapper>
            <ResponsiveLine
                // add in varnish theme at top of all charts
                {...(Theme.nivo.theme.defaults as any)}
                lineWidth={1}
                pointSize={0}
                margin={{
                    top: Theme.spacing.xs.getValue(),
                    right: Theme.spacing.xs.getValue(),
                    bottom: Theme.spacing.xs.getValue(),
                    left: Theme.spacing.xs.getValue(),
                }}
                curve="linear"
                enableGridX={false}
                enableGridY={false}
                axisLeft={null}
                axisBottom={null}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: '7.5',
                }}
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
    max-width: 100%;
    margin: 0px;
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
const dashed = solid; // '15,5';
const seriesStyle = [
    { color: Theme.darkCategoricalColor.Purple.hex, strokeDasharray: solid, strokeWidth: 1 },
    { color: Theme.lightCategoricalColor.Red.hex, strokeDasharray: dashed, strokeWidth: 1 },
    { color: Theme.darkCategoricalColor.Teal.hex, strokeDasharray: solid, strokeWidth: 1 },
    { color: Theme.lightCategoricalColor.Orange.hex, strokeDasharray: dashed, strokeWidth: 1 },
    { color: Theme.darkCategoricalColor.Blue.hex, strokeDasharray: solid, strokeWidth: 1 },
    { color: Theme.lightCategoricalColor.Green.hex, strokeDasharray: dashed, strokeWidth: 1 },
    { color: Theme.darkCategoricalColor.Magenta.hex, strokeDasharray: solid, strokeWidth: 2 },
    { color: Theme.lightCategoricalColor.Aqua.hex, strokeDasharray: dashed, strokeWidth: 1 },

    { color: Theme.lightCategoricalColor.Purple.hex, strokeDasharray: dashed, strokeWidth: 1 },
    { color: Theme.darkCategoricalColor.Red.hex, strokeDasharray: solid, strokeWidth: 2 },
    { color: Theme.lightCategoricalColor.Teal.hex, strokeDasharray: dashed, strokeWidth: 1 },
    { color: Theme.darkCategoricalColor.Orange.hex, strokeDasharray: solid, strokeWidth: 1 },
    { color: Theme.lightCategoricalColor.Blue.hex, strokeDasharray: dashed, strokeWidth: 1 },
    { color: Theme.darkCategoricalColor.Green.hex, strokeDasharray: solid, strokeWidth: 2 },
    { color: Theme.lightCategoricalColor.Magenta.hex, strokeDasharray: dashed, strokeWidth: 1 },
    { color: Theme.darkCategoricalColor.Aqua.hex, strokeDasharray: solid, strokeWidth: 2 },
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
