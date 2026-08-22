import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import InputField from "../../../components/InputField";
import BigButton from "../../../components/BigButton";
import { service_types } from "../backend/serviceTypes";

function BookingForm() {
  const { serviceType } = useParams();
  const serviceName = serviceType ? service_types[serviceType] : undefined;

  const [requestedTime, setRequestedTime] = useState("");
  const [notes, setNotes] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  function openDatePicker() {
    dateInputRef.current?.showPicker?.();
  }

  function handleSubmit() {
    // Backend wiring not implemented yet.
    console.log({ serviceType: serviceName, requestedTime, notes });
  }

  return (
    <main className="relative flex flex-col justify-center items-center bg-(--mainBG) w-full min-h-[calc(100vh-4rem)] overflow-hidden">
      <img
        src="/Zecheii.png"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-left"
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/67" />

      {/* Content layer */}
      <div className="z-10 relative flex justify-center items-center w-full">
        <main className="relative flex justify-center items-center bg-(--navBG)/80 shadow-[0_4px_12px_rgba(0,0,0,0.25),0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-lg border border-red-500 w-1/3 min-h-3/4">
          {/* Cool red corners */}
          <div className="-top-3 -left-3 absolute border-red-500 border-t-2 border-l-2 w-20 h-20"></div>
          <div className="-right-3 -bottom-3 absolute border-red-500 border-r-2 border-b-2 w-20 h-20"></div>

          <form
            className="py-10 w-44/50"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="pb-4 border-red-500 border-b">
              <h1 className="text-white text-2xl">Book a Session</h1>
              <h2 className="font-light text-red-400">
                {serviceName ?? "Unknown Service"}
              </h2>
            </div>

            {!serviceName ? (
              <p className="mt-7 text-[#94A3B8]">
                We couldn't find that service. Head back to{" "}
                <span className="text-red-400">Services</span> and pick one from
                the list.
              </p>
            ) : (
              <>
                <div className="mt-7 text-white">
                  <label
                    htmlFor="requestedTime"
                    className="block mb-1 font-light text-white"
                  >
                    Preferred Date & Time
                  </label>
                  <div
                    className="flex items-center gap-3 pb-3 border-red-500 border-b cursor-pointer"
                    onClick={openDatePicker}
                  >
                    <InputField
                      ref={dateInputRef}
                      id="requestedTime"
                      placeholder="Select a date and time"
                      type="datetime-local"
                      className="border-none rounded-md w-full h-10 cursor-pointer"
                      value={requestedTime}
                      onChange={(e) => setRequestedTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-7 text-white">
                  <label
                    htmlFor="notes"
                    className="block mb-1 font-light text-white"
                  >
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Anything you'd like me to know beforehand"
                    rows={4}
                    className="bg-transparent px-2 py-2 border border-white focus:border-[#747bff] rounded-md outline-none w-full text-neutral-50 placeholder:text-gray-500 resize-none"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <BigButton
                  className="mt-10 w-full"
                  text="Request Booking"
                  type="submit"
                />
              </>
            )}
          </form>
        </main>
      </div>
    </main>
  );
}

export default BookingForm;
