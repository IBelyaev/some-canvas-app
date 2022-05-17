import React, { useState, MouseEventHandler } from 'react';

import Canvas from '../canvas';
import { PointCoordinate } from '../shapes/Parallelogram';

import { getLastCoordinate } from '../helpers/utils';
import InfoPlate from '../info-plate';

import './App.css';

function App() {
    const [points, setPoint] = useState<PointCoordinate[]>([]);

    const handleChangePoints = (points: PointCoordinate[]) => {
      setPoint(points);
    };

    const handleAddPoints: MouseEventHandler<HTMLCanvasElement> = ({clientX: x, clientY: y}) => {
      if (points.length < 2) {
        setPoint((prev) => [...prev, {x, y}]);
      } else if (points.length === 2) {
        setPoint((prev) => {
          const lastCoordinate = getLastCoordinate({
            point0: prev[0],
            point1: prev[1],
            point2: {x, y},
          })

          return [...prev, {x, y}, lastCoordinate];
        });
      }
    }

    const pointsAmount = points.length;
    const handleResetPage = () => setPoint([]);

    return (
      <div className="root">
          <Canvas
              onAddPoints={handleAddPoints}
              onChangePoints={handleChangePoints}
              points={points}
          />
        <InfoPlate pointsAmount={pointsAmount} onPageReset={handleResetPage} />
      </div>
    );
}

export default App;