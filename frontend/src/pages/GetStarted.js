import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const GetStarted = () => {
  return (
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
      <Sidebar />
      <main className="flex-1 flex flex-col items-start justify-start max-w-[calc(100%_-_233px)] mq1050:max-w-full">
        <Navbar
          gettingStarted="Getting Started"
          mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
        <section className="self-stretch flex flex-row items-center justify-center py-[87.9px] px-5 box-border max-w-full shrink-0 mq450:pt-[29px] mq450:pb-[29px] mq450:box-border mq725:pt-[37px] mq725:pb-[37px] mq725:box-border mq1000:pt-11 mq1000:pb-11 mq1000:box-border">
          <Hero />
        </section>
      </main>
    </div>
  );
};

export default GetStarted;