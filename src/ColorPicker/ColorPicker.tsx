import React from 'react';
import colorPickerCSS from './ColorPicker.module.scss';

interface ColorPickerProps {
    width: number;
    height: number;
} 


const ColorPicker = ({width, height}: ColorPickerProps) => {
    return (
        <div className={colorPickerCSS.pickerBox}
        style={{width:`${width}px`, height: `${height}px`}}>

        </div>
    );
}

ColorPicker.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight
};
 
export default ColorPicker;