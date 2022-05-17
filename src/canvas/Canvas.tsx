import React, { useRef, useEffect, MouseEventHandler } from 'react'
import { MouseEventFn, EventTypes } from '../helpers/types';
import {
    PointCoordinate,
    pointDefaultSetting,
    Parallelogram,
    parallelogramColor
} from '../shapes/Parallelogram';
import { PointWithCoordinate } from '../shapes/Coordinate-Point';

type Props = {
    points: PointCoordinate[];
    onAddPoints: MouseEventHandler<HTMLCanvasElement>;
    onChangePoints: (points: PointCoordinate[]) => void;
};

const Canvas = ({points, onChangePoints, onAddPoints}: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const enoughPointForShape = points.length === 4;
        const emptyState = points.length === 0;

        const mousedownEvents: MouseEventFn[] = [],
            mousemoveEvents: MouseEventFn[] = [],
            mouseupEvents: MouseEventFn[] = [];
        
        if (emptyState) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        if (!enoughPointForShape) {
            points.forEach(({x , y}) => {
                const pointWithCoordinate = new PointWithCoordinate({
                    context,
                    settings: {
                        ...pointDefaultSetting,
                        x,
                        y
                    }
                })

                context.fill(pointWithCoordinate);
            });
        } else {
            context.clearRect(0, 0, canvas.width, canvas.height);

            const parallelogram = new Parallelogram({
                context,
                settings: {
                    coordinates: points,
                    lineColor: parallelogramColor,
                    circleSettings: {
                        ...pointDefaultSetting
                    }
                }
            });

            context.fill(parallelogram);

            points.forEach((_, index) => {                
                const setMouseDownControl: MouseEventFn = (
                    parallelogram.setMouseDownControlByIndexPoint
                        .bind(parallelogram, index)
                );
                const moveParallelogram: MouseEventFn = (
                    parallelogram.moveParallelogramByIndexPoint
                        .bind(parallelogram, index, canvas)
                );
                const changePointes: MouseEventFn = (
                    parallelogram.changePointsByIndexPoint
                        .bind(parallelogram, index, canvas, onChangePoints)
                );

                mousedownEvents.push(setMouseDownControl);
                mousemoveEvents.push(moveParallelogram);
                mouseupEvents.push(changePointes);

                canvas.addEventListener(EventTypes.mousedown, setMouseDownControl);
                canvas.addEventListener(EventTypes.mousemove, moveParallelogram);
                canvas.addEventListener(EventTypes.mouseup, changePointes);
            })
        }

        return () => {
            mousedownEvents.forEach(event => canvas.removeEventListener(EventTypes.mousedown, event));
            mousemoveEvents.forEach(event => canvas.removeEventListener(EventTypes.mousemove, event));
            mouseupEvents.forEach(event => canvas.removeEventListener(EventTypes.mouseup, event));
        }
            
    }, [points, onChangePoints]);
  
    return (
        <canvas onClick={onAddPoints} width={window.innerWidth} height={window.innerHeight} ref={canvasRef} />
    );
}

export default Canvas;
