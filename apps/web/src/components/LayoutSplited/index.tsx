import React, { useEffect, useState, useRef } from "react";
import { Box, useTheme } from "@mui/material";
import Copyright from "../Copyright";
import topology from "vanta/dist/vanta.topology.min";
import fog from "vanta/dist/vanta.fog.min";
import useMediaQuery from "@mui/material/useMediaQuery";

const mode = "topology";

export default function LayoutSplited({ children }: { children: any }) {
  const [vantaEffect, setVantaEffect] = useState<any>();
  const myRef = useRef(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!vantaEffect && myRef && !matches) {
      setVantaEffect(
        mode === "fog"
          ? fog({
              el: myRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              highlightColor: theme.palette.primary.main,
              midtoneColor: theme.palette.background.default,
              lowlightColor: theme.palette.background.default,
              baseColor: theme.palette.background.default,
              blurFactor: 0.31,
              speed: 0.5,
              zoom: 1.5,
            })
          : topology({
              el: myRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              spacing: 10.0,
              chaos: 3.0,
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.background.default,
            })
      );
    }
    if (vantaEffect && matches) {
      vantaEffect.destroy();
      setVantaEffect(undefined);
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, myRef, matches, theme]);
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { xs: "start", sm: "center" },

        // width: "100vw",
        // minHeight: "-webkit-fill-available",
        height: "100vh",
      }}
      ref={myRef}
    >
      {children}
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
