import {
    getParallelogramCenter,
    getParallelogramSquare,
    getRadiusFromParallelogram,
    checkCursorInPoint,
    changeMovedPoints,
} from '../helpers/utils';
import { CircleStyleSettings, Circle } from './Circle';
import { PointWithCoordinate } from './Coordinate-Point';

export type PointCoordinate = Record<'x'| 'y', number>;

const POINT_DIAMETER = 11;

export const pointDefaultSetting = {
    strokeColor: 'red',
    radius: POINT_DIAMETER / 2,
};

export const parallelogramColor = 'blue';

type ParallelogramSettings = {
    coordinates: PointCoordinate[];
    lineColor: string;
    circleSettings: CircleStyleSettings;
};

type ParallelogramArgs = {
    context: CanvasRenderingContext2D;
    settings: ParallelogramSettings;
};

export class Parallelogram extends Path2D {
    constructor({context, settings}: ParallelogramArgs) {
        super();

        const {
            coordinates,
            lineColor,
            circleSettings: {
                strokeColor,
                radius
            }
        } = settings;

        context.beginPath();

        coordinates.forEach((coordinate) => {
            const point = new PointWithCoordinate({
                context,
                settings: {
                    x: coordinate.x,
                    y: coordinate.y,
                    radius: radius,
                    strokeColor: strokeColor,
                }
            });

            context.fill(point);
        });

        context.moveTo(coordinates[0].x, coordinates[0].y);

        for (let i = 1; i <= coordinates.length; i++) {
            const { x, y } = coordinates[i] || coordinates[0];

            context.lineTo(x, y);
        }

        context.closePath();
        context.lineWidth = 1;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = lineColor;
        context.stroke();

        const center = getParallelogramCenter({start: coordinates[0], finish: coordinates[2]});
        const square = getParallelogramSquare({
            point0: coordinates[0],
            point1: coordinates[1],
            point3: coordinates[2],
        });

        const circle = new Circle({
            context,
            settings: {
                x: center.x,
                y: center.y,
                radius: getRadiusFromParallelogram(square),
                strokeColor: 'yellow',
            }
        })

        context.fill(circle);
        context.closePath();

        context.beginPath();
        context.font = '14px Times New Roman';
        context.strokeStyle = 'black';
        context.textAlign = 'center';
        const squareInfo = `S○,□ = ${square}`
        context.strokeText(squareInfo, center.x, center.y);
        context.closePath();

        this.coordinates = coordinates;
        this.context = context
    }

    mouseDownControl = {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
    };

    coordinates: PointCoordinate[];
    context: CanvasRenderingContext2D;

    setMouseDownControlByIndexPoint(coordinateIndex: number, event: MouseEvent) {
        if (checkCursorInPoint(this.coordinates[coordinateIndex], event, pointDefaultSetting.radius)) {
            this.mouseDownControl[coordinateIndex] = true;
        }
    };

    moveParallelogramByIndexPoint(coordinateIndex: number, canvas: HTMLCanvasElement, {offsetX: x, offsetY: y}: MouseEvent) {
        if (this.mouseDownControl[coordinateIndex]) {
            this.context.clearRect(0, 0, canvas.width, canvas.height);

            const newCoordinates = changeMovedPoints(
                this.coordinates,
                coordinateIndex,
                {x, y},
            );

            const parallelogram = new Parallelogram({
                context: this.context,
                settings: {
                    coordinates: newCoordinates,
                    lineColor: parallelogramColor,
                    circleSettings: {
                        ...pointDefaultSetting
                    }
                }
            })

            this.context.fill(parallelogram);
        }
    };

    changePointsByIndexPoint(
        coordinateIndex: number,
        canvas: HTMLCanvasElement,
        onChangePoints: (points: PointCoordinate[]) => void,
        {offsetX: x, offsetY: y}: MouseEvent) {
        if (this.mouseDownControl[coordinateIndex]) {
            this.mouseDownControl[coordinateIndex] = false;

            const newCoordinates = changeMovedPoints(
                this.coordinates,
                coordinateIndex,
                {x, y},
            );

            this.context.clearRect(0, 0, canvas.width, canvas.height);

            onChangePoints(newCoordinates);
        }
    };
};
