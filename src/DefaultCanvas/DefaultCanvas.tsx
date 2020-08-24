import React, {
    useCallback, 
    useEffect, 
    useRef, 
    useState, 
    Fragment,
 } from 'react';
import canvasCSS from '../Canvas/Canvas.module.scss';
import ColorPicker from './../ColorPicker/ColorPicker';

//Props passed for Canvas width and Height of the page
interface CanvasProps {
    width: number;
    height: number;
}

const DefaultCanvas = ({width, height}: CanvasProps) => {

    //States
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        drawImage();
    },[]);


    function drawImage() {
        if(!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        let image = new Image();
        image.src = "sample/starRed.png";
        image.onload = () => {
            context?.drawImage(image, 0, 0);
        }

        let imageData = context?.getImageData(0,0,width,height);

        console.log("render");
        console.log("imageData", imageData);
    }


    return (
        <Fragment>
            <canvas
                className={canvasCSS.canvas}
                ref={canvasRef}
                height={height}
                width={width} 
            />
        </Fragment>  
    );
}

//Default height and width of canvas element when no props is passed in this component
DefaultCanvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export default DefaultCanvas;