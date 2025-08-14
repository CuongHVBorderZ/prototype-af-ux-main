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
const FooterPNItemEdit = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const onFinish = () => {
    api.success({
      message: "成功",
      description: "データが正常に保存されました",
    });
    setTimeout(() => {
      navigate("/");
    }, 700);
  };
  const backToHome = () => {
    navigate("/");
  };
  return (
    <>
      {contextHolder}
      <div>
        <Flex gap="middle" justify="flex-end">
          <Button
            style={{ width: "150px" }}
            onClick={() => {
              backToHome();
            }}
          >
            クリア
          </Button>
          <Button
            style={{ width: "150px" }}
            type="primary"
            onClick={() => {
              onFinish();
            }}
          >
            保存
          </Button>
        </Flex>
      </div>
    </>
  );
};

export default FooterPNItemEdit;
