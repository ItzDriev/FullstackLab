import useTitle from "../../../hooks/useTitle";

function Home() {
  useTitle("Home");

  //const twitchChatSrc = `https://www.twitch.tv/embed/drievtv/chat?parent=${parent}`;
  return (
    <section className="flex bg-(--mainBG) w-full h-[calc(100vh-4rem)]">
      <section className="flex flex-col justify-center items-center w-1/2"></section>
    </section>
  );
}

export default Home;
