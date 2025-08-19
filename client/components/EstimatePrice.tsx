import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Divider,
  Checkbox,
  Card,
  Typography,
  Space,
  Badge,
  Statistic,
  Row,
  Col,
  Tooltip,
  Tabs,
  Table,
  InputNumber,
  Drawer,
  Tag,
  Pagination,
  Flex,
  notification,
} from "antd";
import {
  SearchOutlined,
  QuestionCircleOutlined,
  FormOutlined,
  MessageOutlined,
  PlusOutlined,
  DownOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  BookOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import PriceInput from "./feature/PriceInput";
const { Title, Text } = Typography;
const { Option } = Select;

// eslint-disable-next-line react/prop-types
const EstimatePrice = ({ updateStatusAssessed, handleChangePrice }) => {
  const [priceData, setPriceData] = useState({
    initial: 0,
    final: 0,
    expected: 0,
    finalProfit: 0,
    finalProfitRate: "0",
    established: true,
  });

  const updateProfit = (key, value) => {
    setPriceData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const numberFormatter = (value) => {
    return value
      ? `￥${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      : "";
  };

  const percentageFormatter = (value) => {
    const roundedValue = Math.round(value * 100);
    return value ? `${roundedValue}%` : "";
  };

  const [api, contextHolder] = notification.useNotification();
  const onFinish = () => {
    updateStatusAssessed(true);
    api.success({
      message: "成功",
      description: "データが正常に保存されました",
    });
    // setTimeout(() => {
    //   navigate("/");
    // }, 700);
  };

  return (
    <div style={{ padding: "20px" }}>
      {contextHolder}
      {/* Price Information Summary Table */}
      <div
        style={{
          marginTop: "16px",
          marginBottom: "40px",
          border: "1px solid #CCC",
          background: "#FFF",
        }}
      >
        <Table
          dataSource={priceData ? [priceData] : []}
          columns={[
            {
              title: "初回提示金額",
              dataIndex: "initial",
              key: "initial",
              width: 179,
              align: "center",
              render: (text) => (
                <PriceInput
                  value={text}
                  onChange={(value) => {
                    updateProfit("initial", value);
                    handleChangePrice("purchase_price", value);
                  }}
                />
              ),
            },
            {
              title: "最終提示金額",
              dataIndex: "final",
              key: "final",
              width: 179,
              align: "center",
              render: (text) => (
                <PriceInput
                  value={text}
                  onChange={(value) => {
                    updateProfit("final", value);
                    handleChangePrice("prospective_selling_price", value);
                  }}
                />
              ),
            },
            {
              title: "見込価格",
              dataIndex: "expected",
              key: "expected",
              width: 179,
              align: "center",
              render: (text) => (
                <PriceInput
                  value={text}
                  onChange={(value) => {
                    updateProfit("expected", value);
                    handleChangePrice("price_gross_profit", value);
                  }}
                />
              ),
            },
            {
              title: "最終粗利",
              dataIndex: "finalProfit",
              key: "finalProfit",
              width: 179,
              align: "center",
              render: (text) => (
                <Text>
                  {numberFormatter(priceData.expected - priceData.final)}
                </Text>
              ),
            },
            {
              title: "最終粗利率",
              dataIndex: "finalProfitRate",
              key: "finalProfitRate",
              width: 179,
              align: "center",
              render: (text) => (
                <Text>
                  {percentageFormatter(
                    (priceData.expected - priceData.final) / priceData.initial,
                  )}
                </Text>
              ),
            },
            {
              title: "成立",
              dataIndex: "established",
              key: "established",
              width: 80,
              align: "center",
              render: (value) => <Checkbox checked={value} />,
            },
          ]}
          pagination={false}
          size="small"
          showHeader={true}
        />
      </div>

      {/* Profit Margin Analysis Section */}
      <div
        style={{
          background: "#FFF",
          marginBottom: "32px",
        }}
      >
        {/* Section Title */}
        <Title
          level={4}
          style={{
            fontFamily: "Source Sans Pro",
            fontWeight: 600,
            fontSize: "20px",
            color: "rgba(0, 0, 0, 0.88)",
            marginBottom: "20px",
            paddingLeft: "16px",
          }}
        >
          見込粗利率一覧
        </Title>

        {/* Form Controls */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            padding: "0 16px",
            marginBottom: "20px",
          }}
        >
          <div style={{ flex: 1 }}>
            <Form.Item
              label={<Text>見込粗利率（％）</Text>}
              style={{ marginBottom: 0 }}
            >
              <Input />
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <Form.Item
              label={<Text>買取価格</Text>}
              style={{ marginBottom: 0 }}
            >
              <Input value="¥ 0" disabled />
            </Form.Item>
          </div>
        </div>

        {/* Profit Margin Table */}
        <Flex gap="middle" vertical={false}>
          <div style={{ width: "50%" }}>
            <Table
              dataSource={[
                {
                  key: "1",
                  profitRate: "5%",
                  purchasePrice: "¥ 0",
                },
                {
                  key: "2",
                  profitRate: "10%",
                  purchasePrice: "¥ 0",
                },
                {
                  key: "3",
                  profitRate: "15%",
                  purchasePrice: "¥ 0",
                },
                {
                  key: "4",
                  profitRate: "20%",
                  purchasePrice: "¥ 0",
                },
                {
                  key: "5",
                  profitRate: "25%",
                  purchasePrice: "¥ 0",
                },
              ]}
              columns={[
                {
                  title: "見込粗利率",
                  dataIndex: "profitRate",
                  key: "profitRate",
                  align: "center",
                  render: (text) => <Text>{text}</Text>,
                },
                {
                  title: "買取価格",
                  dataIndex: "purchasePrice",
                  key: "purchasePrice",
                  align: "center",
                  render: (text) => <Text>{text}</Text>,
                },
              ]}
              pagination={false}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Table
              dataSource={[
                {
                  key: "6",
                  profitRate: "30%",
                  purchasePrice: "¥ 0",
                },
                {
                  key: "7",
                  profitRate: "35%",
                  purchasePrice: "¥ 0",
                },
                {
                  key: "8",
                  profitRate: "40%",
                  purchasePrice: "¥ 0",
                },
                {
                  key: "9",
                  profitRate: "45%",
                  purchasePrice: "¥ 0",
                },
                {
                  key: "10",
                  profitRate: "50%",
                  purchasePrice: "¥ 0",
                },
              ]}
              columns={[
                {
                  title: "見込粗利率",
                  dataIndex: "profitRate",
                  key: "profitRate",
                  align: "center",
                  render: (text) => <Text>{text}</Text>,
                },
                {
                  title: "買取価格",
                  dataIndex: "purchasePrice",
                  key: "purchasePrice",
                  align: "center",
                  render: (text) => <Text>{text}</Text>,
                },
              ]}
              pagination={false}
            />
          </div>
        </Flex>
      </div>
    </div>
  );
};
export default EstimatePrice;
