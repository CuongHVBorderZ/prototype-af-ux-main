import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
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
  notification,
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
import BasicInformationWatch from "./BasicInformationWatch";
import BasicInformationGold from "./BasicInformationGold";
import BasicInformationBag from "./BasicInformationBag";
import BasicInformationShoes from "./BasicInformationShoes";
import BasicInformationAccessories from "./BasicInformationAccessories";
import BasicInformationJewelry from "./BasicInformationJewelry";
import BasicInformationBrandJewelry from "./BasicInformationBrandJewelry";
import { NotificationPlacement } from "antd/es/notification/interface";

type NotificationType = "success" | "info" | "warning" | "error";

// eslint-disable-next-line react/prop-types
const BasicInformation = forwardRef((props, ref) => {
  const [api, contextHolder] = notification.useNotification();
  const [showError, setShowError] = useState(false);
  const [form] = Form.useForm();
  const [accessories, setAccessories] = useState([
    "あまりゴマ",
    "��",
    "並行ギャラ",
  ]);

  useImperativeHandle(ref, () => ({
    setValue: (val) => {
      setValue(val);
      form.setFieldsValue({ item_name: "ロレックス エクスプローラー36 124270 ステンレス ギャラなし 箱なし あまりコマなし", category: val });
    },
  }));

  const treeData = [
    {
      value: "parent1",
      title: "時計",
      disabled: true,
      children: [
        {
          value: "parent10",
          title: "腕時計",
          disabled: true,
          children: [
            {
              value: "leaf1",
              title: "ロレックス",
            },
            // {
            //   value: "leaf2",
            //   title: "オメガ",
            // },
            // {
            //   value: "leaf3",
            //   title: "カルティエ",
            // },
            // {
            //   value: "leaf4",
            //   title: "タグホイヤー",
            // },
            // {
            //   value: "leaf5",
            //   title: "セイコー",
            // },
            // {
            //   value: "leaf6",
            //   title: "BRM",
            // },
          ],
        },
      ],
    },
    {
      value: "parent2",
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
      value: "parent3",
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
      value: "parent4",
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
      value: "parent5",
      title: "アクセサリー・小物",
    },
    {
      value: "parent6",
      title: "ジュエリー",
    },
    {
      value: "parent7",
      title: "ブランドジュエリー",
    },
  ];

  const findPathByValue = (nodes, targetValue, path = []) => {
    for (const node of nodes) {
      const newPath = [...path, node.title];
      if (node.value === targetValue) {
        return newPath;
      }
      if (node.children) {
        const result = findPathByValue(node.children, targetValue, newPath);
        if (result) return result;
      }
    }
    return null;
  };

  // const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [value, setValue] = useState<string>();

  const handleChange = (newValue: string | null) => {
    // setSelectedValue(newValue);
    setValue(newValue);
    if (!value) {
      setSelectedLabel("");
      return;
    }

    const path = findPathByValue(treeData, newValue); // Tìm đường dẫn breadcrumb
    const breadcrumb = path ? path.join(" / ") : "";
    setSelectedLabel(breadcrumb);
  };

  const onPopupScroll: TreeSelectProps["onPopupScroll"] = (e) => {
    console.log("onPopupScroll", e);
  };

  const requiredRule = { required: true, message: "入力してください" };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
      setShowError(true);
    }
  };

  useEffect(() => {
    if (showError) {
      api.error({
        message: "Validation Error",
        description: "入力されていない項目があります。",
      });
      setShowError(false);
    }
  }, [showError, api]);
  return (
    <div id="form_basic_information" style={{ padding: "20px 24px 24px 24px" }}>
      {contextHolder}
      <Form form={form} layout="vertical">
        <Form.Item label="商品名" name="item_name" rules={[requiredRule]}>
          <Input />
        </Form.Item>
        <Form.Item label="カテゴリ" name="category" rules={[requiredRule]}>
          <div style={{ marginBottom: "10px" }}>
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              value={value}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={handleChange}
              treeData={treeData}
            />
          </div>
        </Form.Item>
        <Divider
          style={{
            borderColor: "rgba(230, 230, 230, 0.6)",
            margin: "24px 0",
          }}
        />
        {value === "leaf1" && <BasicInformationWatch />}
        {value === "leaf21" && <BasicInformationGold />}
        {value === "leaf311" && <BasicInformationBag />}
        {value === "leaf41" && <BasicInformationShoes />}
        {value === "parent5" && <BasicInformationAccessories />}
        {value === "parent6" && <BasicInformationJewelry />}
        {value === "parent7" && <BasicInformationBrandJewelry />}
      </Form>
      {/* Action Buttons */}
      <div>
        <Flex gap="middle">
          <Button style={{ width: "150px" }}>下書きを保存</Button>
          <Button style={{ width: "150px" }}>クリア</Button>
          <Button style={{ width: "150px" }} type="primary" onClick={onFinish}>
            保存
          </Button>
        </Flex>
      </div>
    </div>
  );
});

export default BasicInformation;
