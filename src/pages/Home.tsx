import Header from "@/components/Header";
import SearchHistory from "@/components/SearchHistory";
import UploadSection from "@/components/UploadSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="hidden md:block">
          <SearchHistory />
        </div>
        <UploadSection />
      </div>
    </div>
  );
};

export default Home;