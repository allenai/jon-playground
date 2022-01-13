/**
 * Note: the code in this file is BAD... it is fast and hacky to make static charts for a pdf.
 */

import React from 'react';
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';
import { Theme } from '@allenai/varnish';
import { linearGradientDef } from '@nivo/core';

import { Title } from './LineChart';

import { data } from './data';
import { sizeData } from './SizeChart';

const models = {
    'BERT finetune': 'BERT\nfinetune',
    'BERT LM': 'BERT\nLM',
    '6.1B params LM.': '6B\ntransf',
    'Densenet 121 on': 'Dense\n121',
    'Densenet 169 on': 'Dense\n169',
    'Densenet 201 on': 'Dense\n201',
    'Vision Transformer tiny.': 'ViT\ntiny',
    'Vision Transformer small.': 'ViT\nsmall',
    'Vision Transformer base.': 'ViT\nbase',
    'Vision Transformer large.': 'ViT\nlarge',
    'Vision Transformer huge.': 'ViT\nhuge',
};

export const BarChart = () => {
    const convertedDataStats = Object.keys(models).map((model) => {
        let min = 999999999;
        let max = -999999999;
        let average = 0;
        let count = 0;
        let all: number[] = [];
        Object.entries((data as any)[model]).forEach(([_, v]: any) => {
            v.forEach((v: any) => {
                min = Math.min(min, v);
                max = Math.max(max, v);
                average += v;
                count++;
                all.push(Number(v));
            });
        });
        all = all.sort((a, b) => Number(a) - Number(b));
        const mid = Math.round(all.length / 2);
        const bottom = all.slice(0, mid);
        const median = all[mid];
        const top = all.slice(mid);
        const bottomAve = bottom.reduce((a, b) => a + b, 0) / bottom.length;
        const topAve = top.reduce((a, b) => a + b, 0) / top.length;
        return {
            id: model,
            label: (models as any)[model],
            min,
            max,
            average: average / count,
            median,
            bottomAve,
            topAve,
        };
    });

    const dataRollup: any = convertedDataStats.map((model) => {
        return {
            id: model.label,
            placeholder: model.min,
            q1: model.bottomAve - model.min,
            q2: model.median - model.bottomAve,
            q3: model.topAve - model.median,
            q4: model.max - model.topAve - 1,
        };
    });
    dataRollup.push({
        id: '.',
        phone: sizeData[0].value,
        mile: sizeData[1].value,
        gas: sizeData[2].value,
        oil: sizeData[3].value,
        home: sizeData[4].value,
        coal: sizeData[5].value,
        data: {
            phone: sizeData[0],
            mile: sizeData[1],
            gas: sizeData[2],
            oil: sizeData[3],
            home: sizeData[4],
            coal: sizeData[5],
        },
    });

    return (
        <ChartWrapper>
            <Title>Emissions of 11 models</Title>
            <ResponsiveBar
                // add in varnish theme at top of all charts
                {...(Theme.nivo.theme.defaults as any)}
                keys={[
                    'placeholder',
                    'q1',
                    'q2',
                    'q3',
                    'q4',
                    'phone',
                    'mile',
                    'gas',
                    'oil',
                    'home',
                    'coal',
                ]}
                indexBy="id"
                margin={{
                    top: Theme.spacing.sm.getValue(),
                    right: Theme.spacing.sm.getValue(),
                    bottom: Theme.spacing.xl5.getValue(),
                    left: Theme.spacing.xl4.getValue(),
                }}
                enableGridY={true}
                enableGridX={true}
                axisLeft={{
                    tickValues: [
                        0, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000,
                    ],
                    legend: 'CO2 grams (log)',
                    legendOffset: -Theme.spacing.xl3.getValue(),
                    legendPosition: 'middle',
                    format: tickFormat,
                }}
                axisBottom={{
                    legend: 'Model',
                    legendPosition: 'middle',
                    legendOffset: Theme.spacing.xl2.getValue(),
                    renderTick: HorizontalTick,
                    format: (v) => {
                        return v === '.' ? 'tt' : 'tt' + v;
                    },
                }}
                valueScale={{ type: 'symlog' }}
                enableLabel={false}
                defs={[
                    linearGradientDef('gradientq4', [
                        { offset: 0, color: Theme.color.B3.hex },
                        { offset: 100, color: Theme.color.B3.hex },
                    ]),
                    linearGradientDef('gradientq3', [
                        { offset: 0, color: Theme.color.B6.hex },
                        { offset: 85, color: Theme.color.B6.hex },
                        { offset: 85, color: Theme.color.B9.hex },
                        { offset: 100, color: Theme.color.B9.hex },
                    ]),
                    linearGradientDef('gradientq2', [
                        { offset: 0, color: Theme.color.B9.hex },
                        { offset: 15, color: Theme.color.B9.hex },
                        { offset: 15, color: Theme.color.B6.hex },
                        { offset: 100, color: Theme.color.B6.hex },
                    ]),
                    linearGradientDef('gradientq1', [
                        { offset: 0, color: Theme.color.B3.hex },
                        { offset: 100, color: Theme.color.B3.hex },
                    ]),
                    linearGradientDef('none', [
                        { offset: 0, color: 'transparent' },
                        { offset: 100, color: 'transparent' },
                    ]),
                ]}
                fill={[
                    { match: { id: 'q1' }, id: 'gradientq1' },
                    { match: { id: 'q2' }, id: 'gradientq2' },
                    { match: { id: 'q3' }, id: 'gradientq3' },
                    { match: { id: 'q4' }, id: 'gradientq4' },
                    { match: '*', id: 'none' },
                ]}
                // add data
                data={dataRollup}
                layers={['grid', 'axes', CustomSizeLayer, 'bars', 'mesh']}
            />
        </ChartWrapper>
    );
};

const CustomSizeLayer = (v: any) => {
    const height = 30;
    const width = 30;
    const dd = ['phone', 'mile', 'gas', 'oil', 'home', 'coal'].map((val) => {
        const specific = v.bars.find((v: any) => v.key === val + '..');
        return {
            id: val,
            label: specific.data.data.data[val].id,
            icon: specific.data.data.data[val].icon,
            position: { x: specific.x, y: specific.y },
            yPad: val === 'coal' ? 8 : 0, // yPad: val === 'home' ? 7 : 0,
            yPadText: 0, // yPad: val === 'home' ? 7 : 0,
        };
    });
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 860 600"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <rect
                fill="white"
                x={dd[0].position.x - width / 2 - 15}
                y={0}
                width={width + 65}
                height={580}
            />
            {dd.map((d: any) => {
                const ls = d.label.split('\n');
                return (
                    <>
                        {/* <rect fill="white" x={d.position.x-width/2-15} y={d.position.y+height/2+d.yPad} width={width+60+d.textXPad} height={40} />
                         */}
                        <line
                            stroke="#265ED4"
                            x1={d.position.x - 8}
                            y1={d.position.y}
                            x2={0}
                            y2={d.position.y}
                        />
                        <image
                            x={d.position.x}
                            y={d.position.y - height / 2 + d.yPad}
                            width={width}
                            height={height}
                            href={d.icon}
                        />
                        <text
                            fill="#47515C"
                            text-anchor="middle"
                            font-size="12px"
                            x={d.position.x + width / 2}
                            y={d.position.y + height / 2 + 17 + d.yPadText}
                            width={width}>
                            {ls[0]}
                        </text>
                        <text
                            fill="#47515C"
                            text-anchor="middle"
                            font-size="12px"
                            x={d.position.x + width / 2}
                            y={d.position.y + height / 2 + 30 + d.yPadText}
                            width={width}>
                            {ls[1]}
                        </text>
                    </>
                );
            })}
        </svg>
    );
};

const HorizontalTick = ({ textAnchor, textBaseline, value, x, y }: any) => {
    const MAX_LINE_LENGTH = 16;
    const MAX_LINES = 2;
    const LENGTH_OF_ELLIPSIS = 3;
    const TRIM_LENGTH = MAX_LINE_LENGTH * MAX_LINES - LENGTH_OF_ELLIPSIS;
    const trimWordsOverLength = new RegExp(`^(.{${TRIM_LENGTH}}[^\\w]*).*`);
    const groupWordsByLength = new RegExp(`([^\\s].{0,${MAX_LINE_LENGTH}}(?=[\\s\\W]|$))`, 'gm');
    const splitValues = value
        .replace(trimWordsOverLength, '$1...')
        .match(groupWordsByLength)
        .slice(0, 2)
        .map((val: any, i: number) => (
            <tspan
                key={val}
                dy={3 * i + 14}
                x={0}
                style={{ fontFamily: 'sans-serif', fontSize: '13px' }}>
                {val}
            </tspan>
        ));
    return (
        <g transform={`translate(${x},${y})`}>
            <text alignmentBaseline={textBaseline} textAnchor={textAnchor}>
                {splitValues}
            </text>
        </g>
    );
};

export const tickFormat = (d: number) => {
    const array = ['', 'k', 'M', 'B', 'T'];
    let i = 0;
    while (d >= 1000) {
        i++;
        d = d / 1000;
    }

    const ret = d + ' ' + array[i];

    return ret;
};

const ChartWrapper = styled.div`
    height: 600px;
    max-width: 860px;
    margin: 100px;
`;
