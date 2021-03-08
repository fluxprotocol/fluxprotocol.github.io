import React, { useEffect, useRef } from 'react';
import { ReactElement } from 'react';
import { MarketViewModel } from '../../models/Market';
import { PriceHistoryData } from '../../models/PriceHistoryData';
import { useDarkmode } from '../../utils/darkmode';
import containsNewChartData from './utils/containsNewChartData';
import generateLineChart, { generateChartData } from './utils/generateLineChart';

interface Props {
    pricesHistory: PriceHistoryData[];
    market: MarketViewModel;
}


export default function LineChart({
    pricesHistory,
    market,
}: Props): ReactElement {
    const canvas = useRef<HTMLCanvasElement>(null);
    const previousChartData = useRef<PriceHistoryData[]>([]);
    const isDarkmodeActive = useDarkmode();
    const chart = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvas.current) {
            return;
        }

        chart.current = generateLineChart(canvas.current, market);
    }, [canvas, isDarkmodeActive]);

    useEffect(() => {
        if (!chart.current) return;

        if (!containsNewChartData(previousChartData.current, pricesHistory)) {
            return;
        }

        previousChartData.current = pricesHistory;
        chart.current.data = generateChartData(pricesHistory, market);
        chart.current.update();
    }, [chart, pricesHistory, isDarkmodeActive, market]);

    return (
        <canvas ref={canvas} />
    );
}
