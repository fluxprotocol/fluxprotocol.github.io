import containsNewChartData from "./containsNewChartData";

describe('containsNewChartData', () => {
    it('should return true when data has not the same length', () => {
        const result = containsNewChartData([{
            pointKey: 'a',
            dataPoints: [],
        }], [{
            pointKey: 'b',
            dataPoints: [],
        }, {
            pointKey: 'c',
            dataPoints: [],
        }]);

        expect(result).toBe(true);
    });

    it('should return true when data has a different key', () => {
        const result = containsNewChartData([{
            pointKey: 'a',
            dataPoints: [],
        }], [{
            pointKey: 'b',
            dataPoints: [],
        }]);

        expect(result).toBe(true);
    });

    it('should return true when data has a different key on different index', () => {
        const result = containsNewChartData([{
            pointKey: 'a',
            dataPoints: [],
        }, {
            pointKey: 'b',
            dataPoints: [],
        }], [{
            pointKey: 'a',
            dataPoints: [],
        }, {
            pointKey: 'c',
            dataPoints: [],
        }]);

        expect(result).toBe(true);
    });

    it('should return false when data has a same key on same index', () => {
        const result = containsNewChartData([{
            pointKey: 'a',
            dataPoints: [],
        }, {
            pointKey: 'b',
            dataPoints: [],
        }], [{
            pointKey: 'a',
            dataPoints: [],
        }, {
            pointKey: 'b',
            dataPoints: [],
        }]);

        expect(result).toBe(false);
    });

    it('should return true when nested data has different item lengths', () => {
        const result = containsNewChartData([{
            pointKey: 'a',
            dataPoints: [{
                outcome: 0,
                price: '0.5',
            }],
        }], [{
            pointKey: 'a',
            dataPoints: [],
        }]);

        expect(result).toBe(true);
    });

    it('should return true when nested data has different items', () => {
        const result = containsNewChartData([{
            pointKey: 'a',
            dataPoints: [{
                outcome: 0,
                price: '0.5',
            }],
        }], [{
            pointKey: 'a',
            dataPoints: [{
                outcome: 0,
                price: '0.4',
            }],
        }]);

        expect(result).toBe(true);
    });

    it('should return true when nested data has not a specific outcome', () => {
        const result = containsNewChartData([{
            pointKey: 'a',
            dataPoints: [{
                outcome: 1,
                price: '0.5',
            }],
        }], [{
            pointKey: 'a',
            dataPoints: [{
                outcome: 0,
                price: '0.4',
            }],
        }]);

        expect(result).toBe(true);
    });
});
