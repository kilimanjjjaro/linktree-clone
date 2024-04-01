interface Props {
  className?: string;
}

export default function LinksIcon({ className }: Props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16 2H0V1h16v1ZM0 5.5.5 5h15l.5.5v5l-.5.5H.5l-.5-.5v-5ZM1 6v4h14V6H1Zm-1 9h16v-1H0v1Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
