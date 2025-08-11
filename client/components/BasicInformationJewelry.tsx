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
  ArrowRightOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;
const { Option } = Select;

import { TreeSelect } from "antd";
import type { TreeSelectProps } from "antd";
import TextArea from "antd/es/input/TextArea";

// eslint-disable-next-line react/prop-types
const BasicInformationJewelry = () => {
  const [form] = Form.useForm();
  const [accessories, setAccessories] = useState([
    "あまりゴマ",
    "��",
    "並行ギャラ",
  ]);

  const treeData = [
    {
      value: "parent 1",
      title: "時計",
      disabled: true,
      children: [
        {
          value: "parent 1-0",
          title: "腕時計",
          disabled: true,
          children: [
            {
              value: "leaf1",
              title: "ロレックス",
            },
            {
              value: "leaf2",
              title: "オメガ",
            },
            {
              value: "leaf3",
              title: "カルティエ",
            },
            {
              value: "leaf4",
              title: "タグホイヤー",
            },
            {
              value: "leaf5",
              title: "セイコー",
            },
            {
              value: "leaf6",
              title: "BRM",
            },
          ],
        },
      ],
    },
    {
      value: "parent 2",
      title: "地金",
      disabled: true,
      children: [
        {
          value: "leaf21",
          title: "金",
        },
      ],
    },
    {
      value: "parent 3",
      title: "バッグ",
      disabled: true,
      children: [
        {
          value: "leaf31",
          title: "ハンドバッグ",
          disabled: true,
          children: [
            {
              value: "leaf311",
              title: "エルメス",
            },
          ],
        },
      ],
    },
    {
      value: "parent 4",
      title: "アパレル・靴",
      disabled: true,
      children: [
        {
          value: "leaf41",
          title: "靴",
        },
      ],
    },
    {
      value: "parent 5",
      title: "アクセサリー・小物",
    },
    {
      value: "parent 6",
      title: "ジュエリー",
    },
    {
      value: "parent 7",
      title: "ブランドジュエリー",
    },
  ];

  const findPathByValue = (data, value, path = []) => {
    for (const node of data) {
      const newPath = [...path, node.title];
      if (node.value === value) return newPath;
      if (node.children) {
        const result = findPathByValue(node.children, value, newPath);
        if (result) return result;
      }
    }
    return null;
  };

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
    const path = findPathByValue(treeData, value);
    const breadcrumb = path ? path.join(" / ") : "";
    setSelectedLabel(breadcrumb);
  };

  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const onPopupScroll: TreeSelectProps["onPopupScroll"] = (e) => {
    console.log("onPopupScroll", e);
  };

  return (
    <div>
      <Title
        level={4}
        style={{
          lineHeight: "28px",
          marginBottom: "20px",
        }}
      >
        基本情報
      </Title>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label={<span>重量</span>}
            name="brand"
            style={{ marginBottom: "16px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>形状</span>}
            name="modelName"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="形状1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="形状1">形状1</Option>
              <Option value="形状2">形状2</Option>
              <Option value="形状3">形状3</Option>
              <Option value="形状4">形状4</Option>
              <Option value="形状5">形状5</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>カラー</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="カラー1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="カラー1">カラー1</Option>
              <Option value="カラー2">カラー2</Option>
              <Option value="カラー3">カラー3</Option>
              <Option value="カラー4">カラー4</Option>
              <Option value="カラー5">カラー5</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Divider
        style={{
          borderColor: "rgba(230, 230, 230, 0.6)",
          margin: "24px 0",
        }}
      />

      <Title
        level={4}
        style={{
          lineHeight: "28px",
          marginBottom: "20px",
        }}
      >
        詳細情報
      </Title>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>カラーダイヤ</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="カラーダイヤ1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="カラーダイヤ1">カラーダイヤ1</Option>
              <Option value="カラーダイヤ2">カラーダイヤ2</Option>
              <Option value="カラーダイヤ3">カラーダイヤ3</Option>
              <Option value="カラーダイヤ4">カラーダイヤ4</Option>
              <Option value="カラーダイヤ5">カラーダイヤ5</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>クラリティ</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="クラリティ1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="クラリティ1">クラリティ1</Option>
              <Option value="クラリティ2">クラリティ2</Option>
              <Option value="クラリティ3">クラリティ3</Option>
              <Option value="クラリティ4">クラリティ4</Option>
              <Option value="クラリティ5">クラリティ5</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>カット</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="カット1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="カット1">カット1</Option>
              <Option value="カット2">カット2</Option>
              <Option value="カット3">カット3</Option>
              <Option value="カット4">カット4</Option>
              <Option value="カット5">カット5</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>蛍光性</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="蛍光性1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="蛍光性1">蛍光性1</Option>
              <Option value="蛍光性2">蛍光性2</Option>
              <Option value="蛍光性3">蛍光性3</Option>
              <Option value="蛍光性4">蛍光性4</Option>
              <Option value="蛍光性5">蛍光性5</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>処理</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="処理1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="処理1">処理1</Option>
              <Option value="処理2">処理2</Option>
              <Option value="処理3">処理3</Option>
              <Option value="処理4">処理4</Option>
              <Option value="処理5">処理5</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>鑑定書</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="鑑定書1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="鑑定書1">鑑定書1</Option>
              <Option value="鑑定書2">鑑定書2</Option>
              <Option value="鑑定書3">鑑定書3</Option>
              <Option value="鑑定書4">鑑定書4</Option>
              <Option value="鑑定書5">鑑定書5</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>ポリッシュ</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="ポリッシュ1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="ポリッシュ1">ポリッシュ1</Option>
              <Option value="ポリッシュ2">ポリッシュ2</Option>
              <Option value="ポリッシュ3">ポリッシュ3</Option>
              <Option value="ポリッシュ4">ポリッシュ4</Option>
              <Option value="ポリッシュ5">ポリッシュ5</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>シンメトリ</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="シンメトリ1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="シンメトリ1">シンメトリ1</Option>
              <Option value="シンメトリ2">シンメトリ2</Option>
              <Option value="シンメトリ3">シンメトリ3</Option>
              <Option value="シンメトリ4">シンメトリ4</Option>
              <Option value="シンメトリ5">シンメトリ5</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>ソーティングNo</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="ソーティングNo1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="ソーティングNo1">ソーティングNo1</Option>
              <Option value="ソーティングNo2">ソーティングNo2</Option>
              <Option value="ソーティングNo3">ソーティングNo3</Option>
              <Option value="ソーティングNo4">ソーティングNo4</Option>
              <Option value="ソーティングNo5">ソーティングNo5</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>サイズ</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="サイズ1"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="サイズ1">サイズ1</Option>
              <Option value="サイズ2">サイズ2</Option>
              <Option value="サイズ3">サイズ3</Option>
              <Option value="サイズ4">サイズ4</Option>
              <Option value="サイズ5">サイズ5</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Divider
        style={{
          borderColor: "rgba(230, 230, 230, 0.6)",
          margin: "24px 0",
        }}
      />
      <Title
        level={4}
        style={{
          lineHeight: "28px",
          marginBottom: "20px",
        }}
      >
        その他
      </Title>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label={<span>補足</span>} style={{ marginBottom: "16px" }}>
            <TextArea value={value} autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BasicInformationJewelry;
