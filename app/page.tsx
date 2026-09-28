import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Devices } from "@/components/site/Devices";
import { Fiscal } from "@/components/site/Fiscal";
import { OneC } from "@/components/site/OneC";
import { Ecp } from "@/components/site/Ecp";
import { Process } from "@/components/site/Process";
import { Faq } from "@/components/site/Faq";
import { Franchise } from "@/components/site/Franchise";
import { Its } from "@/components/site/Its";
import { Contact } from "@/components/site/Contact";
import { MapSection } from "@/components/site/MapSection";
import { Footer } from "@/components/site/Footer";
import { StructuredData } from "@/components/site/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Devices />
        <Fiscal />
        <Process />
        <Franchise />
        <OneC />
        <Its />
        <Ecp />
        <Faq />
        <Contact />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
