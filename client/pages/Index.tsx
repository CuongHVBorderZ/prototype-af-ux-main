import React, { useRef, useState, useEffect } from "react";
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
  Dropdown,
  MenuProps,
  Flex,
  Modal,
  Spin,
  notification,
  Skeleton,
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
  ExclamationCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import BasicInformation from "@/components/BasicInformation";
import EstimatePrice from "@/components/EstimatePrice";
import MarketPrice from "./MarketPrice";
import StateDefinition from "@/components/feature/StateDefinition";
import AuthenticityCheck from "@/components/feature/AuthenticityCheck";
import { log } from "console";
import HearingInformation from "@/components/HearingInformation";
import SaleInstruction from "@/components/SaleInstruction";

const { Title, Text } = Typography;
const { Option } = Select;
const { confirm } = Modal;

export default function Index() {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [accessories, setAccessories] = useState([
    "あまりゴマ",
    "��",
    "並行ギャラ",
  ]);
  const [activeTab, setActiveTab] = useState("商品情報");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchTab, setSearchTab] = useState("キーワード検索");
  const [isMarketPriceOpen, setIsMarketPriceOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hearingOpen, setHearingOpen] = useState(false);
  const [instructionOpen, setInstructionOpen] = useState(false);

  const fakeApiCall = () => new Promise((resolve) => setTimeout(resolve, 500));

  const onFinish = async () => {
    if (productList.length >= 4) {
      api.error({
        message: "山仕切りの買取上限額を超過しました",
        description: "¥5,000を超える山仕切りは個別に商品を登録してください。",
      });
      return;
    }
    setLoading(true);
    try {
      await fakeApiCall();
      api.success({
        message: "成功",
        description: "データが正常に保存されました",
      });
    } catch (error) {
      api.error({
        message: "エラー",
        description: "入力されていない項目があります。",
      });
    } finally {
      setLoading(false);
    }
  };

  const basicInfoRef = useRef(null);

  const handleCloseDrawer = (isApplyItem: boolean = false) => {
    setIsMarketPriceOpen(false);
    if (isApplyItem) {
      setActiveTab("商品情報");
      setTimeout(() => {
        basicInfoRef.current?.setValue("leaf1");
      }, 0);
      const selectedProduct = productList.find((p) => p.selected);
      if (selectedProduct) {
        selectedProduct.name =
          "ロレックス エクスプローラー36 124270 ステンレス ギャラなし 箱なし あまりコマなし";
        selectedProduct.price = "¥1,000,000";
        selectedProduct.category = "時計";
        updateProduct(selectedProduct);
      } else {
        handleAddProduct(true);
      }
    }
  };

  // Sample data for market price cards
  const marketPriceData = [
    {
      id: 1,
      price: "¥1,000,000",
      name: "ロレックス エクスプローラー36 124270 ステンレス ギャラなし 箱なし あまりコマなし 動作...",
      supplement: "〇〇番、ケース径 etc...",
      accessories: "なし",
      salesDate: "2025年3月25日",
      rank: "B",
      isHighlighted: false,
      hasAuctionTag: false,
    },
    {
      id: 2,
      price: "¥1,000,000",
      name: "ロレックス エクスプローラー36 124270 ステンレス ギャラなし 箱なし あまりコマなし 動...",
      supplement: "〇〇番、ケース径 etc...",
      accessories: "なし",
      salesDate: "2025年3月25日",
      rank: "B",
      isHighlighted: true,
      hasAuctionTag: false,
    },
    {
      id: 3,
      price: "¥1,000,000",
      name: "ロレックス エクスプローラー36 124270 ステンレス ギャラなし 箱なし あまり��マなし 動作...",
      supplement: "〇〇番、ケース径 etc...",
      accessories: "なし",
      salesDate: "2025年3月25日",
      rank: "B",
      isHighlighted: false,
      hasAuctionTag: true,
    },
    {
      id: 4,
      price: "¥1,000,000",
      name: "ロレックス エクスプローラー36 124270 ステンレス ギャラなし 箱なし あまりコマなし 動作...",
      supplement: "〇〇番、ケース径 etc...",
      accessories: "なし",
      salesDate: "2025年3月25日",
      rank: "B",
      isHighlighted: false,
      hasAuctionTag: false,
    },
    {
      id: 5,
      price: "¥1,000,000",
      name: "ロレックス エクスプローラー36 124270 ステンレス ギャラなし 箱なし あまりコマなし 動作...",
      supplement: "〇〇番、ケース径 etc...",
      accessories: "なし",
      salesDate: "2025年3月25日",
      rank: "B",
      isHighlighted: false,
      hasAuctionTag: false,
    },
    {
      id: 6,
      price: "¥1,000,000",
      name: "ロレックス エクスプローラー36 124270 ステンレス ギャラなし 箱なし あまりコマなし 動作...",
      supplement: "〇〇番、ケース径 etc...",
      accessories: "なし",
      salesDate: "2025年3月25日",
      rank: "B",
      isHighlighted: false,
      hasAuctionTag: false,
    },
  ];

  const [productList, setProductList] = useState([
    {
      id: 1,
      name: "ロレックス　エクスプローラー36 124270",
      price: "¥150,000",
      status: "査定済",
      statusColor: "#BFDBFE",
      statusTextColor: "#1E40AF",
      category: "時計",
      selected: false,
    },
    {
      id: 2,
      name: "ヴィトン モノグラム ミニランノエリー M92689",
      price: "¥200,000",
      status: "査定済",
      statusColor: "#BFDBFE",
      statusTextColor: "#1E40AF",
      category: "バッグ",
      selected: false,
    },
    {
      id: 3,
      name: "ロレックス　エクスプローラー36 124270",
      price: "¥230,000",
      status: "対応中",
      statusColor: "#FEF9C3",
      statusTextColor: "#854D0E",
      category: "時計",
      selected: false,
    },
  ]);

  const handleSelectProduct = (id: number) => {
    setProductList((prevList) => {
      const currentSelected = prevList.find((item) => item.selected);

      // Nếu click vào đúng item đã chọn => không làm gì cả
      if (currentSelected?.id === id) return prevList;

      // Nếu click vào item khác => cập nhật list và set tab
      setActiveTab("商品情報");

      return prevList.map((item) => ({
        ...item,
        selected: item.id === id,
      }));
    });
  };

  const updateProduct = (selectedProduct) => {
    setProductList((prevList) =>
      prevList.map((item) =>
        item.id === selectedProduct.id ? selectedProduct : item,
      ),
    );
  };

  const handleAddProduct = (isApply = false) => {
    const newId = Math.max(...productList.map((p) => p.id)) + 1;
    let newProduct = {
      id: newId,
      name: "",
      price: "",
      status: "対応中",
      statusColor: "#FEF9C3",
      statusTextColor: "#854D0E",
      category: "",
      selected: false,
    };
    if (isApply) {
      newProduct = {
        id: newId,
        name: "ロレックス エクスプローラー36 124270 ステンレス ギャラなし 箱なし あまりコマなし",
        price: "¥1,000,000",
        status: "対応中",
        statusColor: "#FEF9C3",
        statusTextColor: "#854D0E",
        category: "時計",
        selected: false,
      };
    }

    setProductList(
      (prevList) =>
        prevList
          // .map((p) => ({ ...p, selected: false }))
          .concat(newProduct), // thêm item mới
    );

    // setActiveTab("商品情報");
  };

  const selectedProduct = productList.find((p) => p.selected);

  const handleRemoveProduct = (id: number) => {
    confirm({
      title: "これらのアイテムを削除しますか?",
      icon: <ExclamationCircleFilled />,
      content: "説明の一部",
      onOk() {
        setProductList((prevList) => {
          setActiveTab("商品情報");
          return prevList.filter((item) => item.id !== id);
        });
      },
      onCancel() {
        console.log("Cancel");
      },
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
      <div style={{ background: "rgba(0, 0, 0, 0.45)" }}>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(0deg, #F5F5F5 0%, #F5F5F5 100%), #FFF",
              display: "flex",
              position: "relative",
            }}
          >
            {/* Left Sidebar - Product List */}
            <div
              style={{
                width: "25%",
                background: "#FFF",
                borderRight: "1px solid #E5E7EB",
                padding: "16px",
              }}
            >
              <div style={{ marginBottom: "24px" }}>
                <Title
                  level={4}
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    color: "#1F2937",
                    marginBottom: "16px",
                    fontSize: "19px",
                  }}
                >
                  商談ID: #C-12345
                </Title>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ width: "20px", height: "20px" }}>
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <path
                        d="M9.16667 18.1084C9.42003 18.2547 9.70744 18.3317 10 18.3317C10.2926 18.3317 10.58 18.2547 10.8333 18.1084L16.6667 14.7751C16.9198 14.6289 17.13 14.4188 17.2763 14.1658C17.4225 13.9127 17.4997 13.6257 17.5 13.3334V6.66675C17.4997 6.37448 17.4225 6.08742 17.2763 5.83438C17.13 5.58134 16.9198 5.37122 16.6667 5.22508L10.8333 1.89175C10.58 1.74547 10.2926 1.66846 10 1.66846C9.70744 1.66846 9.42003 1.74547 9.16667 1.89175L3.33333 5.22508C3.08022 5.37122 2.86998 5.58134 2.72372 5.83438C2.57745 6.08742 2.5003 6.37448 2.5 6.66675V13.3334C2.5003 13.6257 2.57745 13.9127 2.72372 14.1658C2.86998 14.4188 3.08022 14.6289 3.33333 14.7751L9.16667 18.1084Z"
                        stroke="#374151"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 18.3333V10"
                        stroke="#374151"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.7417 5.8335L10 10.0002L17.2584 5.8335"
                        stroke="#374151"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <Text
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      color: "#374151",
                      fontSize: "15px",
                    }}
                  >
                    査定商品リスト (3点)
                  </Text>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                {productList.map((product) => (
                  <Card
                    key={product.id}
                    style={{
                      cursor: "pointer",
                      border: product.selected
                        ? "2px solid #2563EB"
                        : "1px solid #E5E7EB",
                      background: product.selected ? "#EFF6FF" : "#F9FAFB",
                      borderRadius: "8px",
                    }}
                    bodyStyle={{ padding: "13px" }}
                    onClick={() => handleSelectProduct(product.id)}
                  >
                    {
                      product.name ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              padding: "0px 8px",
                              cursor: "pointer",
                              zIndex: 1,
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleRemoveProduct(product.id);
                            }}
                          >
                            <CloseOutlined
                              style={{ fontSize: "14px", color: "#999" }}
                            />
                          </div>
                          <div
                            style={{
                              width: "64px",
                              height: "64px",
                              background: "#F5F5F5",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: "14px",
                                color: "rgba(0, 0, 0, 0.88)",
                                textAlign: "center",
                                fontFamily: "Source Sans Pro",
                              }}
                            >
                              {product.category}
                            </Text>
                          </div>
                          <div style={{ flex: 1 }}>
                            <Text
                              style={{
                                fontSize: "14px",
                                color: "rgba(0, 0, 0, 0.88)",
                                display: "block",
                                marginBottom: "8px",
                                fontFamily: "Source Sans Pro",
                                lineHeight: "22px",
                              }}
                            >
                              {product.name}
                            </Text>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Inter",
                                  fontWeight: 700,
                                  fontSize:
                                    product.price === "---" ? "18px" : "16px",
                                  color:
                                    product.price === "---" ? "#9CA3AF" : "#1D4ED8",
                                }}
                              >
                                {product.price}
                              </Text>
                              <div
                                style={{
                                  backgroundColor: product.statusColor,
                                  color: product.statusTextColor,
                                  fontSize: "12px",
                                  borderRadius: "9999px",
                                  padding: "2px 8px",
                                  fontFamily: "Inter",
                                }}
                              >
                                {product.status}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Flex gap={12}>
                            <Skeleton.Node
                              style={{ width: 64, height: 64, borderRadius: 8 }}
                              active
                            />
                            <Flex vertical>
                              <Skeleton.Node
                                style={{ width: "300px", height: 16, marginBottom: 27 }}
                                active
                              />
                              <Skeleton.Node
                                style={{ width: "100px", height: 14 }}
                                active
                              />
                            </Flex>
                          </Flex>
                        </>
                      )
                    }
                  </Card>
                ))}
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <Button
                    style={{ width: "100%" }}
                    onClick={() => setIsMarketPriceOpen(true)}
                  >
                    <SearchOutlined />
                    商品を追加
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    style={{ width: "100%" }}
                    onClick={() => handleAddProduct()}
                  >
                    <PlusOutlined />
                    商品を追加
                  </Button>
                </Col>
              </Row>
            </div>

            {/* Center Content - Main Form */}
            <div
              style={{
                width: "55%",
                background: "#F9FAFB",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Main title */}
              <Title
                level={3}
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  color: "#1F2937",
                  marginBottom: "24px",
                  fontSize: "24px",
                }}
              >
                {selectedProduct ? selectedProduct.name : "商品情報"}
              </Title>

              <div
                style={{
                  background: "#FFF",
                  border: "1px solid #CCC",
                  borderRadius: "0px",
                  flex: 1,
                }}
              >
                {/* Tab Navigation */}
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  style={{
                    height: "39px",
                    margin: "20px",
                    padding: "0px 0px 35px 0px",
                    borderBottom: "1px solid #E5E7EB",
                  }}
                  size="small"
                  items={[
                    {
                      key: "商品情報",
                      label: (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            color:
                              activeTab === "商品情報"
                                ? "rgba(0, 0, 0, 0.88)"
                                : "#6B7280",
                          }}
                        >
                          <BarChartOutlined
                            style={{ fontSize: "16px", color: "#6B7280" }}
                          />
                          商品情報
                        </span>
                      ),
                    },
                    {
                      key: "状態定義",
                      label: (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            color:
                              activeTab === "状態定義"
                                ? "rgba(0, 0, 0, 0.88)"
                                : "#6B7280",
                          }}
                        >
                          <InfoCircleOutlined
                            style={{ fontSize: "16px", color: "#6B7280" }}
                          />
                          状態定義
                        </span>
                      ),
                    },
                    {
                      key: "真贋チェック",
                      label: (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            color:
                              activeTab === "真贋チェック"
                                ? "rgba(0, 0, 0, 0.88)"
                                : "#6B7280",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            style={{ color: "#6B7280" }}
                          >
                            <path
                              d="M8 3.33353C8.00078 3.06688 7.94824 2.80277 7.84546 2.55673C7.74268 2.31069 7.59174 2.08768 7.40151 1.90083C7.21128 1.71397 6.98561 1.56704 6.73777 1.46868C6.48993 1.37032 6.22492 1.32251 5.95833 1.32807C5.69174 1.33363 5.42895 1.39244 5.18542 1.50104C4.9419 1.60964 4.72254 1.76585 4.54027 1.96047C4.35799 2.15508 4.21647 2.38419 4.12403 2.6343C4.03159 2.88441 3.9901 3.15048 4.002 3.41686C3.61013 3.51762 3.24633 3.70623 2.93815 3.9684C2.62997 4.23058 2.38549 4.55945 2.22323 4.9301C2.06096 5.30075 1.98517 5.70346 2.00159 6.10774C2.01801 6.51202 2.12621 6.90726 2.318 7.26353C1.98079 7.53748 1.71562 7.88968 1.54556 8.28949C1.3755 8.68929 1.3057 9.12459 1.34224 9.55752C1.37878 9.99045 1.52054 10.4079 1.7552 10.7735C1.98986 11.1392 2.31031 11.442 2.68867 11.6555C2.64194 12.017 2.66983 12.3843 2.77059 12.7345C2.87136 13.0848 3.04286 13.4108 3.27452 13.6922C3.50618 13.9736 3.79307 14.2045 4.11748 14.3707C4.44188 14.5369 4.79692 14.6348 5.16065 14.6584C5.52438 14.682 5.88909 14.6308 6.23226 14.5079C6.57542 14.3851 6.88975 14.1931 7.15584 13.944C7.42193 13.6949 7.63412 13.3939 7.77931 13.0596C7.9245 12.7252 7.99961 12.3647 8 12.0002V3.33353Z"
                              stroke="currentColor"
                              strokeWidth="1.33"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 8.66667C6.5597 8.46977 7.04845 8.11133 7.40445 7.63667C7.76045 7.16201 7.9677 6.59245 8 6"
                              stroke="currentColor"
                              strokeWidth="1.33"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          真贋チェック
                        </span>
                      ),
                    },
                    {
                      key: "価格特定",
                      label: (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            color:
                              activeTab === "価格特定"
                                ? "rgba(0, 0, 0, 0.88)"
                                : "#6B7280",
                          }}
                        >
                          <BookOutlined
                            style={{ fontSize: "16px", color: "#6B7280" }}
                          />
                          価格特定
                        </span>
                      ),
                    },
                  ]}
                />

                {activeTab === "商品情報" && (
                  <BasicInformation ref={basicInfoRef}></BasicInformation>
                )}

                {activeTab === "価格特定" && <EstimatePrice></EstimatePrice>}
                {activeTab === "状態定義" && (
                  <StateDefinition></StateDefinition>
                )}
                {activeTab === "真贋チェック" && (
                  <AuthenticityCheck></AuthenticityCheck>
                )}
              </div>
            </div>

            {/* Right Sidebar - Pricing Info */}
            <div
              style={{
                width: "20%",
                background: "#FFF",
                borderLeft: "1px solid #E5E7EB",
                padding: "18px",
              }}
            >
              {/* Top Buttons */}
              <div className="flex mb-4 gap-2 flex-wrap">
                <Button
                  size="small"
                  style={{
                    height: "40px",
                    border: "1px solid #D9D9D9",
                    background: "#FFF",
                    color: "rgba(0, 0, 0, 0.88)",
                    borderRadius: "8px",
                    fontFamily: "Source Sans Pro",
                  }}
                  onClick={() => setHearingOpen(true)}
                >
                  <FormOutlined
                    style={{ fontSize: "12px !important", color: "rgba(0, 0, 0, 0.45)" }}
                  />
                  ヒアリング項目入力
                </Button>
                <Button
                  size="small"
                  style={{
                    height: "40px",
                    border: "1px solid #D9D9D9",
                    background: "#FFF",
                    color: "rgba(0, 0, 0, 0.88)",
                    borderRadius: "8px",
                    fontFamily: "Source Sans Pro",
                  }}
                  onClick={() => setInstructionOpen(true)}
                >
                  <MessageOutlined
                    style={{ fontSize: "12px !important", color: "rgba(0, 0, 0, 0.45)" }}
                  />
                  セールストーク
                </Button>
              </div>
              <HearingInformation open={hearingOpen} setOpen={setHearingOpen} />
              <SaleInstruction open={instructionOpen} setOpen={setInstructionOpen} />


              {/* Total Price Card */}
              <Card
                style={{
                  background: "#EFF6FF",
                  border: "none",
                  borderRadius: "8px",
                  marginBottom: "24px",
                  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.05) inset",
                }}
                bodyStyle={{
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <Title
                  level={4}
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                    color: "#1F2937",
                    marginBottom: "8px",
                    fontSize: "18px",
                  }}
                >
                  総合買取価格
                </Title>
                <Title
                  level={1}
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    color: "#1D4ED8",
                    margin: "8px 0",
                    fontSize: "41px",
                    lineHeight: "48px",
                  }}
                >
                  ¥430,000
                </Title>
                <Text
                  style={{
                    color: "#6B7280",
                    fontFamily: "Inter",
                    fontSize: "14px",
                  }}
                >
                  (2点査定済)
                </Text>
              </Card>

              {/* Pricing Details */}
              <Card
                style={{
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -2px rgba(0, 0, 0, 0.10)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  <div>
                    <Text
                      style={{
                        color: "#333",
                        fontFamily: "Source Sans Pro",
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      総見込売価
                    </Text>
                    <div
                      style={{
                        background: "#F5F5F5",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        padding: "9px 24px 9px 9px",
                        textAlign: "right",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "rgba(0, 0, 0, 0.88)",
                          fontFamily: "Source Sans Pro",
                        }}
                      >
                        1,200,000
                      </Text>
                    </div>
                  </div>

                  <div>
                    <Text
                      style={{
                        color: "#333",
                        fontFamily: "Source Sans Pro",
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      成立した見込売価
                    </Text>
                    <div
                      style={{
                        background: "#F5F5F5",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        padding: "9px 24px 9px 9px",
                        textAlign: "right",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "rgba(0, 0, 0, 0.88)",
                          fontFamily: "Source Sans Pro",
                        }}
                      >
                        1,000,000
                      </Text>
                    </div>
                  </div>

                  <div>
                    <Text
                      style={{
                        color: "#333",
                        fontFamily: "Source Sans Pro",
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      見込粗利高
                    </Text>
                    <div
                      style={{
                        background: "#F5F5F5",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        padding: "9px 24px 9px 9px",
                        textAlign: "right",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "rgba(0, 0, 0, 0.88)",
                          fontFamily: "Source Sans Pro",
                        }}
                      >
                        200,000
                      </Text>
                    </div>
                  </div>

                  <div>
                    <Text
                      style={{
                        color: "#333",
                        fontFamily: "Source Sans Pro",
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      見込粗利率
                    </Text>
                    <div
                      style={{
                        background: "#F5F5F5",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        padding: "9px 24px 9px 9px",
                        textAlign: "right",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "rgba(0, 0, 0, 0.88)",
                          fontFamily: "Source Sans Pro",
                        }}
                      >
                        20,00%
                      </Text>
                    </div>
                  </div>

                  <div>
                    <Text
                      style={{
                        color: "#333",
                        fontFamily: "Source Sans Pro",
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      成約率
                    </Text>
                    <div
                      style={{
                        background: "#F5F5F5",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        padding: "9px 24px 9px 9px",
                        textAlign: "right",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "rgba(0, 0, 0, 0.88)",
                          fontFamily: "Source Sans Pro",
                        }}
                      >
                        83,333%
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>

              <Button
                type="primary"
                size="large"
                block
                style={{
                  marginTop: "24px",
                  background: "#23B7E5",
                  borderColor: "#23B7E5",
                  borderRadius: "8px",
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: 400,
                  fontFamily: "Source Sans Pro",
                }}
                onClick={() => {
                  onFinish();
                }}
              >
                反映
              </Button>
            </div>
          </div>
        </div>

        <MarketPrice
          isOpen={isMarketPriceOpen}
          setVisible={handleCloseDrawer}
        />
      </div>
    </>
  );
}
