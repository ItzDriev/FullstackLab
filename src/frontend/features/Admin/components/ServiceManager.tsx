import { useCallback, useEffect, useState } from "react";
import ServiceForm from "./ServiceForm";
import { deleteService } from "../backend/admin";
import { fetchServices } from "../../Services/backend/services";
import type { Service } from "../../Services/backend/services";

function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //Which row is currently asking "are you sure?"
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadServices = useCallback(async () => {
    const result = await fetchServices();
    if (result.success) {
      setServices(result.data ?? []);
      setError(null);
    } else {
      setError(result.error ?? "Failed to load services");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  async function handleDelete(id: string) {
    setDeletingId(id);
    const result = await deleteService(id);

    if (result.success) {
      setServices((prev) => prev.filter((s) => s._id !== id));
      setConfirmId(null);
      setError(null);
    } else {
      setError(result.error ?? "Failed to delete service");
    }

    setDeletingId(null);
  }

  return (
    <div className="flex lg:flex-row flex-col gap-6">
      <ServiceForm
        onCreated={(service) => setServices((prev) => [...prev, service])}
      />

      {/* Existing services */}
      <div className="flex flex-col bg-(--navBG)/60 p-6 border border-red-500/40 rounded-xl w-full lg:max-w-sm">
        <h3 className="pb-3 border-red-500/30 border-b font-bold text-lg">
          Current services
        </h3>

        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}

        {loading ? (
          <p className="mt-4 text-[#94A3B8] text-sm">Loading…</p>
        ) : services.length === 0 ? (
          <p className="mt-4 text-[#94A3B8] text-sm">
            No services yet. Add one with the form.
          </p>
        ) : (
          <ul className="flex flex-col gap-2 mt-4">
            {services.map((service) => (
              <li
                key={service._id}
                className="flex justify-between items-center gap-2 bg-(--mainBGAccent) px-3 py-2 rounded-lg"
              >
                <div className="min-w-0">
                  <p className="text-sm truncate">{service.name}</p>
                  <p className="text-[#94A3B8] text-xs">
                    {service.priceSek} kr · {service.durationMinutes} min
                  </p>
                </div>

                {confirmId === service._id ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[#94A3B8] text-xs">Remove?</span>
                    <button
                      onClick={() => handleDelete(service._id)}
                      disabled={deletingId === service._id}
                      className="bg-red-500/20 hover:bg-red-500/40 disabled:opacity-40 px-2 py-0.5 border border-red-500 rounded text-xs transition-colors cursor-pointer disabled:pointer-events-none"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="hover:bg-white/10 px-2 py-0.5 border border-[#94A3B8]/40 rounded text-[#94A3B8] text-xs transition-colors cursor-pointer"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmId(service._id)}
                    aria-label={`Remove ${service.name}`}
                    title={`Remove ${service.name}`}
                    className="flex justify-center items-center hover:bg-red-500/20 border border-transparent hover:border-red-500 rounded w-6 h-6 text-[#94A3B8] hover:text-red-400 text-sm transition-colors shrink-0 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ServiceManager;
