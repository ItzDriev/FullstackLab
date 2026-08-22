interface StatusDotProps {
  colour: string;
  label: string;
  count: number;
}

function StatusDot({ colour, label, count }: StatusDotProps) {
  return (
    <span className="flex items-center gap-2 text-xs">
      <span className={`w-2 h-2 rounded-full ${colour}`} />
      <span className="text-[#94A3B8]">{label}</span>
      <span className="font-semibold text-white">{count}</span>
    </span>
  );
}

export default StatusDot;
