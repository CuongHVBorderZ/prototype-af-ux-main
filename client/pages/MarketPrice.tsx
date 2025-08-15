import React, { useRef, useState } from "react";
import {
  Tabs,
  Input,
  Select,
  Button,
  Pagination,
  Card,
  Tag,
  Drawer,
  Col,
  Flex,
  message,
  Row,
  Upload,
  Space,
  Typography,
  Image,
  Divider,
} from "antd";
import {
  FileImageOutlined,
  InboxOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Search } from "lucide-react";
import Layout from "antd/es/layout/layout";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate } from "react-router-dom";
import HeaderPNItemEdit from "@/components/HeaderPNItemEdit";

const { TabPane } = Tabs;
const { Option } = Select;

const MarketPrice = ({ isOpen, setVisible, applyItem }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [excludeKeyword, setExcludeKeyword] = useState("");
  const [conditionRank, setConditionRank] = useState("");
  const [salesPeriod, setSalesPeriod] = useState("直近1ヶ月");
  const [sortBy, setSortBy] = useState("実売日: 降順");
  const [itemsPerPage, setItemsPerPage] = useState("30件");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const colors = [
    "#1677FF",
    "#13C2C2",
    "#13C2C2",
    "#FAAD14",
    "#52C41A",
    "#722ED1",
    "#F5222D",
  ];

  // const { Header, Content, Sider } = Layout;
  const { Title, Text } = Typography;
  const { Option } = Select;
  const { Search } = Input;

  const images = [
    "https://www.theluxuryhut.com/admin/upload/1724418702secrets-of-rolex-watches.jpg",
    "https://bizweb.dktcdn.net/100/175/988/products/20171021095017-5401-copy.jpg?v=1718079109400",
    "https://magazine.chrono24.com/cdn-cgi/image/f=auto,metadata=none,fit=cover,q=65,w=1190,h=595,dpr=2.0/2022/04/Rolex-Opinion-21-scaled.jpg",
    "https://blog.luxehouze.com/wp-content/uploads/2023/10/DSC05429-crop-1-1024x576.jpg",
    "https://images.squarespace-cdn.com/content/v1/5b213f95506fbec9b54e014c/39c8e93e-c5d4-4b14-a14d-d7a579db5bec/DSC_2594-2.jpg",
    "https://blog.luxehouze.com/wp-content/uploads/2024/03/crop-DSC08279-1024x576.jpg",
    "https://swisswatches-magazine.com/uploads/2023/11/patek-philippe-5261R-001-rosegold-titlepicture-new.jpg",
    "https://timepiecetradingllc.com/cdn/shop/articles/Why_Patek_Philippe_5980_is_the_Ultimate_Sports_Watch.jpg?v=1711610107",
    "https://www.analogshift.com/cdn/shop/files/AS08680_40991407_RICHARDMILLE_PLATINUMTOURBILLON_RM-002V1-lifestyle-4.jpg?v=1690984736&width=1500",
    "https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dw40ec1bf1/images/PLP/2024/aquaracer/plp-merchandize-landscape-aquaracer-diving.jpg?impolicy=resize&width=1800&height=900",
  ];

  const mockNames = {
    leaf1: [
      "ロレックス デイトナ 16523G U608028 SS×YG AT シャンパン文字盤 あまりごまなし",
      "ロレックス デイトジャスト 69173G T897685 SS×YG AT シャンパン文字盤 あまりごま4",
      "ゼニス エルプリメロ クロノマスター スポーツ 03.3100.3600/69.M3100 575205 SS AT 白文字盤 あまりごま3 　AB",
      "ラドー ダイヤスター 152.0341.3 02738829 SS QZ 黒文字盤 あまりごま5",
      "ティソ PR100 T101910A SS QZ グレー文字盤 あまりごま3",
    ],
    leaf21: [
      "ピアジェ 84023 536835 K81 YG QZ シャンパン文字盤 78.9ｇあまりごまなし",
      "シュプリーム×ティファニー リターントゥティファニー オーバルタグ ネックレス 925×パール 28.1g シルバー",
      "ヘレンド インドの華 テーブルウェア 5点セット プレートW25.6cm 底部に窯印",
      "ダイヤ リング Pt900 3.8g 0.440 0.05 ネーム",
      "クロス ボールペン 14K ゴールド×シルバー キズ くすみ 変色 筆記確認済 21.1g",
    ],
    leaf311: [
      "ジバンシィ GV3 レザー×スエード チェーンショルダーバッグ",
      "ボッテガ ショルダーバッグ レッジェーロ パンチング ブラック",
      "グッチ GGマーモント レザー チェーンショルダーバッグ ブラック×ホワイト 448065　SA:97点",
      "プラダ エンブレム レザー ショルダーバッグ グリーン",
      "クリスチャンディオール レディディオール カナージュ マイクロ レザー 2WAYハンドバッグ ブラック",
    ],
    leaf41: [
      "プレイコムデギャルソン×コンバース キャンバス ハイカットスニーカー 29cm メンズ ブラック×ホワイト",
      "プラダ トライアングルロゴ 20年 ナイロン ダウンジャケット 52 ネイビー  SGA654 スレ有",
      "ヴァレンティノ コットン シャツ 46 ホワイト VV3CIA99729",
      "モンクレール SALZMAN 21年 ナイロン ダウンジャケット 1 ホワイト",
      "ノースフェイス ポリエステル ダウンジャケット XL ブラック×ホワイト NJ1DM76A",
    ],
    parent5: [
      "ヴィトン モノグラム ミュルティクレ6 M60701 フューシャピンク   178",
      "ヴィトン M61083 エセンシャル V LE1109 ネックレス GP ゴールド 216",
      "ヴィトン バイカラー モノグラム アンプラント ジッピーウォレット M69794 トゥルトレールクレーム",
      "シャネル ココマーク ピアス(両耳用 片方のみ) メタル×ラインストーン",
      "ティファニー リターントゥティファニー ハートタグ ブレスレット 925 5.4g シルバー スレ くすみ 有 ボールチェーン",
    ],
    parent6: [
      "マルチカラー ダイヤ リング 750 22.9g 588 013 025 D020",
      "サファイア ダイヤ リング Pt900 8.1g 5.14 1.04",
      "エメラルド リング Pt900 6.9g 1.26 0.40",
      "サファイア　スリランカ産非加熱リング　S14.55/D2.41",
      "ダイヤ ネックレス Pt900×Pt850 13.9g 1.62",
    ],
    parent7: [
      "ミキモト パール イヤリング SV 4.4g 約5.0～5.5mm 刻印かすれ 地金変色",
      "チセー 色石 ダイヤ ネックレス K18(YG)×Pt900 10.7g 9.18 D0.22",
      "岩倉康二 色石 リング K18(YG)×Pt900 5.2g 石小カケ 接合跡",
      "ヴァンドーム青山 ダイヤ リング K10(PG) 0.8g",
      "4℃ ダイヤ リング K10(PG) 1.4g",
    ],
  };
  const mockImages = {
    leaf1: [
      "https://www.theluxuryhut.com/admin/upload/1724418702secrets-of-rolex-watches.jpg",
      "https://bizweb.dktcdn.net/100/175/988/products/20171021095017-5401-copy.jpg?v=1718079109400",
      "https://magazine.chrono24.com/cdn-cgi/image/f=auto,metadata=none,fit=cover,q=65,w=1190,h=595,dpr=2.0/2022/04/Rolex-Opinion-21-scaled.jpg",
      "https://blog.luxehouze.com/wp-content/uploads/2023/10/DSC05429-crop-1-1024x576.jpg",
      "https://images.squarespace-cdn.com/content/v1/5b213f95506fbec9b54e014c/39c8e93e-c5d4-4b14-a14d-d7a579db5bec/DSC_2594-2.jpg",
      "https://blog.luxehouze.com/wp-content/uploads/2024/03/crop-DSC08279-1024x576.jpg",
      "https://swisswatches-magazine.com/uploads/2023/11/patek-philippe-5261R-001-rosegold-titlepicture-new.jpg",
      "https://timepiecetradingllc.com/cdn/shop/articles/Why_Patek_Philippe_5980_is_the_Ultimate_Sports_Watch.jpg?v=1711610107",
      "https://www.analogshift.com/cdn/shop/files/AS08680_40991407_RICHARDMILLE_PLATINUMTOURBILLON_RM-002V1-lifestyle-4.jpg?v=1690984736&width=1500",
      "https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dw40ec1bf1/images/PLP/2024/aquaracer/plp-merchandize-landscape-aquaracer-diving.jpg?impolicy=resize&width=1800&height=900",
    ],
    leaf21: [
      "https://lh3.googleusercontent.com/proxy/Jsdd0T6UKZbBEKab83t0IiWPa1oiICt7FMTip1hymp4lLNQ6LTB6LfMpLMl0uEOO7pgLZT7GWCbaa-xYthZ_TFPtFPu-zcuWyCXUNbWt3aRyEiCi265TrXFYfcFPWNXPXypY",
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
      "https://ginbasya.jp/wp-content/uploads/2024/08/AdobeStock_174238238-scaled.jpg",
      "https://article-image-ix.nikkei.com/https%3A%2F%2Fimgix-proxy.n8s.jp%2FDSXZQO6403314016052025000000-1.jpg?ixlib=js-3.8.0&w=638&h=425&auto=format%2Ccompress&fit=crop&bg=FFFFFF&s=c1fcdfa8879e689303448f5e6a70cff6",
      "https://inoue78.com/cmino78/wp-content/uploads/2021/06/03E01FEB-4B35-458A-A285-C5DB3C260F94.jpeg",
    ],
    leaf311: [
      "https://image1.shopserve.jp/yochika.com/pic-labo/llimg/13071401-1.jpg",
      "https://www.bluek.co.jp/img000/LB/LBHEPICOTINLOCK22MMTCSAUGDm.jpg",
      "https://tshop.r10s.jp/brandacross/cabinet/across10/1151.jpg?fitin=720%3A720",
      "https://img.storyweb.jp/wp-content/uploads/2024/11/s-sss_18435-1-scaled-1.jpg",
      "https://img.my-best.com/contents/ab8cf2ccb7a30e35b95a6f7610766617.jpeg?ixlib=rails-4.3.1&q=70&lossless=0&w=1200&h=900&fit=crop&s=9c0f2d1ad676287d7a6d5c1d43b422d0",
    ],
    leaf41: [
      "https://m.media-amazon.com/images/I/51zMZeggbtL._UY900_.jpg",
      "https://baseec-img-mng.akamaized.net/images/item/origin/347cd2a47bb788409fdd897571e53798.jpg?imformat=generic&q=90&im=Resize,width=1280,type=normal",
      "https://baseec-img-mng.akamaized.net/images/item/origin/7bf71d43c6e13c7635c5c17fac9a901d.jpg?imformat=generic&q=90&im=Resize,width=1280,type=normal",
      "https://g-w.st/blog/wp-content/uploads/2025/01/25012401.jpg",
      "https://tshop.r10s.jp/alamode888/cabinet/item2024123/40803002121-1_wm.jpg?fitin=720%3A720",
    ],
    parent5: [
      "https://www.mizuhiki1.com/pic-labo/llimg/mizuhikibook1.jpg",
      "https://img.giftmall.co.jp/o/46a0/92f3/46a092f3-8538-47ee-a5ee-628f821a0894.jpg",
      "https://tshop.r10s.jp/angecoco/cabinet/item4/an-it-173_09-2.jpg?fitin=720%3A720",
      "https://static.mercdn.net/item/detail/orig/photos/m44098140469_1.jpg?1748235502",
      "https://brandear.jp/images/sp/purchase/ct/accessories/accessories_kaitori_mainimage_sp.webp",
    ],
    parent6: [
      "https://image.veryweb.jp/wp-content/uploads/2023/01/2301_182_P080-083_d2_m.jpg",
      "https://soel.jewelry/cdn/shop/articles/FotoJet.jpg?v=1652145891&width=2048",
      "https://i.shgcdn.com/3d6abaa0-389e-490f-8606-6c3665b7154e/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      "https://l-co.jp/wp-content/uploads/2023/10/AdobeStock_510455216.jpeg",
      "https://hips.hearstapps.com/hmg-prod/images/elol2403-jewelry-0326-6602ae6d28e80.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=1200:*",
    ],
    parent7: [
      "https://hips.hearstapps.com/hmg-prod/images/kv-1645174203.jpg",
      "https://www.bettyroad.co.jp/cms/uploads/2019/07/jewelry_ranking/main_2024_ranking_jewelry.jpg",
      "https://kingram-luxurystore.jp/wp-content/uploads/2024/11/%E3%83%A1%E3%82%A4%E3%83%B31.jpg",
      "https://hips.hearstapps.com/hmg-prod/images/mj-upd-top-661dc6ed207f3.jpg?crop=0.502xw:1.00xh;0,0&resize=1200:*",
      "https://www.bettyroad.co.jp/cms/uploads/BETTY/messika-move_im.jpg",
      "https://www.bettyroad.co.jp/img/benefit/9/153263_im.jpg",
    ],
  };

  const mockCategories = [
    "leaf1",
    "leaf21",
    "leaf311",
    "leaf41",
    "parent5",
    "parent6",
    "parent7",
  ];

  const navigate = useNavigate();

  const mockProducts = mockCategories.flatMap((category) => {
    return Array.from({ length: 5 }, (_, index) => ({
      id: `${category}-${index + 1}`,
      category,
      image:
        mockImages[category][
          Math.floor(Math.random() * mockImages[category].length)
        ],
      price:
        "¥" +
        (
          Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000
        ).toLocaleString("en-US"),
      name: mockNames[category][
        Math.floor(Math.random() * mockNames[category].length)
      ],
      supplement: "〇〇番、ケース径 etc...",
      accessories: "なし",
      saleDate: "2025年3月25日",
      rank: "B",
      isHighlighted: index === 1,
      hasAuction: index === 2,
    }));
  });

  const handleColorSelect = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ được upload ảnh!");
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCapturedImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Không upload lên server, chỉ preview
    return false;
  };

  const [currentTab, setCurrentTab] = useState("1");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    if (!streaming) {
      try {
        // if no permission, request it
        if (navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
          message.error("Camera permission is required to use this feature.");
          return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    const image = canvasRef.current.toDataURL("image/png");
    setCapturedImage(image);
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  };

  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };

  const tabItems = [
    { key: "1", label: "キーワード検索" },
    { key: "2", label: "画像検索" },
  ];

  const handleImageURLChange = (value: string) => {
    try {
      new URL(value);
      setCapturedImage(value);
    } catch (error) {
      message.error("無効なURLです。");
    }
  };

  const searchByKeyword = () => {
    return (
      <>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-base font-normal text-gray-900">
              除外ワード
            </label>
            <Input
              placeholder="キーワードを入力"
              style={{ width: "100%" }}
              className="input-search"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-base font-normal text-gray-900">
              キーワード検索
            </label>
            <Input
              placeholder="キーワードを入力"
              style={{ width: "100%" }}
              className="input-search"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-base font-normal text-gray-900">
              カテゴリ
            </label>
            <Select
              value={category}
              onChange={setCategory}
              placeholder="未選択"
              className="w-full"
              style={{ height: "32px" }}
            >
              <Option value="watch">時計</Option>
              <Option value="jewelry">ジュエリー</Option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-base font-normal text-gray-900">
              状態ランク
            </label>
            <Select
              value={conditionRank}
              onChange={setConditionRank}
              placeholder="未選択"
              className="w-full"
              style={{ height: "32px" }}
            >
              <Option value="S">S</Option>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
            </Select>
          </div>

          {/* <div className="space-y-3">
            <label className="block text-base font-normal text-gray-900">
              カラー
            </label>
            <div className="flex flex-wrap gap-3">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                    selectedColors.includes(color)
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
          </div> */}

          <div className="space-y-2">
            <label className="block text-base font-normal text-gray-900">
              実売期間
            </label>
            <Select
              value={salesPeriod}
              onChange={setSalesPeriod}
              className="w-full"
              style={{ height: "32px" }}
            >
              <Option value="直近1ヶ月">直近1ヶ月</Option>
              <Option value="直近3ヶ月">直近3ヶ月</Option>
              <Option value="直近6ヶ月">直近6ヶ月</Option>
            </Select>
          </div>
        </div>
      </>
    );
  };

  const searchByImage = () => {
    return (
      <>
        <div>
          <Text
            style={{ fontSize: "16px", display: "block", marginBottom: "8px" }}
          >
            画像ファイル
          </Text>
          <Row gutter={16}>
            <Col span={12}>
              <Upload beforeUpload={handleBeforeUpload} showUploadList={false}>
                <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                  ファイルを選択
                </Button>
              </Upload>
            </Col>
            <Col span={12}>
              <Button style={{ width: "100%" }} onClick={startCamera}>
                カメラを起動
              </Button>
            </Col>
          </Row>
          <div className="mt-4 mb-2">
            {/* input with the button on the right */}
            <Search
              placeholder="キーワードを入力"
              onSearch={(value) => handleImageURLChange(value)}
              style={{ width: "100%" }}
              className="input-search"
              enterButton={<FileImageOutlined />}
            />
          </div>
          <Dragger
            multiple={false}
            beforeUpload={handleBeforeUpload}
            showUploadList={false}
            accept="image/*"
            style={{ padding: 15 }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-hint">クリックまたはファイルをドラッグ</p>
          </Dragger>
          <Row gutter={[16, 16]} className="mt-4">
            <Col span={24}>
              <Card title="Webcam Preview">
                <video ref={videoRef} style={{ width: "100%" }} />
                <Row gutter={16}>
                  <Col span={12}>
                    <Button
                      onClick={captureImage}
                      disabled={!streaming}
                      style={{ width: "100%" }}
                    >
                      写真を撮る
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      onClick={stopCamera}
                      danger
                      style={{ width: "100%" }}
                    >
                      消す
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card title="撮影した写真">
                {capturedImage ? (
                  <>
                    <Image
                      src={capturedImage}
                      alt="captured"
                      style={{ width: "100%" }}
                    />
                    <Button
                      onClick={() => setCapturedImage(null)}
                      style={{ marginTop: 16 }}
                      danger
                    >
                      写真を削除
                    </Button>
                  </>
                ) : (
                  <p>写真はまだありません</p>
                )}
              </Card>
            </Col>
          </Row>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      </>
    );
  };

  const [editableStr, setEditableStr] = useState("エクスプローラー36 124270");
  const [category, setCategory] = useState(["parent1", "parent10", "leaf1"]);
  return (
    <Drawer
      open={isOpen}
      width="100%"
      placement="right"
      onClose={() => setVisible(false)}
    >
      <div
        className="min-h-screen bg-white"
        style={{
          fontFamily:
            "Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif",
        }}
      >
        <div className="flex w-full">
          {/* Left Sidebar */}
          <div className="w-96 p-6 bg-white border-r border-gray-200 flex-shrink-0">
            <h1
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontWeight: 700 }}
            >
              相場表
            </h1>

            <div className="space-y-12">
              {/* Search Tabs */}
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                {/* Tabs */}
                <Tabs onChange={handleTabChange} items={tabItems} />
                {currentTab === "1" && searchByKeyword()}
                {currentTab === "2" && searchByImage()}
              </Space>

              {/* Filters */}

              {/* Action Buttons */}
              <Row gutter={16}>
                <Col span={12}>
                  <Button style={{ width: "100%" }} type="primary">
                    検索する
                  </Button>
                </Col>
                <Col span={12}>
                  <Button style={{ width: "100%" }}>キャンセル</Button>
                </Col>
              </Row>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Header Controls */}
            <div className="flex items-center gap-8 mb-4">
              <Pagination
                current={1}
                total={196}
                pageSize={30}
                showSizeChanger={false}
                showQuickJumper={false}
                className="flex-shrink-0"
              />

              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-900">並び替え</div>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  className="w-32"
                  size="small"
                  style={{ height: "100%" }}
                >
                  <Option value="実売日: 降順">実売日: 降順</Option>
                  <Option value="実売日: 昇順">実売日: 昇順</Option>
                  <Option value="価格: 降順">価格: 降順</Option>
                  <Option value="価格: 昇順">価格: 昇順</Option>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-900">表示件数</div>
                <Select
                  value={itemsPerPage}
                  onChange={setItemsPerPage}
                  className="w-20"
                  size="small"
                  style={{ height: "100%" }}
                >
                  <Option value="30件">30件</Option>
                  <Option value="50件">50件</Option>
                  <Option value="100件">100件</Option>
                </Select>
              </div>

              <span className="text-sm text-gray-900 ml-auto">
                全 196 件中　1 から 30 件目まで表示
              </span>
            </div>

            {/* Product Grid */}
            {/* border-2 border-[#23B7E5] */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {mockProducts.map((product) => (
                <div className="relative group" key={product.id}>
                  <Card
                    key={product.id}
                    hoverable
                    className="overflow-hidden border border-[#CCC] group-hover:border-[#23B7E5] group-hover:border-2"
                    style={{ borderRadius: "8px" }}
                    bodyStyle={{ padding: "12px" }}
                    cover={
                      <div className="relative">
                        {/* Ảnh */}
                        <div
                          className="h-60 bg-gray-200"
                          style={{
                            backgroundImage: `url(${product.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />

                        {/* Button hiện khi hover */}
                        <div className="absolute top-3 right-3 z-10">
                          <Button
                            type="primary"
                            size="small"
                            className="hidden group-hover:inline-block transition-opacity"
                            onClick={() => {
                              setVisible(applyItem);
                            }}
                          >
                            決定
                          </Button>
                        </div>

                        {/* Rank Badge */}
                        <div
                          className="absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl"
                          style={{ backgroundColor: "#87E8DE" }}
                        >
                          {product.rank}
                        </div>

                        {/* External Link Icon */}
                        {product.isHighlighted && (
                          <div className="absolute bottom-3 right-3">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M5 0.5V1.5H1.5V8.5H8.5V5H9.5V8.5C9.5 9.05 9.05 9.5 8.5 9.5H1.5C0.945 9.5 0.5 9.05 0.5 8.5V1.5C0.5 0.95 0.945 0.5 1.5 0.5H5ZM9.5 0.5V4H8.5V2.20508L3.58496 7.12012L2.87988 6.41504L7.79492 1.5H6V0.5H9.5Z"
                                fill="#23B7E5"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    }
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          買取上限価格
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          {product.price}
                        </span>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-1">商品名</div>
                        <div
                          className={`text-xs leading-5 ${
                            product.isHighlighted
                              ? "text-[#23B7E5] underline"
                              : "text-gray-900"
                          }`}
                        >
                          {product.name}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">補足</span>
                        <span className="text-xs text-gray-900">
                          {product.supplement}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">付属品</span>
                        <span className="text-xs text-gray-900">
                          {product.accessories}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">実売日</span>
                        <div className="flex items-center gap-1">
                          {product.hasAuction && (
                            <Tag
                              color="red"
                              style={{
                                fontSize: "10px",
                                padding: "1px 8px",
                                fontFamily: "Noto Sans JP",
                              }}
                            >
                              オークション
                            </Tag>
                          )}
                          <span className="text-xs text-gray-900">
                            {product.saleDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default MarketPrice;
