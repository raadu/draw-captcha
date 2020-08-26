import React, {createContext, useState, ReactNode} from 'react';

// type ContextProps = {
//     defaultImageData: any,
//     setImageData: (imagedata: any) => void,
// }

// interface ContextInterface {
//     defaultImageData: string,
// }

// export const ImageDataContext = createContext<Partial<ContextProps>>({});

const defaultImageValue = {};
export const ImageDataContext = createContext(defaultImageValue);

type Props = {
    children: ReactNode
}

export const ImageDataContextProvider = ({
    children
}: Props) => {

    //States
    // const [defaultImageData] = useState("default");
    const [defaultImageData, setDefaultImageData] = useState(
        defaultImageValue
    );

    const contextValue = {defaultImageData, setDefaultImageData};

    // function setImageData(imageData: any) {
    //     setDefaultImageData(imageData);
    // }

    return(
        // <ImageDataContext.Provider value={{defaultImageData, setImageData}}>
        <ImageDataContext.Provider value={contextValue}>
            {children}
        </ImageDataContext.Provider>
    );
};


export default ImageDataContextProvider;