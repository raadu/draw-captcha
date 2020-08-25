import React, {createContext, useState} from 'react';

type ContextProps = {
    defaultImageData: any,
    setImageData: (imagedata: string) => any,
}

export const ImageDataContext = createContext<Partial<ContextProps>>({});

const ImageDataContextProvider = (props: any) => {

    //States
    const [defaultImageData, setDefaultImageData] = useState("");

    function setImageData(imageData: string) {
        setDefaultImageData(imageData);
    }

    return(
        <ImageDataContext.Provider value={{defaultImageData, setImageData}}>
            {props.children}
        </ImageDataContext.Provider>
    );
}

export default ImageDataContextProvider;