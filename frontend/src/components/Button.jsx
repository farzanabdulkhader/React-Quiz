const small = "text-xl px-4 py-2";
const large = "text-2xl px-6 py-3";

function Button({ children, onClick, size }) {
  const sizeClass = size === "large" ? large : small; // Determine size class based on size prop

  return (
    <button
      className={`
        ${sizeClass} 
        bg-[var(--yellow)] text-[var(--dark)] rounded-full 
        hover:bg-transparent hover:text-[#fafafa] hover:border-2 hover:border-[var(--yellow)] 
        transition-all duration-75
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
