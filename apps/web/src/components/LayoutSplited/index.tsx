import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import Copyright from "../Copyright";
import topology from "vanta/dist/vanta.topology.min";
import fog from "vanta/dist/vanta.fog.min";

export default function LayoutSplited({ children }: { children: any }) {
  const [vantaEffect, setVantaEffect] = useState<any>();
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && myRef) {
      setVantaEffect(
        false
          ? fog({
              el: myRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              highlightColor: "#d9b977",
              midtoneColor: "#28243b",
              lowlightColor: "#28243b",
              baseColor: "#28243b",
              blurFactor: 0.31,
              speed: 0.1,
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
              color: "#d9b977",
              backgroundColor: "#28243b",
            })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, myRef]);
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      ref={myRef}
    >
      {children}
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
