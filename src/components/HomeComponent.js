import CarouselFadeExample from "./CarouselComponent"
import "../CSS/HomeStyle.css"
import SearchingPackage from "./SearchingPackageComponent"



export default function HomeComponent()
{
    return(
        <div className="c-renderelement">
            
     
            <CarouselFadeExample/>
            <SearchingPackage/>
        </div>
    )
}
