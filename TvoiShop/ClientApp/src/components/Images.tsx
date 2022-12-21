import * as React from 'react';

interface IProps {
  images: IImage[];
  behaviour: ImageBehaviour;
}

export enum ImageBehaviour {
    Unknown,
    Single,
    Multiple
}

export const Images = (props: IProps) => {
    const [images, setImages] = React.useState(props.images);

    React.useEffect(() => {
        setImages([...props.images]);
    }, [props.images]);

    const selectMain = (id: number) => {
        setImages([images[id], ...images.slice(0, id), ...images.slice(id + 1)]);
    }

    if (props.images.length === 0 || props.behaviour === ImageBehaviour.Unknown) return <div></div>;

    if (props.behaviour === ImageBehaviour.Multiple) {
        return MultipleImages(images, selectMain);
    }

    return SingleImage(images[0]);
};

const MultipleImages = (images: IImage[], select: (id: number) => void) => {
    const firstImage = images[0].url;

    return(
        <div className="prImg">
            <img className='productInfPgImage' src={firstImage}/>
            <div className='productIngPgSecondaryImages'>
                {images.slice(1, 4).map((i, id) => (
                    <img key={id} className='productIngPgSecondaryImage' src={i.url} onClick={() => select(id + 1)}/>
                ))}
            </div>
        </div>
    )
}

const SingleImage = (image: IImage) => {
    return (
        <img className='productImage' src={image.url} />
    )
}

