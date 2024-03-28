import Footer from "@/components/navigation/footer";
import Navbar from "@/components/navigation/navbar";

interface LandingPageProps {
  children: React.ReactNode;
}

export default function LandingPage({ children }: LandingPageProps) {
  return (
    <>
      <Navbar />
      <div className="pt-[10vh] max-w-screen-xl mx-auto p-5">{children}</div>
      <Footer />
    </>
  );
}
