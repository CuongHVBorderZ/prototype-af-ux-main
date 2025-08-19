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
import BasicInformationGold from "./BasicInformationGold";
import EstimatePrice from "./EstimatePrice";
import BasicInformationBrandJewelry from "./BasicInformationBrandJewelry";
import FooterPNItemEdit from "./FooterPNItemEdit";
import { useSearchParams } from "react-router-dom";
import BasicInformationBrandJewelryEmpty from "./BasicInformationBrandJewelryEmpty";
const { Content } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

// eslint-disable-next-line react/prop-types
const PNItemEditBrandJewelry = ({ handleChangePrice }) => {
  const [api, contextHolder] = notification.useNotification();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  return (
    <>
      <div
        style={{ marginTop: "20px", padding: "20px", backgroundColor: "white" }}
      >
        <Row>
          <Col
            span={12}
            style={{
              // borderTop: "1px solid #e6e6e699",
              paddingTop: "20px",
              paddingRight: "20px",
            }}
          >
            {mode == "new" ? (
              <BasicInformationBrandJewelryEmpty></BasicInformationBrandJewelryEmpty>
            ) : (
              <BasicInformationBrandJewelry></BasicInformationBrandJewelry>
            )}
          </Col>
          <Col
            span={12}
            style={{
              // borderTop: "1px solid #e6e6e699",
              borderLeft: "1px solid #e6e6e699",
              paddingTop: "20px",
              paddingLeft: "20px",
            }}
          >
            <EstimatePrice
              updateStatusAssessed={undefined}
              handleChangePrice={handleChangePrice}
            ></EstimatePrice>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PNItemEditBrandJewelry;
