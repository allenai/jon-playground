/**
 * Note: the code in this file is BAD... it is fast and hacky to make static charts for a pdf.
 *
 * This specific chart was abandoned, not used.
 */

import React from 'react';
import styled from 'styled-components';
import { ResponsiveFunnel } from '@nivo/funnel';
import { Theme } from '@allenai/varnish';

const data = [
    { id: 'cell phone charge', value: 7.46, color: Theme.lightCategoricalColor.Aqua.hex },
    { id: 'driven mile', value: 361, color: Theme.lightCategoricalColor.Blue.hex },
    { id: 'lb of coal', value: 821, color: Theme.lightCategoricalColor.Green.hex },
    { id: 'therm of natural gas', value: 4808, color: Theme.lightCategoricalColor.Magenta.hex },
    // {id: 'an urban tree sequesters/year', value: 5443, color: Theme.lightCategoricalColor.Aqua.hex},
    { id: 'gallon of gasoline', value: 8062, color: Theme.lightCategoricalColor.Orange.hex },
    // {id: 'gallon of diesel', value: 9235, color: Theme.lightCategoricalColor.Aqua.hex},
    // {id: 'propane used for barbecues/year/house', value: 21772, color: Theme.lightCategoricalColor.Aqua.hex},
    // {id: 'light bulb replaced sequesters/year', value: 23949, color: Theme.lightCategoricalColor.Aqua.hex},
    { id: 'Mcf of natural gas', value: 49713, color: Theme.lightCategoricalColor.Purple.hex },
    { id: 'barrel of oil', value: 390089, color: Theme.lightCategoricalColor.Red.hex },
    // {id: 'acre of trees sequesters/year': 743891, color: Theme.lightCategoricalColor.Aqua.hex},
    { id: 'vehicle/year', value: 4173051, color: Theme.lightCategoricalColor.Teal.hex },
    // {id: 'electricity of home/year', value: 4994053, color: Theme.lightCategoricalColor.Aqua.hex},
    { id: 'all energy of home/year', value: 7529635, color: Theme.darkCategoricalColor.Aqua.hex },
    // {id: 'tanker truck of gasoline', value: 68528754, color: Theme.lightCategoricalColor.Aqua.hex},
    // {id: 'rail car of coal', value: 164381922, color: Theme.lightCategoricalColor.Aqua.hex},
];
// from: https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references

const ds = [
    [data[0]],
    [data[0], data[1]],
    [data[1], data[2]],
    [data[2], data[3]],
    [data[3], data[4]],
    [data[4], data[5]],
    [data[5], data[6]],
    [data[6], data[7]],
    [data[7], data[8]],
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
export const FunChart = () => {
    return (
        <ChartWrapper>
            <FunnelRow>
                {ds.map((v: any, i: number) => (
                    <SmallFunnel data={v} key={i} />
                ))}
            </FunnelRow>
        </ChartWrapper>
    );
};

export const SmallFunnel = ({ data }: any) => {
    return (
        <FunnelWrapper>
            <ResponsiveFunnel
                // add in varnish theme at top of all charts
                {...(Theme.nivo.theme.defaults as any)}
                data={data}
                colors={(d: any) => d.color}
                margin={{ top: 0, right: 0, bottom: 0, left: 8 }}
                direction="horizontal"
                valueFormat=">-.4s"
                borderWidth={1}
                labelColor={{ from: 'color', modifiers: [['darker', 3]] }}
                enableBeforeSeparators={false}
                enableAfterSeparators={false}
                currentBorderWidth={40}
            />
        </FunnelWrapper>
    );
};

const ChartWrapper = styled.div`
    height: 365px;
    max-width: 860px;
`;

const FunnelWrapper = styled.div`
    height: 100px;
    max-width: 860px;
`;

const FunnelRow = styled.div`
    display: grid;
    grid-template-columns: repeat(9, auto);
    max-width: 100%;
`;
