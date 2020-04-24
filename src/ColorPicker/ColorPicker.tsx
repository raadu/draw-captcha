import React from 'react';
import colorPickerCSS from './ColorPicker.module.scss';

interface ColorPickerProps {
    width: number;
    height: number;
    setStrokeStyle(color: string): void;
} 


const ColorPicker = ({width, height, setStrokeStyle}: ColorPickerProps) => {
    return (
        <div className={colorPickerCSS.pickerBox}
        style={{width:`${width}px`, height: `${height}px`}}>

            <div className={colorPickerCSS.gridContainer}>
                <div className={colorPickerCSS.gridItem1} onClick={() => setStrokeStyle("red")}></div>
                <div className={colorPickerCSS.gridItem2} onClick={() => setStrokeStyle("green")}></div>
                <div className={colorPickerCSS.gridItem3} onClick={() => setStrokeStyle("blue")}></div>  
                <div className={colorPickerCSS.gridItem4} onClick={() => setStrokeStyle("black")}></div>
            </div>

        </div>
    );
}

ColorPicker.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight
};
 
export default ColorPicker;