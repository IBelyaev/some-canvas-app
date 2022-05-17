import { PointCoordinate } from '../shapes/Parallelogram';

/**
 * Changes the coordinate points.
 * Changes current point and neighbors points
 *  
 * @param {PointCoordinate[]} points - current points
 * @param {Number} movedPointIndex - current moving point
 * @param {PointCoordinate} newPosition - current position for moving point
 * @returns {PointCoordinate[]} new coordinates
 */
export function changeMovedPoints(
    points: PointCoordinate[],
    movedPointIndex: number,
    {x, y}: PointCoordinate,
): PointCoordinate[] {
    const copyCoordinates = [...points];
    const curetChangedPoints = points[movedPointIndex];

    const nextIndex = movedPointIndex + 1 === points.length ? 0 : movedPointIndex + 1;
    const lastIndex = movedPointIndex - 1 < 0 ? points.length - 1 : movedPointIndex - 1;

    const moveOnXLine = x - curetChangedPoints.x;
    const moveOnYLine = y - curetChangedPoints.y;

    if (movedPointIndex === 1 || movedPointIndex === 3) {
        copyCoordinates[nextIndex] = {    
            x: copyCoordinates[nextIndex].x + moveOnXLine,
            y: copyCoordinates[nextIndex].y
        };
        copyCoordinates[lastIndex] = {
            x: copyCoordinates[lastIndex].x,
            y: copyCoordinates[lastIndex].y + moveOnYLine
        };  
    } else {
        copyCoordinates[nextIndex] = {
            x: copyCoordinates[nextIndex].x,
            y: copyCoordinates[nextIndex].y + moveOnYLine
        };
        copyCoordinates[lastIndex] = {
            x: copyCoordinates[lastIndex].x + moveOnXLine,
            y: copyCoordinates[lastIndex].y
        };  
    }

    copyCoordinates[movedPointIndex] = {x, y};

    return copyCoordinates;
};

/**
 * Checks that cursor in the circle
 *
 * @param {PointCoordinate} coordinate - coordinate being checked
 * @param {MouseEvent} Event - mouse event
 * @param {Number} radius - circle radius
 * @returns {Boolean} isCursorInPoint
 */
export function checkCursorInPoint(
    coordinate: PointCoordinate,
    {x, y}: MouseEvent,
    radius: number
): boolean {
    return (coordinate.x - x) ** 2 + (coordinate.y - y) ** 2 <= radius ** 2;
};

type lineCoordinates = Record<'start' | 'finish', number>;

/**
 * Gets the center point on the line
 *
 * @param {lineCoordinates} lineCoordinates - line coordinates
 * @returns {Number} line center
 */
export function getLineCenter({start, finish}: lineCoordinates): number {
    return (start + finish) / 2;
};

type GetParallelogramCenterArgs = Record<'start' | 'finish', PointCoordinate>;

/**
 * Gets parallelogram center for the middle of the diagonal
 *
 * @param {GetParallelogramCenterArgs} coordinates - diagonal coordinates
 * @returns {Number} parallelogram center
 */
export function getParallelogramCenter({start, finish}: GetParallelogramCenterArgs): PointCoordinate {
    const centerX = getLineCenter({start: start.x, finish: finish.x});
    const centerY = getLineCenter({start: start.y, finish: finish.y});
    const center = {
        x: centerX,
        y: centerY,
    };

    return center;
};

type GetParallelogramSquareArgs = Record<'point0' | 'point1' | 'point3', PointCoordinate>;

/**
 * Gets parallelogram square
 *
 * @param {GetParallelogramSquareArgs} coordinates - parallelogram points
 * @returns {Number} parallelogram square
 */
export function getParallelogramSquare({point0, point1, point3}: GetParallelogramSquareArgs): number {
    const line1 = Math.sqrt((point0.x - point1.x) ** 2 + (point0.y - point1.y) ** 2);
    const line2 = Math.sqrt((point0.x - point3.x) ** 2 + (point0.y - point3.y) ** 2);

    const dAx = point1.x - point0.x;
    const dAy = point1.y - point0.y;
    const dBx = point3.x - point0.x;
    const dBy = point3.y - point0.y;
  
    let angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
  
    if (angle < 0) {
      angle *= -1;
    }

    return Math.floor(line1 * line2 * Math.sin(angle));
};

/**
 * Gets circle radius from parallelogram
 *
 * @param {Number} square - parallelogram square
 * @returns {Number} circle square
 */
export function getRadiusFromParallelogram(square: number): number {
    return Math.sqrt(square / Math.PI);
};

type GetLastCoordinateArg = Record<'point0' | 'point1' | 'point2', PointCoordinate>;

/**
 * Gets last coordinate for parallelogram
 *
 * @param {GetLastCoordinateArg} points - three parallelogram points
 * @returns {PointCoordinate} fourth parallelogram point
 */
export function getLastCoordinate({point0, point1, point2}: GetLastCoordinateArg): PointCoordinate {
    const oX = getLineCenter({start: point0.x, finish: point2.x});
    const oY = getLineCenter({start: point0.y, finish: point2.y});
    
    const finishX = (oX * 2) - point1.x;
    const finishY = (oY * 2) - point1.y;

    return {
        x: finishX,
        y: finishY
    };
};
