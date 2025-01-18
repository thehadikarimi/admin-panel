import styles from "./Loading.module.css";

function Loading({ fill = "#a1a3a8", width = "32", height = "24", className }) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
    >
      <circle
        cx="3"
        cy="3"
        r="3"
        transform="matrix(1 0 0 1 1 9)"
        className={styles.circle1}
      />
      <circle
        cx="3"
        cy="3"
        r="3"
        transform="matrix(1 0 0 1 9 9)"
        className={styles.circle2}
      />
      <circle
        cx="3"
        cy="3"
        r="3"
        transform="matrix(1 0 0 1 17 9)"
        className={styles.circle3}
      />
    </svg>
  );
}

export default Loading;
