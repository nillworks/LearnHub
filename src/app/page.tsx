import HeroSection from "@/components/HomePage/HeroSection";
import PlatformStatistics from "@/components/HomePage/PlatformStatistics";
import PopularCategories from "@/components/HomePage/PopularCategories";
import FeaturedCourses from "@/components/HomePage/FeaturedCourses";
import TopInstructors from "@/components/HomePage/TopInstructors";
import StudentTestimonials from "@/components/HomePage/StudentTestimonials";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";
import FAQ from "@/components/HomePage/FAQ";
import CTA from "@/components/HomePage/CTA";
import Footer from "@/components/HomePage/Footer";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <section>
      <HeroSection />
      <PlatformStatistics />
      <FeaturedCourses />
      <PopularCategories />
      <TopInstructors />
      <StudentTestimonials />
      <WhyChooseUs />
      <FAQ />
      <CTA />
      <Footer />
    </section>
  );
}
