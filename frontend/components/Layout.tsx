import React, { Fragment, ReactNode } from "react";
import { createTheme, NextUIProvider } from "@nextui-org/react";

import Header from "./Header";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../utils/etherjsConnection/getLibrary";

type ILayout = {
  children: ReactNode;
};

const theme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primaryLight: "$blue200",
      primaryLightHover: "$blue300",
      primaryLightActive: "$blue400",
      primaryLightContrast: "$blue600",
      primary: "$purple500",
      primaryBorder: "$blue500",
      primaryBorderHover: "$blue600",
      primarySolidHover: "$blue700",
      primarySolidContrast: "$white",
      primaryShadow: "$white500",
      primaryTextGradient: "45deg, $blue600 -20%, $pink600 50%",
      transparent: "#00000000",
      inputBorder: "2px solid #5e1dad",
      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple300 90%)",
      link: "#5e1dad",

      myColor: "#00000030",
    },

    space: {},
    fonts: {
      fontFamily: "SF Pro Display",
    },
  },
});

const Layout = ({ children }: ILayout) => {
  return (
    <Fragment>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Header />
        <NextUIProvider theme={theme}>{children}</NextUIProvider>
      </Web3ReactProvider>
    </Fragment>
  );
};

export default Layout;
