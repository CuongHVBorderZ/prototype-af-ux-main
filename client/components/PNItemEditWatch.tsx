import BasicInformationWatch from "@/components/BasicInformationWatch";
import StateDefinition from "@/components/feature/StateDefinition";
import HeaderPNItemEdit from "@/components/HeaderPNItemEdit";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowUpOutlined,
  EditOutlined,
  FormOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Flex,
  Layout,
  notification,
  Row,
  Typography,
} from "antd";
import React from "react";
import EstimatePrice from "./EstimatePrice";
import { useNavigate } from "react-router-dom";
import FooterPNItemEdit from "./FooterPNItemEdit";
const { Content } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

// eslint-disable-next-line react/prop-types
const PNItemEditWatch = () => {
  return (
    <>
      <div
        style={{ marginTop: "20px", padding: "20px", backgroundColor: "white" }}
      >
        <Row>
          <Col
            span={12}
            style={{
              paddingTop: "20px",
              paddingRight: "20px",
            }}
          >
            <BasicInformationWatch></BasicInformationWatch>
          </Col>
          <Col
            span={12}
            style={{
              borderLeft: "1px solid #e6e6e699",
              paddingTop: "20px",
              paddingLeft: "20px",
            }}
          >
            <StateDefinition></StateDefinition>
            <EstimatePrice></EstimatePrice>
          </Col>
        </Row>
        {/* Action Buttons */}
        <FooterPNItemEdit></FooterPNItemEdit>
      </div>
    </>
  );
};

export default PNItemEditWatch;
