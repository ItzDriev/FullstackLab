import { useNavigate } from "react-router-dom";
import BigButton from "../../../components/BigButton";
import type { Service } from "../backend/services";

interface ServiceCardProps {
  service: Service;
  /* Staggers the entrance animation across the row. */
  delayMs: number;
}

function ServiceCard({ service, delayMs }: ServiceCardProps) {
  const navigate = useNavigate();

  return (
    <article
      className="flex flex-col bg-(--mainBG)/70 w-full max-w-[320px] animate-rise lg:min-h-[50vh] border-t-2 border-red-500 transition-all duration-300 ease-out hover:-translate-y-4 hover:shadow-[0_0_25px_rgba(255,45,45,0.4)]"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="flex flex-col gap-4 p-4">
        <h2 className="font-montserrat font-bold text-xl uppercase">
          {service.name}
        </h2>
        <hr className="border-red-500/60" />

        <div className="flex justify-between items-baseline font-montserrat">
          <span className="font-bold text-red-500 text-2xl">
            {service.priceSek} kr
          </span>
          <span className="text-[#94A3B8] text-sm">
            {service.durationMinutes} min
          </span>
        </div>

        <p className="text-red-400">{service.description}</p>

        <ul className="flex flex-col gap-4 marker:text-red-500 list-disc list-inside">
          {service.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-center items-center mt-auto mb-4">
        <BigButton
          text="Book Session"
          className="px-8! py-3! text-sm!"
          onClick={() => navigate(`/booking/${service.slug}`)}
        />
      </div>
    </article>
  );
}

export default ServiceCard;
