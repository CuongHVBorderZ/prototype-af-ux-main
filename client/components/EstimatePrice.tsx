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
const { Title, Text } = Typography;
const { Option } = Select;

// eslint-disable-next-line react/prop-types
const EstimatePrice = () => {
  return (
    <div style={{ padding: "20px" }}>
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
          dataSource={[
            {
              key: "1",
              initial: "¥ 1,150,000",
              final: "¥ 1,180,000",
              expected: "¥ 1,280,000",
              finalProfit: "¥ 100,000",
              finalProfitRate: "10％",
              established: true,
            },
          ]}
          columns={[
            {
              title: "初回提示金額",
              dataIndex: "initial",
              key: "initial",
              width: 179,
              align: "center",
              render: (text) => <Text>{text}</Text>,
            },
            {
              title: "最終提示金額 - xxxx",
              dataIndex: "final",
              key: "final",
              width: 179,
              align: "center",
              render: (text) => <Text>{text}</Text>,
            },
            {
              title: "見込価格",
              dataIndex: "expected",
              key: "expected",
              width: 179,
              align: "center",
              render: (text) => <Text>{text}</Text>,
            },
            {
              title: "最終粗利",
              dataIndex: "finalProfit",
              key: "finalProfit",
              width: 179,
              align: "center",
              render: (text) => <Text>{text}</Text>,
            },
            {
              title: "最終粗利率",
              dataIndex: "finalProfitRate",
              key: "finalProfitRate",
              width: 179,
              align: "center",
              render: (text) => <Text>{text}</Text>,
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

      {/* Action Buttons */}
      <div>
        <Flex gap="middle">
          <Button style={{ width: "150px" }}>下書きを保存</Button>
          <Button style={{ width: "150px" }}>クリア</Button>
          <Button style={{ width: "150px" }} type="primary">
            保存
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default EstimatePrice;
