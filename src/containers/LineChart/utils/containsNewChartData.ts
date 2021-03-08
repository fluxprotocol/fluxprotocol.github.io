import { PriceHistoryData } from "../../../models/PriceHistoryData";

export default function containsNewChartData(prev: PriceHistoryData[], current: PriceHistoryData[]): boolean {
    if (prev.length !== current.length) {
        return true;
    }

    for (let index = 0; index < prev.length; index++) {
        const prevItem = prev[index];
        const currItem = current[index];

        // First check for point keys
        if (prevItem.pointKey !== currItem.pointKey) {
            return true;
        }

        // Sanity check
        if (prevItem.dataPoints.length !== currItem.dataPoints.length) {
            return true;
        }

        // Then check for any price changes
        for (let pricesIndex = 0; pricesIndex < prevItem.dataPoints.length; pricesIndex++) {
            const prevDataPoint = prevItem.dataPoints[pricesIndex];

            // Find rather than using the index because array can be sorted randomly
            const currDataPoint = currItem.dataPoints.find(dp => dp.outcome === prevDataPoint.outcome);

            if (!currDataPoint) {
                return true;
            }

            if (prevDataPoint.price !== currDataPoint.price) {
                return true;
            }
        }
    }

    return false;
}
