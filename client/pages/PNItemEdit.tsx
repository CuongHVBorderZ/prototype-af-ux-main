import BasicInformationWatch from "@/components/BasicInformationWatch";
import StateDefinition from "@/components/feature/StateDefinition";
import HeaderPNItemEdit from "@/components/HeaderPNItemEdit";
import PNItemEditAccessories from "@/components/PNItemEditAccessories";
import PNItemEditBag from "@/components/PNItemEditBag";
import PNItemEditBrandJewelry from "@/components/PNItemEditBrandJewelry";
import PNItemEditGold from "@/components/PNItemEditGold";
import PNItemEditJewelry from "@/components/PNItemEditJewelry";
import PNItemEditShoes from "@/components/PNItemEditShoes";
import PNItemEditWatch from "@/components/PNItemEditWatch";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowUpOutlined,
  EditOutlined,
  FormOutlined,
  LoadingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Flex,
  Layout,
  notification,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarketPrice from "./MarketPrice";
import HearingInformation from "@/components/HearingInformation";
import SaleInstruction from "@/components/SaleInstruction";
const { Content } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

// eslint-disable-next-line react/prop-types
const PNItemEdit = () => {
  const [api, contextHolder] = notification.useNotification();

  const categories = [
    ["parent1", "parent10", "leaf1"],
    ["parent5"],
    ["parent6"],
    ["parent7"],
  ];

  const [category, setCategory] = useState(["parent1", "parent10", "leaf1"]);
  const [value, setValue] = useState<string>("leaf1");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const fakeApiCall = () => new Promise((resolve) => setTimeout(resolve, 500));

  const fetchData = async () => {
    setLoading(true);
    await fakeApiCall();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    setCategory(randomCategory);
    let newValue = null;
    if (randomCategory && randomCategory.length > 0) {
      newValue = randomCategory[randomCategory.length - 1];
    }
    setValue(newValue);
  }, [id]);

  const handleCategoryChange = async (value) => {
    setCategory(value);
    fetchData();
    let newValue = null;
    if (value && value.length > 0) {
      newValue = value[value.length - 1];
    }
    setValue(newValue);
  };

  const [isMarketPriceOpen, setIsMarketPriceOpen] = useState(false);

  const handleCloseDrawer = (isApplyItem: boolean = false) => {
    setIsMarketPriceOpen(false);
    if (isApplyItem) {
      setCategory(["parent1", "parent10", "leaf1"]);
      setEditableStr(
        "ロレックス デイトナ 16523G U608028 SS×YG AT シャンパン文字盤 あまりごまなし",
      );
      setValue("leaf1");
    }
  };

  const [editableStr, setEditableStr] = useState("エクスプローラー36 124270");

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            size="large"
          ></Spin>
        </div>
      )}
      {contextHolder}
      <Content style={{ padding: 24, minHeight: 1280 }}>
        <HeaderPNItemEdit
          category={category}
          onCategoryChange={handleCategoryChange}
          onOpenSearchDrawer={() => {
            setIsMarketPriceOpen(true);
          }}
          editableStr={editableStr}
          setEditableStr={setEditableStr}
        ></HeaderPNItemEdit>
        {value === "leaf1" && <PNItemEditWatch />}
        {value === "leaf21" && <PNItemEditGold />}
        {value === "leaf311" && <PNItemEditBag />}
        {value === "leaf41" && <PNItemEditShoes />}
        {value === "parent5" && <PNItemEditAccessories />}
        {value === "parent6" && <PNItemEditJewelry />}
        {value === "parent7" && <PNItemEditBrandJewelry />}
      </Content>
      <MarketPrice
        isOpen={isMarketPriceOpen}
        setVisible={handleCloseDrawer}
        applyItem={id}
      />
    </>
  );
};

export default PNItemEdit;
