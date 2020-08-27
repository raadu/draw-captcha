import React, {
    useCallback, 
    useEffect, 
    useRef, 
    useState, 
    Fragment,
 } from 'react';
import canvasCSS from './Canvas.module.scss';
import ColorPicker from './../ColorPicker/ColorPicker';

//Props passed for Canvas width and Height of the page
interface CanvasProps {
    width: number;
    height: number;
    defaultImageData: {},
}

//Mouse movement coordinates
type Coordinate = {
    x: number;
    y: number;
};

//Canvas functional component
const Canvas = ({
    width, 
    height, 
    defaultImageData,
}: CanvasProps) => {
    
    //States
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
    const [strokeColor, setStrokeColor] = useState("black");
    const [drawnImageData, setDrawnImageData] = useState({});

    //Function for getting coordinates value from mouse movement
    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        return {
            x: event.pageX - canvas.offsetLeft, 
            y: event.pageY - canvas.offsetTop 
        };
    };


    //Function for start painting when mouse clicked
    const startPaint = useCallback((event: MouseEvent)=>{
        const coordinates = getCoordinates(event);
        console.log("coordinates", coordinates);
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

    //Function for setting stroke color 
    const setStrokeStyle = (color: string) => {
        setStrokeColor(color);
    }

    //Function for drawing line on canvas
    const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
        if(!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if(context) {
            context.strokeStyle = strokeColor;
            context.lineJoin = 'round';
            context.lineWidth = 5;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();

            context.stroke();
        }
    };


    //Function for clearing paint area
    const clearArea = () => {
        if(!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if(context) {
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, width, height);
        }
    }

    //Get coordinate data of the currently drawn image
    const getImageData = () => {
        if(!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');

        if(context) {
            //get image data
            let imageData = context.getImageData(0,0,width,height);
            //copy the imagedata (exact copy of the drawn image will be pasted in canvas)
            // context.putImageData(imageData, 10, 70);
            // console.log("imagedata", imageData);
            setDrawnImageData(imageData);
        }
    }

    //Get coordinate data of the default canvas image
    const drawDefaultImageData = () => {
        if(!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');

        if(context) {
            if(defaultImageData instanceof ImageData) {
                context.putImageData(defaultImageData,0,0);
            }
        }
    }


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
        <Fragment>
            <div className={canvasCSS.canvasContainer}>
                <div className={canvasCSS.element1}>
                    <ColorPicker
                        width={width}
                        height={50}
                        setStrokeStyle={setStrokeStyle}
                    />
                </div>
                <div className={canvasCSS.element2}>
                    <canvas
                        className={canvasCSS.canvas}
                        ref={canvasRef}
                        height={height}
                        width={width} 
                    />
                </div>
                <div className={canvasCSS.element3}>
                    <div className={canvasCSS.clearButton} style={{width:`${width}px`}}>
                        <button className={canvasCSS.button} onClick={()=>clearArea()}>Clear</button>
                    </div>
                </div>
                <div className={canvasCSS.element4}>
                    <div className={canvasCSS.clearButton} style={{width:`${width}px`}}>
                        <button className={canvasCSS.button} onClick={()=>getImageData()}>Get Image Data</button>
                    </div>
                </div>
                <div className={canvasCSS.element5}>
                    <div className={canvasCSS.clearButton} style={{width:`${width}px`}}>
                        <button className={canvasCSS.button} onClick={()=>drawDefaultImageData()}>Draw Default Image</button>
                    </div>
                </div>
                <div>
                    {drawnImageData===defaultImageData ? "Matched": "Not Matched"}
                </div>
            </div>
        </Fragment>  
    );
}; //end of Canvas func comp

//Default height and width of canvas element when no props is passed in this component
Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export default Canvas;