import React, {
    useEffect, 
    useRef, 
    Fragment,
    useCallback,
    useState,
    useContext,
 } from 'react';
import canvasCSS from '../Canvas/Canvas.module.scss';
import {ImageDataContext} from '../contexts/ImageDataContext';

//Props passed for Canvas width and Height of the page
interface CanvasProps {
    width: number;
    height: number;
}

const DefaultCanvas = ({width, height}: CanvasProps) => {

    //States
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const [defaultImageData, setDefaultImageData] = useState({});

    //Context Data
    const {defaultImageData, setImageData} = useContext(ImageDataContext);

    console.log(defaultImageData);

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


        console.count("render default canvas");
        console.log("imageData in default canvas", imageData);
    }

    function copyImageData() {
        if(!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if(context) {
            let imageData = context.getImageData(0,0,width,height);
            console.log(imageData);
        }
    }
    
    return (
        <Fragment>
            <canvas
                className={canvasCSS.canvas}
                ref={canvasRef}
                height={height}
                width={width} 
            />
            <div className={canvasCSS.clearButton} style={{width:`${width}px`}}>
                <button 
                    className={canvasCSS.button} 
                    onClick={()=>copyImageData()}
                >
                    Copy Image Data
                </button>
            </div>
        </Fragment>
    );
}

//Default height and width of canvas element when no props is passed in this component
DefaultCanvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export default DefaultCanvas;