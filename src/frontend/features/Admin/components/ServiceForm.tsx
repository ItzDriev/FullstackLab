import { useState } from "react";
import InputField from "../../../components/InputField";
import BigButton from "../../../components/BigButton";
import { createService } from "../backend/admin";
import type { Service } from "../../Services/backend/services";

const inputStyle = "border-red-500/40 rounded-md w-full h-10 bg-transparent";

interface ServiceFormProps {
  onCreated?: (service: Service) => void;
}

function ServiceForm({ onCreated }: ServiceFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSek, setPriceSek] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [deliverables, setDeliverables] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  function resetForm() {
    setName("");
    setDescription("");
    setPriceSek("");
    setDurationMinutes("");
    setDeliverables("");
  }

  async function handleSubmit() {
    if (submitting) return;
    setSubmitting(true);

    const result = await createService({
      name,
      description,
      priceSek: Number(priceSek),
      durationMinutes: Number(durationMinutes),
      //One deliverable per line, blank lines dropped
      deliverables: deliverables
        .split("\n")
        .map((d) => d.trim())
        .filter(Boolean),
    });

    if (result.success) {
      setIsError(false);
      setMessage(`"${name}" was added and is now live on the services page.`);
      if (result.data) onCreated?.(result.data as Service);
      resetForm();
    } else {
      setIsError(true);
      setMessage(result.error ?? "Failed to create service");
    }

    setSubmitting(false);
  }

  return (
    <form
      className="flex flex-col gap-5 bg-(--navBG)/60 p-6 border border-red-500/40 rounded-xl w-full max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <label htmlFor="name" className="block mb-1 font-light text-sm">
          Service name
        </label>
        <InputField
          id="name"
          placeholder="e.g. Gear & Stat Optimisation"
          type="text"
          className={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="mt-1 text-[#94A3B8] text-xs">
          The booking url is generated from this automatically.
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-light text-sm">
          Description
        </label>
        <textarea
          id="description"
          placeholder="What the session covers, at least 20 characters"
          rows={4}
          className="bg-transparent px-2 py-2 border border-red-500/40 focus:border-red-500 rounded-md outline-none w-full text-neutral-50 placeholder:text-gray-500 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="block mb-1 font-light text-sm">
            Price (SEK)
          </label>
          <InputField
            id="price"
            placeholder="350"
            type="number"
            className={inputStyle}
            value={priceSek}
            onChange={(e) => setPriceSek(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="duration" className="block mb-1 font-light text-sm">
            Duration (minutes)
          </label>
          <InputField
            id="duration"
            placeholder="60"
            type="number"
            className={inputStyle}
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
          />
          <p className="mt-1 text-[#94A3B8] text-xs">Between 15 and 480.</p>
        </div>
      </div>

      <div>
        <label htmlFor="deliverables" className="block mb-1 font-light text-sm">
          Deliverables
        </label>
        <textarea
          id="deliverables"
          placeholder={"One per line, e.g.\nTimestamped Feedback\nWritten Summary"}
          rows={4}
          className="bg-transparent px-2 py-2 border border-red-500/40 focus:border-red-500 rounded-md outline-none w-full text-neutral-50 placeholder:text-gray-500 resize-none"
          value={deliverables}
          onChange={(e) => setDeliverables(e.target.value)}
        />
      </div>

      <BigButton
        text={submitting ? "Adding..." : "Add Service"}
        type="submit"
        className="px-8! py-3! w-full text-sm!"
        disabled={submitting}
      />

      {message && (
        <p
          className={`text-sm text-center ${isError ? "text-red-400" : "text-green-400"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default ServiceForm;
