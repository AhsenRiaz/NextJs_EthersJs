import React, { useEffect } from "react";
import { Container, Row, Text, Col } from "@nextui-org/react";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../utils/etherjsConnection/connectors";
import Connect from "./Connect";

const Header = () => {
  const { activate } = useWeb3React();

  useEffect(() => {
    injectedConnector
      .isAuthorized()
      .then((isAuthorized: any) => {
        if (isAuthorized) {
          activate(injectedConnector);
        }
      })
      .catch(() => {});
  }, [activate]);

  return (
    <Container xl>
      <Row justify="center" align="center" css={{ padding: "0rem 1rem" }}>
        <Col
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1rem",
          }}
        >
          <Text size={30} css={{ textGradient: "$primaryTextGradient" }}>
            Coinio ICO
          </Text>

          <Connect />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
