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
  Form,
  Layout,
  notification,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MarketPrice from "./MarketPrice";
import HearingInformation from "@/components/HearingInformation";
import SaleInstruction from "@/components/SaleInstruction";
import FooterPNItemEdit from "@/components/FooterPNItemEdit";
const { Content } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

interface DataType {
  key: string;
  id: number;
  manage_no: string;
  product_name: string;
  purchase_price: number;
  prospective_selling_price: number;
  price_gross_profit: number;
  final_gross_profit: number;
  final_gross_profit_rate: number;
  overseas_sale_price: number;
  overseas_sale_price_date: string | null;
  overseas_sale_price_staff: string | null;
  high_price_check_by_name: string | null;
  purchase_method: string;
  shop_name: string;
  purchase_date: string;
  category: string;
  first_category: string;
  second_category: string;
  brand_category: string;
  production_number: string;
  face: string;
  material: string | null;
  watch_power: string | null;
  accessories_remainder_watch_band: string | null;
  reference_list_price: string | null;
  serial_number: string;
  model_name: string;
  model_number: string;
  rank: string;
  _comment: string;
  check_state_definition: boolean;
  check_authen_checked: boolean;
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

// xxx

const getValuesFromLabelPath = (tree: any[], labelPath: string): string[] => {
  const labels = labelPath.split("/").map((l) => l.trim());
  const values: string[] = [];

  let currentLevel = tree;
  for (const label of labels) {
    const found = currentLevel.find((item) => item.label === label);
    if (!found) break;
    values.push(found.value);
    currentLevel = found.children || [];
  }

  return values;
};

const getValueText = (tree: any[], values: string[]): string => {
  const labels: string[] = [];

  let currentLevel = tree;
  for (const v of values) {
    const found = currentLevel.find((item) => item.value === v);
    if (!found) break; // không tìm thấy -> dừng
    labels.push(found.label);
    currentLevel = found.children || [];
  }

  return labels.join("/");
};

// eslint-disable-next-line react/prop-types
const PNItemEdit = () => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
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

  const listItems = localStorage.getItem("listItems");
  let foundRecord: DataType | null = null;

  if (listItems) {
    const listItemsData: DataType[] = JSON.parse(listItems);
    foundRecord =
      listItemsData.find((item) => Number(item.key) === Number(id)) || null;
  }

  const [pnDetail, setPnDetail] = useState<DataType | null>(foundRecord);

  const fakeApiCall = () => new Promise((resolve) => setTimeout(resolve, 500));

  const fetchData = async () => {
    setLoading(true);
    await fakeApiCall();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    // const randomCategory =
    //   categories[Math.floor(Math.random() * categories.length)];

    const randomCategory = getValuesFromLabelPath(treeData, pnDetail.category);
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
    console.log(getValueText(treeData, value));
    if (!pnDetail) return;
    setPnDetail({
      ...pnDetail,
      category: getValueText(treeData, value),
    });
  };

  const [isMarketPriceOpen, setIsMarketPriceOpen] = useState(false);

  const handleCloseDrawer = (isApplyItem: boolean = false) => {
    setIsMarketPriceOpen(false);
    if (isApplyItem) {
      // setCategory(["parent1", "parent10", "leaf1"]);
      setEditableStr(
        "ロレックス デイトナ 16523G U608028 SS×YG AT シャンパン文字盤 あまりごまなし",
      );
      // setValue("leaf1");
    }
  };

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const setEditableStr = (newValue) => {
    if (!pnDetail) return;
    setPnDetail({
      ...pnDetail,
      product_name: newValue,
    });
  };

  const navigate = useNavigate();
  const onFinish = () => {
    savePNItem();
    api.success({
      message: "成功",
      description: "データが正常に保存されました",
    });
    // setTimeout(() => {
    //   navigate("/?applyItem=" + id);
    // }, 700);
    setTimeout(() => {
      navigate("/");
    }, 700);
  };

  const savePNItem = () => {
    if (pnDetail) {
      const listItems = localStorage.getItem("listItems");
      console.log(listItems);
      let newList: DataType[] = [];
      if (listItems) {
        const parsed: DataType[] = JSON.parse(listItems);
        newList = parsed.map((item) =>
          item.key === pnDetail.key ? pnDetail : item,
        );
      } else {
        newList = [pnDetail];
      }
      console.log(newList);
      localStorage.setItem("listItems", JSON.stringify(newList));
    }
  };

  const handleChangePrice = (priceKey, priceValue) => {
    if (!pnDetail) return;
    setPnDetail({
      ...pnDetail,
      [priceKey]: priceValue,
    });
  };

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
        <Form form={form} layout="vertical">
          <HeaderPNItemEdit
            category={category}
            onCategoryChange={handleCategoryChange}
            onOpenSearchDrawer={() => {
              setIsMarketPriceOpen(true);
            }}
            setEditableStr={setEditableStr}
            pnDetail={pnDetail}
          ></HeaderPNItemEdit>
          {value === "leaf1" && (
            <PNItemEditWatch handleChangePrice={handleChangePrice} />
          )}
          {value === "leaf21" && (
            <PNItemEditGold handleChangePrice={handleChangePrice} />
          )}
          {value === "leaf311" && (
            <PNItemEditBag handleChangePrice={handleChangePrice} />
          )}
          {value === "leaf41" && (
            <PNItemEditShoes handleChangePrice={handleChangePrice} />
          )}
          {value === "parent5" && (
            <PNItemEditAccessories handleChangePrice={handleChangePrice} />
          )}
          {value === "parent6" && (
            <PNItemEditJewelry handleChangePrice={handleChangePrice} />
          )}
          {value === "parent7" && (
            <PNItemEditBrandJewelry handleChangePrice={handleChangePrice} />
          )}
          {/* Action Buttons */}
          <FooterPNItemEdit onFinish={onFinish}></FooterPNItemEdit>
        </Form>
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
