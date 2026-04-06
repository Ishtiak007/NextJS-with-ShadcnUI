import BannerSection from "@/components/modules/Banner";
import Calender from "@/components/modules/Calendar";
import CardSection from "@/components/modules/CardSection";
import CarouselSection from "@/components/modules/Carousel";
import DataTableSection from "@/components/modules/DataTable";

export default function Home() {
  return (
    <>
      <BannerSection />
      <CarouselSection />
      <CardSection />
      <DataTableSection />
      <Calender />
    </>
  );
}
