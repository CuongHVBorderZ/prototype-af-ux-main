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
import { useNavigate, useSearchParams } from "react-router-dom";
import FooterPNItemEdit from "./FooterPNItemEdit";
import BasicInformationWatchEmpty from "./BasicInformationWatchEmpty";
const { Content } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

// eslint-disable-next-line react/prop-types
const PNItemEditWatch = ({
  pnDetail,
  handleChangePrice,
  hasCheckAuthen,
  upPNItem,
}) => {
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
              paddingTop: "20px",
              paddingRight: "20px",
            }}
          >
            {mode == "new" ? (
              <BasicInformationWatchEmpty></BasicInformationWatchEmpty>
            ) : (
              <BasicInformationWatch
                hasCheckAuthen={hasCheckAuthen}
                upPNItem={upPNItem}
              ></BasicInformationWatch>
            )}
          </Col>
          <Col
            span={12}
            style={{
              borderLeft: "1px solid #e6e6e699",
              paddingTop: "20px",
              paddingLeft: "20px",
            }}
          >
            <StateDefinition updateStatusAssessed={undefined}></StateDefinition>
            <EstimatePrice
              pnDetail={pnDetail}
              updateStatusAssessed={undefined}
              handleChangePrice={handleChangePrice}
            ></EstimatePrice>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PNItemEditWatch;
