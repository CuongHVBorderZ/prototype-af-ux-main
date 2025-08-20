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
  Modal,
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
import ModalAuthenticityCheck from "./ModalAuthenticityCheck";

// eslint-disable-next-line react/prop-types
const BasicInformationBagEmpty = ({ hasCheckAuthen, upPNItem }) => {
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
  const [openCheckAuthentication, setOpenCheckAuthentication] = useState(false);
  const handleOnChangeCheckAuthen = (e) => {
    setOpenCheckAuthentication(true);
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
            label={<span>ブランド</span>}
            name="brand"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="3.1フィリップリム">3.1フィリップリム</Option>
              <Option value="3.ADMJ">3.ADMJ</Option>
              <Option value="3.J&Mデヴィッドソン">3.J&Mデヴィッドソン</Option>
              <Option value="3.MCM">3.MCM</Option>
              <Option value="3.omega">3.omega</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>ライン</span>}
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
            label={<span>モデル名</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
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

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="&nbsp;"
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Checkbox
              onClick={(e) => {
                handleOnChangeCheckAuthen(e);
              }}
            >
              VD真贋チェック
            </Checkbox>
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
        詳細情報
      </Title>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label={<span>シリアル</span>}
            name="brand"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="A:1997年">A:1997年</Option>
              <Option value="A:1996年">A:1996年</Option>
              <Option value="A:1995年">A:1997年</Option>
              <Option value="A:1994年">A:1994年</Option>
              <Option value="A:1993年">A:1993年</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>色</span>}
            name="modelName"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
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
            label={<span>素材</span>}
            name="modelNumber"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="レナージュ">レナージュ</Option>
              <Option value="ロシアンセーブル">ロシアンセーブル</Option>
              <Option value="ウール×ポリエステル">ウール×ポリエステル</Option>
              <Option value="ポリアミド">ポリアミド</Option>
              <Option value="キュプラ">キュプラ</Option>
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
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="サイズ-1">サイズ-1</Option>
              <Option value="サイズ-2">サイズ-2</Option>
              <Option value="サイズ-3">サイズ-3</Option>
              <Option value="サイズ-4">サイズ-4</Option>
              <Option value="サイズ-5">サイズ-5</Option>
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
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="箱">箱</Option>
              <Option value="ギャランティ">ギャランティ</Option>
              <Option value="カデナ">カデナ</Option>
              <Option value="クロシェット">クロシェット</Option>
              <Option value="ショルダーストラップ">ショルダーストラップ</Option>
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
            label={<span>ランク</span>}
            name="brand"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="N">N</Option>
              <Option value="S">S</Option>
              <Option value="SA">SA</Option>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span></span>}
            name="modelName"
            style={{ marginBottom: "16px" }}
          >
            <Checkbox></Checkbox>
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
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="無し">無し</Option>
              <Option value="極小">極小</Option>
              <Option value="小">小</Option>
              <Option value="中">中</Option>
              <Option value="大">大</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span>シミ・汚れ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="無し">無し</Option>
              <Option value="小">小</Option>
              <Option value="中">中</Option>
              <Option value="大">大</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span>ヤケ・変色</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="無し">無し</Option>
              <Option value="小">小</Option>
              <Option value="中">中</Option>
              <Option value="大">大</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span>型崩れ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="無し">無し</Option>
              <Option value="小">小</Option>
              <Option value="中">中</Option>
              <Option value="大">大</Option>
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
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="無し">無し</Option>
              <Option value="小">小</Option>
              <Option value="中">中</Option>
              <Option value="大">大</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span>シミ・汚れ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="無し">無し</Option>
              <Option value="小">小</Option>
              <Option value="中">中</Option>
              <Option value="大">大</Option>
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
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="無し">無し</Option>
              <Option value="極小">極小</Option>
              <Option value="小">小</Option>
              <Option value="中">中</Option>
              <Option value="大">大</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span>シミ・汚れ</span>}
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="無し">無し</Option>
              <Option value="小">小</Option>
              <Option value="中">中</Option>
              <Option value="大">大</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={<span>ベタ</span>} style={{ marginBottom: "16px" }}>
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="無し">無し</Option>
              <Option value="小">小</Option>
              <Option value="中">中</Option>
              <Option value="大">大</Option>
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
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="あり">あり</Option>
              <Option value="なし">なし</Option>
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
      <Modal
        open={openCheckAuthentication}
        onOk={() => {
          setOpenCheckAuthentication(false);
        }}
        onCancel={() => {
          setOpenCheckAuthentication(false);
        }}
        title="VD真贋チェック"
        okText="確認"
        cancelText="キャンセル"
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "70%",
          xl: "70%",
          xxl: "70%",
        }}
        footer={null}
        style={{ top: 20 }}
      >
        <ModalAuthenticityCheck
          cancel={() => setOpenCheckAuthentication(false)}
          save={(data) => {
            upPNItem("check_authen_checked", true);
            setOpenCheckAuthentication(false);
          }}
        ></ModalAuthenticityCheck>
      </Modal>
    </div>
  );
};

export default BasicInformationBagEmpty;
