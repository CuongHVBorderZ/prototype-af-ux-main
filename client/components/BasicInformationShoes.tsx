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
const BasicInformationShoes = () => {
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
              defaultValue={"ブランド1"}
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
            label={
              <span>
                <span style={{ color: "#FF4D4F", marginRight: "4px" }}>*</span>
                ライン
              </span>
            }
            name="modelName"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              defaultValue={"ライン1"}
            >
              <Option value="ライン1">ライン1</Option>
              <Option value="ライン2">ライン2</Option>
              <Option value="ライン3">ライン3</Option>
              <Option value="ライン4">ライン4</Option>
              <Option value="ライン5">ライン5</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>モデル名</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              defaultValue={"モデル名-1"}
            >
              <Option value="モデル名-1">モデル名-1</Option>
              <Option value="モデル名-2">モデル名-2</Option>
              <Option value="モデル名-3">モデル名-3</Option>
              <Option value="モデル名-4">モデル名-4</Option>
              <Option value="モデル名-5">モデル名-5</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>型番</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              defaultValue={"型番-1"}
            >
              <Option value="型番-1">型番-1</Option>
              <Option value="型番-2">型番-2</Option>
              <Option value="型番-3">型番-3</Option>
              <Option value="型番-4">型番-4</Option>
              <Option value="型番-5">型番-5</Option>
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
            label={
              <span>
                <span style={{ color: "#FF4D4F", marginRight: "4px" }}>*</span>
                年式
              </span>
            }
            name="brand"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              defaultValue={"年式1"}
            >
              <Option value="年式1">年式1</Option>
              <Option value="年式2">年式2</Option>
              <Option value="年式3">年式3</Option>
              <Option value="年式4">年式4</Option>
              <Option value="年式5">年式5</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>素材（メイン）</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue={"SS"}
              placeholder="未選択"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="SS">SS</Option>
              <Option value="SS×YG">SS×YG</Option>
              <Option value="SS×WG">SS×WG</Option>
              <Option value="SS×PT">SS×PT</Option>
              <Option value="SS×PG">SS×PG</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>素材（サブ）</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue={"SS"}
              placeholder="未選択"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="SS">SS</Option>
              <Option value="SS×YG">SS×YG</Option>
              <Option value="SS×WG">SS×WG</Option>
              <Option value="SS×PT">SS×PT</Option>
              <Option value="SS×PG">SS×PG</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>色（メイン）</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              defaultValue={"A"}
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="F">F</Option>
              <Option value="E">E</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>色（サブ）</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              defaultValue={"A"}
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="F">F</Option>
              <Option value="E">E</Option>
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
              defaultValue={"サイズ-1"}
            >
              <Option value="サイズ-1">サイズ-1</Option>
              <Option value="サイズ-2">サイズ-2</Option>
              <Option value="サイズ-3">サイズ-3</Option>
              <Option value="サイズ-4">サイズ-4</Option>
              <Option value="サイズ-5">サイズ-5</Option>
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
              defaultValue={"男性"}
            >
              <Option value="男性">男性</Option>
              <Option value="女性">女性</Option>
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

export default BasicInformationShoes;
