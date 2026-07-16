import React from "react";

function LoginForm() {
  return (
    <div className="flex justify-center items-center bg-(--navBG)/80 shadow-[0_4px_12px_rgba(0,0,0,0.25),0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-lg border border-red-500 w-1/4 h-3/4">
      {/*Cool red corners */}
      <div className="-top-3 -left-3 absolute border-red-500 border-t-2 border-l-2 w-20 h-20"></div>
      <div className="-right-3 -bottom-3 absolute border-red-500 border-r-2 border-b-2 w-20 h-20"></div>
    </div>
  );
}

export default LoginForm;
