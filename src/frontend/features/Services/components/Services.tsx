import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { fetchServices } from "../backend/services";
import type { Service } from "../backend/services";

function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      const result = await fetchServices();
      if (result.success) {
        setServices(result.data ?? []);
      } else {
        setError(result.error ?? "Failed to load services");
      }
      setLoading(false);
    }
    loadServices();
  }, []);

  return (
    <section className="flex flex-col w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">
      <img
        src="/Zecheii.png"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-left"
      />

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/67" />

      {/* Content layer */}
      <div className="z-10 relative flex flex-col justify-center items-center pb-20 w-full text-white">
        <h1 className="mt-24 md:mt-40 font-montserrat font-bold text-4xl md:text-5xl text-center">
          Available Services
        </h1>

        {loading ? (
          <p className="mt-10 text-[#94A3B8]">Loading services…</p>
        ) : error ? (
          <p className="bg-red-500/10 mt-10 p-3 border border-red-500 rounded text-red-400">
            {error}
          </p>
        ) : services.length === 0 ? (
          <p className="mt-10 text-[#94A3B8]">
            No services are available right now.
          </p>
        ) : (
          <section className="flex flex-wrap justify-center gap-8 mx-auto mt-10 px-6 w-full max-w-6xl">
            {services.map((service, i) => (
              <ServiceCard
                key={service._id}
                service={service}
                delayMs={i * 150}
              />
            ))}
          </section>
        )}
      </div>
    </section>
  );
}

export default Services;
