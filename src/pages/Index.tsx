import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutServices from "@/components/sections/AboutServices";
import FaqContact from "@/components/sections/FaqContact";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Index() {
  return (
    <div style={{ backgroundColor: "var(--cream)", color: "var(--graphite)" }} className="min-h-screen">
      <Navbar scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <AboutServices scrollTo={scrollTo} />
      <FaqContact scrollTo={scrollTo} />
    </div>
  );
}
