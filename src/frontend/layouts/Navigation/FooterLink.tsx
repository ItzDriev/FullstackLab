interface Props {
  text: string;
  onClick: () => void;
}

function FooterLink({ text, onClick }: Props) {
  return (
    <span
      onClick={onClick}
      className="text-[#4a6274] hover:text-white text-sm transition-colors cursor-pointer"
    >
      {text}
    </span>
  );
}

export default FooterLink;
