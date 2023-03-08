import CarouselFadeExample from "./CarouselComponent"
import "../CSS/HomeStyle.css"
import SearchingPackage from "./SearchingPackageComponent"
import FooterComponent from "./FooterComponent"



export default function HomeComponent()
{
    return(
        <div className="c-renderelement">
            
     
            <CarouselFadeExample/>
            <SearchingPackage/>
            <FooterComponent/>
        </div>
    )
}
