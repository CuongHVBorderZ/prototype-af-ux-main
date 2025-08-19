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
} from "@ant-design/icons";
const { Title, Text } = Typography;
const { Option } = Select;

import { TreeSelect } from "antd";
import type { TreeSelectProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import ModalAuthenticityCheck from "./ModalAuthenticityCheck";

// eslint-disable-next-line react/prop-types
const BasicInformationWatch = ({ hasCheckAuthen, upPNItem, pnDetail }) => {
  const [form] = Form.useForm();
  const [accessories, setAccessories] = useState([
    "あまりゴマ",
    "あま",
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
              defaultValue={pnDetail.brand_category}
            >
              <Option value="ロレックス">ロレックス</Option>
              <Option value="オメガ">オメガ</Option>
              <Option value="カルティエ">カルティエ</Option>
              <Option value="タグホイヤー">タグホイヤー</Option>
              <Option value="セイコー">セイコー</Option>
              <Option value="CTスクーデリア">CTスクーデリア</Option>
              <Option value="H.モーザー">H.モーザー</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>モデル名</span>}
            name="modelName"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              defaultValue={pnDetail.model_name}
            >
              <Option value="エクスプローラー36">エクスプローラー36</Option>
              <Option value="デイトジャスト41">デイトジャスト41</Option>
              <Option value="ヨットマスター 42">ヨットマスター 42</Option>
              <Option value="ヨットマスター37">ヨットマスター37</Option>
              <Option value="ヨットマスター40">ヨットマスター40</Option>
              <Option value="シードゥエラー4000">シードゥエラー4000</Option>
              <Option value="H.デイデイト40">デイデイト40</Option>
              <Option value="コスモグラフデイトナ">コスモグラフデイトナ</Option>
              <Option value="デイトジャスト">デイトジャスト</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
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
              defaultValue={pnDetail.model_number}
            >
              <Option value="116500LN">116500LN</Option>
              <Option value="69173G">69173G</Option>
              <Option value="00.10615.08.13.21">00.10615.08.13.21</Option>
              <Option value="00.10615.08.53.01">00.10615.08.53.01</Option>
              <Option value="00.10618.13.53.01">00.10618.13.53.01</Option>
              <Option value="00.10618.13.53.21">00.10618.13.53.21</Option>
              <Option value="00.10620.03.93.02">00.10620.03.93.02</Option>
              <Option value="H.00.10620.08.53.01">00.10620.08.53.01</Option>
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
            <Checkbox
              onClick={(e) => {
                handleOnChangeCheckAuthen(e);
              }}
              checked={hasCheckAuthen}
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
            label={<span>製造番号</span>}
            name="serialNumber"
            style={{ marginBottom: "16px" }}
          >
            <Input defaultValue={pnDetail.serial_number} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>素材</span>}
            name="material"
            style={{ marginBottom: "16px" }}
          >
            <Select
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

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label={<span>ムーブメント</span>}
            name="movement"
            style={{ marginBottom: "16px" }}
          >
            <Select
              placeholder="未選択"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="AT">AT</Option>
              <Option value="QZ">QZ</Option>
              <Option value="ソーラー">ソーラー</Option>
              <Option value="トゥールビヨン">トゥールビヨン</Option>
              <Option value="手巻き">手巻き</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>文字盤色</span>}
            name="dialColor"
            style={{ marginBottom: "16px" }}
          >
            <Select
              placeholder="選択"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="白ホリコン">白ホリコン</Option>
              <Option value="シェリーライン">シェリーライン</Option>
              <Option value="ゴールド">ゴールド</Option>
              <Option value="ブルーグラデーション">ブルーグラデーション</Option>
              <Option value="ルーレット">ルーレット</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label={<span>文字盤インデックス</span>}
            name="dialIndex"
            style={{ marginBottom: "16px" }}
          >
            <Select
              placeholder="未選択"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="バーインデックス">バーインデックス</Option>
              <Option value="アラビアインデックス">アラビアインデックス</Option>
              <Option value="ローマンインデックス">ローマンインデックス</Option>
              <Option value="ドット/ポイントインデックス">
                ドット/ポイントインデックス
              </Option>
              <Option value="クサビインデックス">クサビインデックス</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span>文字盤タイプ</span>}
            name="dialType"
            style={{ marginBottom: "16px" }}
          >
            <Select
              placeholder="未選択"
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="200タキメーター">200タキメーター</Option>
              <Option value="6ドット">6ドット</Option>
              <Option value="アイボリーダイヤル">アイボリーダイヤル</Option>
              <Option value="アンダーバー">アンダーバー</Option>
              <Option value="クリームダイヤル">クリームダイヤル</Option>
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
        付属品
      </Title>

      <Form.Item name="accessories" style={{ marginBottom: "16px" }}>
        <Select
          mode="multiple"
          onChange={setAccessories}
          removeIcon={
            <CloseOutlined style={{ color: "rgba(0, 0, 0, 0.45)" }} />
          }
          suffixIcon={<DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
          style={{
            fontFamily: "Source Sans Pro",
            fontSize: "16px",
          }}
        >
          <Option value="あまりゴマ">あまりゴマ</Option>
          <Option value="箱">箱</Option>
          <Option value="並行ギャラ">並行ギャラ</Option>
          <Option value="修理明細">修理明細</Option>
          <Option value="OH証明書">OH証明書</Option>
        </Select>
      </Form.Item>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label={<span>あまりゴマ</span>}
            name="amariGoma"
            style={{ marginBottom: "16px" }}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
            >
              <Option value="あまりゴマ１">あまりゴマ１</Option>
              <Option value="あまりゴマ2">あまりゴマ2</Option>
              <Option value="あまりゴマ3">あまりゴマ3</Option>
              <Option value="あまりゴマ4">あまりゴマ4</Option>
              <Option value="あまりゴマ5">あまりゴマ5</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}></Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 0",
            }}
          >
            <Checkbox
              style={{
                fontSize: "16px",
                color: "rgba(0, 0, 0, 0.88)",
                fontFamily: "Source Sans Pro",
              }}
            >
              フルコマ
            </Checkbox>
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 0",
            }}
          >
            <Checkbox
              style={{
                fontSize: "16px",
                color: "rgba(0, 0, 0, 0.88)",
                fontFamily: "Source Sans Pro",
              }}
            >
              短ベルト
            </Checkbox>
            <Tooltip title="詳細情報">
              <QuestionCircleOutlined
                style={{
                  color: "rgba(0, 0, 0, 0.45)",
                  fontSize: "16px",
                }}
              />
            </Tooltip>
          </div>
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

export default BasicInformationWatch;
