import * as React from "react";

import screens from "@/screens.json";

function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

export function useBreakpoint(breakpoint: keyof typeof screens) {
  const value = screens[breakpoint];

  return useMediaQuery(`(min-width: ${value})`);
}
