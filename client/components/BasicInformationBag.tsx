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
const BasicInformationBag = () => {
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
              defaultValue="K24IG"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="K24IG">K24IG</Option>
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
            <Input size="large" defaultValue="エクスプローラー36" />
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
              defaultValue="K24IG"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="K24IG">K24IG</Option>
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
              defaultValue="K24IG"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="K24IG">K24IG</Option>
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
                シリアル
              </span>
            }
            name="brand"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="K24IG"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="K24IG">K24IG</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={
              <span>
                <span style={{ color: "#FF4D4F", marginRight: "4px" }}>*</span>
                色
              </span>
            }
            name="modelName"
            style={{ marginBottom: "16px" }}
          >
            <Input size="large" defaultValue="エクスプローラー36" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span>素材</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="K24IG"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="K24IG">K24IG</Option>
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
              defaultValue="K24IG"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="K24IG">K24IG</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={<span>付属品</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              mode="multiple"
              defaultValue={["K24IG"]}
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="K24IG">K24IG</Option>
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
        状態定義
      </Title>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label={
              <span>
                <span style={{ color: "#FF4D4F", marginRight: "4px" }}>*</span>
                ランク
              </span>
            }
            name="brand"
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="N"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span></span>}
            name="modelName"
            style={{ marginBottom: "16px" }}
          >
            <Checkbox>Checkbox</Checkbox>
            <span style={{ margin: "0 10px" }}>点数</span>
            <Input style={{ width: "50%" }}></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            label={<span>スレ・キズ・ヒビ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="N"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span>シミ・汚れ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="N"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span>ヤケ・変色</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="N"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span>型崩れ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="N"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            label={<span>スレ・ヒビ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="N"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span>シミ・汚れ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="N"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            label={<span>スレ・キズ・ヒビ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="N"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span>シミ・汚れ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="N"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={<span>ベタ</span>} style={{ marginBottom: "16px" }}>
            <Select
              defaultValue="N"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            label={<span>破損・ビス取れ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              defaultValue="N"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
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

export default BasicInformationBag;
