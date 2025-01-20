import { useEffect, useState } from "react";

function useDOMReady() {
  const [DOMReady, setDOMReady] = useState(false);

  useEffect(() => setDOMReady(true), []);

  return DOMReady;
}

export default useDOMReady;
