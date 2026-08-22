import React from "react";
import ProfileHeader from "./ProfileHeader";

function Profile() {
  return (
    <section className="bg-(--mainBG) relative flex flex-col items-center w-full min-h-[calc(100vh-4rem)] overflow-hidden">
      <ProfileHeader />
      <section className="flex w-full h-[60vh]">
        <div className="flex flex-col gap-5 m-5 w-[75%]">
          <div className="bg-(--mainBGAccent) rounded-3xl w-full h-full"></div>
          <div className="bg-(--mainBGAccent) rounded-3xl w-full h-full"></div>
        </div>
        {/*Previous Sessions*/}
        <div className="bg-(--mainBGAccent) m-5 rounded-3xl w-[25%] h-[60vh] flex flex-col items-center text-white font-montserrat">
          <h1 className="mt-3 text-2xl">Upcomming Session</h1>
        </div>
        {/*Previous Sessions*/}
        <div className="bg-(--mainBGAccent) m-5 rounded-3xl w-[25%] h-[60vh] flex flex-col items-center text-white font-montserrat">
          <h1 className="mt-3 text-2xl">Previous Sessions</h1>
        </div>
      </section>
    </section>
  );
}

export default Profile;
