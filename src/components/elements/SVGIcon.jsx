function SVGIcon({ name, className, ...attr }) {
  return (
    <svg {...attr} className={className}>
      <use href={`#${name}`} />
    </svg>
  );
}

export default SVGIcon;
