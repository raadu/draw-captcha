import React, {createContext, useState} from 'react';

type ContextProps = {
    defaultImageData: {},
    setDefaultImageData: (active: {}) => void,
}

export const ImageDataContext = createContext({});


const ImageDataContextProvider = (props: any) => {

    //States
    const [defaultImageData, setDefaultImageData] = useState({});


    return(
        <ImageDataContext.Provider value={{defaultImageData, setDefaultImageData}}>
            {props.children}
        </ImageDataContext.Provider>
    );
};


export default ImageDataContextProvider;