import { CarouselContent } from "./components/ui/carousel";
import Da_Ly from "./page/Dash/Da_Ly";
import ProductCarousel from "./components/layout/Carouselcontent";
import Footersm from "./page/Home/Footer/Footersm";
import CategoryNav from "./components/layout/CategoryNav";
import TrendingProducts from "./page/Home/Trending/TrendingProducts";
import Home from "./page/TestWorks/Home";

function App() {
  return (
    <div className="">
      <div className="w-full h-24 ">
        <Home />
        <CategoryNav />

        <TrendingProducts />
      </div>
    </div>
  );
}

export default App;
