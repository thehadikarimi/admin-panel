function DropdownToggle({ children, onClick, state, className }) {
  return (
    <div onClick={onClick} className={className} aria-hidden={!state}>
      {children}
    </div>
  );
}

export default DropdownToggle;
