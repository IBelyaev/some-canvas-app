import * as utils from './utils';

describe('changeMovedPoints', () => {
    it('should return right coordinates', () => {
        const startCoordinates = [
            {x: 258, y: 286},
            {x: 438, y: 349},
            {x: 750, y: 306},
            {x: 570, y: 243},
        ];
        const finishCoordinates = [
            {x: 259, y: 286},
            {x: 438, y: 349},
            {x: 750, y: 303},
            {x: 571, y: 240},
        ];
        const movedPointIndex = 3;
        const newPosition = {x: 571, y: 240};

        const result = utils.changeMovedPoints(
            startCoordinates,
            movedPointIndex,
            newPosition,
        );

        expect(result).toEqual(finishCoordinates);
    });
});

describe('checkCursorInPoint', () => {
    it('should return false if cursor is not in point area', () => {
        const result = false;
        const coordinate = {
            x: 413,
            y: 286,
        };
        const eventCoordinates = {x: 752, y: 87} as MouseEvent;
        const radius = 5.5;

        const isCursorInPoint = utils.checkCursorInPoint(
            coordinate,
            eventCoordinates,
            radius,
        );

        expect(isCursorInPoint).toEqual(result);
    });

    it('should return true if cursor is not in point area', () => {
        const result = true;
        const coordinate = {
            x: 413,
            y: 286,
        };
        const eventCoordinates = {x: 412, y: 283} as MouseEvent;
        const radius = 5.5;

        const isCursorInPoint = utils.checkCursorInPoint(
            coordinate,
            eventCoordinates,
            radius,
        );

        expect(isCursorInPoint).toEqual(result);
    });
});

describe('changeMovedPoints', () => {
    it('should return right coordinates', () => {
        const startCoordinates = [
            {x: 258, y: 286},
            {x: 438, y: 349},
            {x: 750, y: 306},
            {x: 570, y: 243},
        ];
        const finishCoordinates = [
            {x: 259, y: 286},
            {x: 438, y: 349},
            {x: 750, y: 303},
            {x: 571, y: 240},
        ];
        const movedPointIndex = 3;
        const newPosition = {x: 571, y: 240};

        const result = utils.changeMovedPoints(
            startCoordinates,
            movedPointIndex,
            newPosition,
        );

        expect(result).toEqual(finishCoordinates);
    });
});

describe('getLineCenter', () => {
    it('should return line center', () => {
        const result = 721;
        const liteCoordinates = {
            start: 719,
            finish: 723,
        };

        const lineCenter = utils.getLineCenter(liteCoordinates);
        expect(result).toEqual(lineCenter);
    });
});

describe('getParallelogramCenter', () => {
    it('should return parallelogram center', () => {
        const diagonalCoordinates = {
            start: {
                x: 719,
                y: 15,
            },
            finish: {
                x: 723,
                y: 24,
            },
        };
        const result = {
            x: 721,
            y: 19.5,
        };

        const center = utils.getParallelogramCenter(diagonalCoordinates);
        expect(result).toEqual(center);
    });
});

describe('getParallelogramSquare', () => {
    it('should return right square', () => {
        const point0 = {
            x: 719,
            y: 15,
        };
        const point1 = {
            x: 411,
            y: 78,
        };
        const point3 = {
            x: 723,
            y: 24,
        };
        const result = 3023;

        const square = utils.getParallelogramSquare({point0, point1, point3});
        expect(result).toBe(square);
    })
});

describe('getRadiusFromParallelogram', () => {
    it('should return circle radius', () => {
        const square = 3023;
        const result = 31.02016740660178;

        const radius = utils.getRadiusFromParallelogram(square);
        expect(radius).toBe(result);
    });
});

describe('getLastCoordinate', () => {
    it('should return last point coordinate', () => {
        const point0 = {
            x: 418,
            y: 227,
        };
        const point1 = {
            x: 702,
            y: 96,
        };
        const point2 = {
            x: 1006,
            y: 131,
        };
        const result = {
            x: 722,
            y: 262,
        };

        const coordinate = utils.getLastCoordinate({point0, point1, point2});
        expect(coordinate).toEqual(result);
    })
});
