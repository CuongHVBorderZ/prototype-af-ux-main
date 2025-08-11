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
import BasicInformationShoes from "./BasicInformationShoes";
const { Content } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

// eslint-disable-next-line react/prop-types
const PNItemEditShoes = () => {
  const [api, contextHolder] = notification.useNotification();
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
            <BasicInformationShoes></BasicInformationShoes>
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
            <EstimatePrice></EstimatePrice>
          </Col>
        </Row>
        {/* Action Buttons */}
        <div>
          <Flex gap="middle" justify="flex-end">
            <Button style={{ width: "150px" }}>下書きを保存</Button>
            <Button style={{ width: "150px" }}>クリア</Button>
            <Button style={{ width: "150px" }} type="primary">
              保存
            </Button>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default PNItemEditShoes;
