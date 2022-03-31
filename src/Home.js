import "./App.css";
import { useEffect } from "react";
import WhyUs from "./Component/WhyUs"
import Count from "./Component/Count";
import Hero from "./Component/Hero";
import MyCarousel from "./Component/Carousel";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <Hero />
      <WhyUs />
      <Count />
      <MyCarousel />    
    </div>
  );
}
