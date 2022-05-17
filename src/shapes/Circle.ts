export type CircleStyleSettings = {
    radius: number;
    strokeColor: string;
};

type CircleSettings = {
    x: number;
    y: number;
} & CircleStyleSettings;

export type CircleArgs = {
    context: CanvasRenderingContext2D;
    settings: CircleSettings;
};

export class Circle extends Path2D {
    constructor({context, settings}: CircleArgs) {
        super();

        const { radius, strokeColor, x, y } = settings;

        this.arc(x, y, radius, 0, 2 * Math.PI);

        context.fillStyle = 'transparent';
        context.strokeStyle = strokeColor;
        context.stroke(this);
        context.fill(this);

        this.x = x;
        this.y = y;
    }

    x: number;
    y: number;
};
