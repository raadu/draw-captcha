import React, {
    useEffect, 
    useRef, 
    Fragment,
 } from 'react';
import canvasCSS from '../Canvas/Canvas.module.scss';

//Props passed for Canvas width and Height of the page
interface CanvasProps {
    width: number;
    height: number;
    setDefaultImageData: (action: {}) => void,
}

const DefaultCanvas = ({
    width, 
    height, 
    setDefaultImageData
}: CanvasProps) => {

    //States
    const canvasRef = useRef<HTMLCanvasElement>(null);
    

    useEffect(() => {
        drawImage();
    },[]);


    // Function for draw image on canvas from default pic
    function drawImage() {
        if(!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        let image = new Image();
        image.src = "sample/justLine.png";
        image.onload = () => {
            context?.drawImage(image, 0, 0);
        }
    }

    // Function for copy drawn image data to the state
    function copyImageData() {
        if(!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if(context) {
            let imageData = context.getImageData(0,0,width,height);
            
            //Need to convert imageData to Blob
            setDefaultImageData(imageData);
            // canvas.toBlob(function(blob) {
            //     console.log("blbdata", blob);
            //   }, 'image/png');
            
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
                    Copy Default Image Data
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