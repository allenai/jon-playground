/**
 * Note: the code in this file is BAD... it is fast and hacky to make static charts for a pdf.
 *
 * This specific chart was abandoned, not used.
 */

import React from 'react';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line';
import { Theme } from '@allenai/varnish';

export const SparkLineChart = ({ data }: any) => {
    return (
        <ChartWrapper>
            <ResponsiveLine
                // add in varnish theme at top of all charts
                {...(Theme.nivo.theme.defaults as any)}
                lineWidth={1}
                pointSize={0}
                colors={(d) => d.color}
                margin={{
                    top: Theme.spacing.md.getValue(),
                    right: Theme.spacing.md.getValue(),
                    bottom: Theme.spacing.md.getValue(),
                    left: Theme.spacing.md.getValue(),
                }}
                axisBottom={{
                    format: () => '',
                }}
                axisLeft={{
                    format: () => '',
                }}
                yScale={{
                    type: 'linear',
                    min: 4000,
                    max: 28000,
                }}
                // add data
                data={data}
            />
        </ChartWrapper>
    );
};

const ChartWrapper = styled.div`
    height: 200px;
    max-width: 100%;
`;
