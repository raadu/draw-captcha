import React, {useCallback, useEffect, useRef, useState} from 'react';

//Props passed for Canvas width and Height of the page
interface CanvasProps {
    width: number;
    height: number;
}

//Mouse movement coordinates
type Coordinate = {
    x: number;
    y: number;
};

//Canvas functional component
const Canvas = ({width, height}: CanvasProps) => {
    
    //States
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

    //Function for getting coordinates value from mouse movement
    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
    };

    //Function for start painting when mouse clicked
    const startPaint = useCallback((event: MouseEvent)=>{
        const coordinates = getCoordinates(event);
        if(coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
        }
    }, []);

    //Function to detect when mouse pressed and send coordinate to drawLine function
    const paint = useCallback(
        (event: MouseEvent) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition]
    );

    //Function for drawing line on canvas
    const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
        if(!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if(context) {
            context.strokeStyle = 'red';
            context.lineJoin = 'round';
            context.lineWidth = 5;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();

            context.stroke();
        }
    };

    //Function for exiting the line drawing
    const exitPaint = useCallback(()=> {
        setIsPainting(false);
    },[]);

    
    //Add event listened to useeffect to detect mouse down movement
    //Detect when to start paint from the mouse down movement
    useEffect(()=> {
        if(!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return()=> {
            canvas.removeEventListener('mousedown', startPaint);
        };
    },[startPaint]);

    //Draw line on mousemove event
    useEffect(()=> {
        if(!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousemove', paint);

        return()=>{
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);

    //Stop drawing when the user releases the mouse click
    useEffect(()=> {
        if(!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return()=> {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    },[exitPaint]);

    return (
        <canvas
            ref={canvasRef} 
            height={height} 
            width={width} />
    );
}; //end of Canvas func comp

//Default height and width of canvas element when no props is passed in this component
Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export default Canvas;