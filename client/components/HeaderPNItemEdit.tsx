import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowUpOutlined,
  EditOutlined,
  FormOutlined,
  InstagramOutlined,
  MessageOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Cascader,
  CascaderProps,
  Col,
  Divider,
  Drawer,
  Flex,
  Layout,
  notification,
  Row,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const { Content } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

// eslint-disable-next-line react/prop-types
const HeaderPNItemEdit = ({
  category,
  onCategoryChange,
  onOpenSearchDrawer,
  setEditableStr,
  pnDetail,
}) => {
  interface Option {
    value: string;
    label: string;
    children?: Option[];
  }

  const treeData = [
    {
      value: "parent1",
      label: "時計",
      // disabled: true,
      children: [
        {
          value: "parent10",
          label: "腕時計",
          // disabled: true,
          children: [
            {
              value: "leaf1",
              label: "ロレックス",
            },
          ],
        },
      ],
    },
    {
      value: "parent2",
      label: "地金",
      // disabled: true,
      children: [
        {
          value: "leaf21",
          label: "金",
        },
      ],
    },
    {
      value: "parent3",
      label: "バッグ",
      // disabled: true,
      children: [
        {
          value: "leaf31",
          label: "ハンドバッグ",
          // disabled: true,
          children: [
            {
              value: "leaf311",
              label: "エルメス",
            },
          ],
        },
      ],
    },
    {
      value: "parent4",
      label: "アパレル・靴",
      // disabled: true,
      children: [
        {
          value: "leaf41",
          label: "靴",
        },
      ],
    },
    {
      value: "parent5",
      label: "アクセサリー・小物",
    },
    {
      value: "parent6",
      label: "ジュエリー",
    },
    {
      value: "parent7",
      label: "ブランドジュエリー",
    },
  ];

  const navigate = useNavigate();
  const { id } = useParams();
  const backToHome = () => {
    navigate("/");
  };

  const nextItem = () => {
    const nextId = Number(id) + 1;
    navigate(`/${nextId}/detail`);
  };
  const previousItem = () => {
    const previousId = Number(id) > 1 ? Number(id) - 1 : 5;
    navigate(`/${previousId}/detail`);
  };

  return (
    <>
      <Row style={{ backgroundColor: "white", padding: "20px" }}>
        <Col span={12}>
          <Flex gap="middle" style={{ margin: "20px 0" }}>
            <Button
              icon={<ArrowLeftOutlined />}
              type="link"
              style={{ padding: 0 }}
              onClick={() => backToHome()}
            >
              もどる
            </Button>
            <ArrowUpOutlined onClick={() => nextItem()} />
            <ArrowDownOutlined onClick={() => previousItem()} />
            <Cascader
              showSearch
              value={category}
              style={{ width: "400px" }}
              // value={value}
              placeholder="選択してください"
              allowClear
              onChange={onCategoryChange}
              options={treeData}
            />
          </Flex>
        </Col>
        <Col span={12} style={{ textAlign: "right", marginTop: "20px" }}>
          <Button
            icon={<SearchOutlined />}
            style={{ margin: "0 10px" }}
            onClick={() => {
              onOpenSearchDrawer();
            }}
          >
            キーワードから特定
          </Button>
          <Button
            icon={<InstagramOutlined />}
            onClick={() => {
              onOpenSearchDrawer();
            }}
          >
            画像から特定
          </Button>
        </Col>
        <Flex gap="middle" style={{ width: "100%" }}>
          <span>no.1</span>
          <Flex>
            <Title
              level={4}
              style={{ marginBottom: "0", marginRight: "5px", width: "520px" }}
              editable={{ onChange: setEditableStr }}
            >
              {pnDetail ? pnDetail.product_name : ""}
            </Title>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};

export default HeaderPNItemEdit;
