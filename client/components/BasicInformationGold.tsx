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
const BasicInformationGold = () => {
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
                貴金属種別
              </span>
            }
            name="brand"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              defaultValue={"K24IG"}
            >
              <Option value="K24IG">K24IG</Option>
              <Option value="K24IG（500g以下）">K24IG（500g以下）</Option>
              <Option value="K24 S">K24 S</Option>
              <Option value="K22 S">K22 S</Option>
              <Option value="K21.6 S">K21.6 S</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={
              <span>
                <span style={{ color: "#FF4D4F", marginRight: "4px" }}>*</span>
                グラム
              </span>
            }
            name="modelName"
            style={{ marginBottom: "16px" }}
          >
            <Input defaultValue={"グラム"} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>バーブランド</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              defaultValue={"田中貴金属工業"}
            >
              <Option value="田中貴金属工業">田中貴金属工業</Option>
              <Option value="三菱マテリアル">三菱マテリアル</Option>
              <Option value="三井金属鉱業">三井金属鉱業</Option>
              <Option value="住友金属工業">住友金属工業</Option>
              <Option value="日鉱金属">日鉱金属</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>{/* Empty space */}</Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="&nbsp;"
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Checkbox>刻印確認済み</Checkbox>
          </Form.Item>
        </Col>
        <Col span={12}>{/* Empty space */}</Col>
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
        見込価格計算
      </Title>
      <Flex vertical>
        <Flex>
          <div style={{ width: "120px" }}>
            <span>相場</span>
          </div>
          <div>
            <span>2025年07月18日 現在</span>
          </div>
        </Flex>
        <Flex>
          <div style={{ width: "120px" }}>
            <span>グラム単価</span>
          </div>
          <div>
            <span>¥7,284/g</span>
          </div>
        </Flex>
        <Flex>
          <div style={{ width: "120px" }}>
            <span>上限買取価格</span>
          </div>
          <div>
            <span>¥72,840</span>
          </div>
        </Flex>
        <Flex style={{ margin: "20px 0 0 0" }}>
          <div style={{ width: "120px", margin: "30px 0" }}>
            <span>見込価格計算</span>
          </div>
          <div>
            <Flex>
              <div>
                <Flex vertical>
                  <span>見込粗利率</span>
                  <Input suffix={<PercentageOutlined />} />
                </Flex>
              </div>
              <div style={{ margin: "30px 10px" }}>
                <ArrowRightOutlined />
              </div>
              <div>
                <Flex vertical>
                  <span>見込価格</span>
                  <Input prefix={"¥"} />
                </Flex>
              </div>
            </Flex>
          </div>
        </Flex>
      </Flex>
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

export default BasicInformationGold;
