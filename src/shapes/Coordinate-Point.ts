import { CircleArgs, Circle } from './Circle';

type PointWithCoordinateArgs = CircleArgs;

export class PointWithCoordinate extends Circle {
    constructor(args: PointWithCoordinateArgs) {
        super(args);

        const { context } = args;
        const { x, y } = this;
        const coordinateInfo = `x: ${x}; y: ${y}`;
        const distance = 30;

        context.beginPath();
        context.font = '14px Times New Roman';
        context.strokeStyle = 'black';
        context.textAlign = 'center';
        context.strokeText(coordinateInfo, x + distance, y - distance);
        context.closePath();
    }
};
