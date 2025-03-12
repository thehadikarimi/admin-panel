import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full px-3 lg:px-5">
      <div className="mb-3 py-7 text-sm lg:text-base">
        <p>
          <span>توسعه داده شده با ❤️ توسط </span>
          <Link
            target="_blank"
            href="https://github.com/thehadikarimi/admin-panel"
            className="text-primary"
          >
            thehadikarimi
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
