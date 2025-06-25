

interface ProductDetailsImageProps {
    img: string;
}

const ProductDetailsImage = ({ img}: ProductDetailsImageProps) => {
       console.log(img)
    return (
        <div className="mx-auto hover:scale-150 hover:-translate-y-2/3 hover:w-fit rounded overflow-hidden" >
          
            <img  src={img} alt=""  className="object-cover h-32 w-40 mx-auto rounded hover:w-[50%] hover:h-[50%]"/>
        </div>
    );
};

export default ProductDetailsImage;