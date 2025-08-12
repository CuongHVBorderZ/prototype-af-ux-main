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
const BasicInformationBrandJewelry = () => {
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
            label={
              <span>
                <span style={{ color: "#FF4D4F", marginRight: "4px" }}>*</span>
                ブランド
              </span>
            }
            name="brand"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="ブランド1">ブランド1</Option>
              <Option value="ブランド2">ブランド2</Option>
              <Option value="ブランド3">ブランド3</Option>
              <Option value="ブランド4">ブランド4</Option>
              <Option value="ブランド5">ブランド5</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>モデル名</span>}
            name="modelName"
            style={{ marginBottom: "16px" }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>形状</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
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
        <Col span={12}>
          <Form.Item
            label={<span>シリアル</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="シリアル1">シリアル1</Option>
              <Option value="シリアル2">シリアル2</Option>
              <Option value="シリアル3">シリアル3</Option>
              <Option value="シリアル4">シリアル4</Option>
              <Option value="シリアル5">シリアル5</Option>
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

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label={<span>宝石名1</span>}
            name="brand"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="宝石名1">宝石名1</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>宝石名2</span>}
            name="brand"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="宝石名2">宝石名2</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>金証（メイン）</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="金証（メイン）">金証（メイン）</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>金証（サブ）</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="金証（サブ）">金証（サブ）</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>メインカラー</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="メインカラー">メインカラー</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>サブカラー</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="サブカラー">サブカラー</Option>
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
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="ポリッシュ">ポリッシュ</Option>
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
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="シンメトリ">シンメトリ</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>サイズ</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="サイズ">サイズ</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>重量</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="重量">重量</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>石目1</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="石目1">石目1</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>石目2</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="石目2">石目2</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>クラリティ</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="クラリティ">クラリティ</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>カット</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="カット">カット</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>蛍光性</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="蛍光性">蛍光性</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>性別</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="性別">性別</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>鑑定書</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="鑑定書">鑑定書</Option>
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

export default BasicInformationBrandJewelry;
