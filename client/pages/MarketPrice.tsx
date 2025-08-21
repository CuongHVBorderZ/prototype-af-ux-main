import React, { useEffect, useRef, useState } from "react";
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
  Spin,
} from "antd";
import {
  FileImageOutlined,
  InboxOutlined,
  LoadingOutlined,
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

  const navigate = useNavigate();
  const mockNames = {
    leaf1: [
      "ロレックス コスモグラフデイトナ 116500LN T5J78405 SS SS AT 黒文字盤 あまりごまなし",
      "ロレックス コスモグラフデイトナ 116500LN SS SS AT 白文字盤 あまりごま2",
      "ロレックス コスモグラフデイトナ 116500LN SS SS AT 黒文字盤",
      "ロレックス コスモグラフデイトナ 116500LN SS AT 白文字盤 あまりごま3",
      "ロレックス コスモグラフデイトナ 116500LN SS AT 黒文字盤 あまりごま2",
      // "ロレックス デイトジャスト 69173G T897685 SS×YG AT シャンパン文字盤 あまりごま4",
      // "ゼニス エルプリメロ クロノマスター スポーツ 03.3100.3600/69.M3100 575205 SS AT 白文字盤 あまりごま3 　AB",
      // "ラドー ダイヤスター 152.0341.3 02738829 SS QZ 黒文字盤 あまりごま5",
      // "ティソ PR100 T101910A SS QZ グレー文字盤 あまりごま3",
      "カルティエ マストタンク 590005 87887 925×社外革 QZ 白文字盤 あまりごまなし",
      "ブルガリ ブルガリブルガリ BB38SSAUTO L11254 SS AT 黒文字盤 あまりごま2",
      "タグホイヤー アクアレーサー WAJ2150 EBC5582 SS×YG AT 黒文字盤 あまりごまなし",
      "ヴィトン タンブール ワールドツアー QA063 TV1583 SS×革 QZ 黒文字盤 あまりごまなし",
      "オメガ シーマスター SS×社外SS AT シルバー文字盤 あまりごまなし",

      "ロレックス デイトジャスト 69173G SS×YG SS×YG AT シャンパン文字盤",
      "ロレックス デイトジャスト 69173G SS×YG SS×YG AT シャンパン文字盤 あまりごま6",
      "ロレックス デイトジャスト 69173G SS×YG SS×YG AT シャンパン文字盤 あまりごま2",
      "ロレックス デイトジャスト 69173G SS×YG SS×YG AT 黒文字盤 あまりごま3",
      "ロレックス デイトジャスト 69173G SS×YG AT 青グラデーション文字盤 あまりごま2",
    ],
    leaf21: [
      "ピアジェ 84023 536835 K81 YG QZ シャンパン文字盤 78.9ｇあまりごまなし",
      "シュプリーム×ティファニー リターントゥティファニー オーバルタグ ネックレス 925×パール 28.1g シルバー",
      "ヘレンド インドの華 テーブルウェア 5点セット プレートW25.6cm 底部に窯印",
      "ダイヤ リング Pt900 3.8g 0.440 0.05 ネーム",
      "クロス ボールペン 14K ゴールド×シルバー キズ くすみ 変色 筆記確認済 21.1g",
      "ヴァレンティノガラヴァーニ メガネ 52□15-135 チタン×K18 ゴールド×シルバー キズ 割れ 汚れ 変色 くすみ 有 度付きレンズ 5263 総重量36.4g",
      "純度チェック（刻印なし） 10.6g",
      "K18 S 14g",
      "K18 S 115.4g",
      "K24 S 58.9g",
    ],
    leaf311: [
      "エルメス バーキン30 ルトゥルネ トゴ ブラック ゴールド金具 □H:2004年",
      "ジバンシィ GV3 レザー×スエード チェーンショルダーバッグ",
      "グッチ GGマーモント レザー チェーンショルダーバッグ ブラック×ホワイト 448065　SA:97点",
      "プラダ エンブレム レザー ショルダーバッグ グリーン",
      "クリスチャンディオール レディディオール カナージュ マイクロ レザー 2WAYハンドバッグ ブラック",
      "クリスチャンディオール オブリーク ミニブックトート キャンバス 2WAYハンドバッグ ネイビー",
      "ヴィトン モノグラム リバース アトランティス BB M46816 ブラウン RFID反応あり",
      "プラダ カナパ キャンバスxスエード ハンドバッグ ブラウン",
      "ミュウミュウ マテラッセ ワンダー レザー 2WAYハンドバッグ ピンク",
      "ヴィトン モノグラム スピーディ25 M41109 ブラウン RFID反応あり",
    ],
    leaf41: [
      "プレイコムデギャルソン×コンバース キャンバス ハイカットスニーカー 29cm メンズ ブラック×ホワイト",
      "プラダ トライアングルロゴ 20年 ナイロン ダウンジャケット 52 ネイビー  SGA654 スレ有",
      "ヴァレンティノ コットン シャツ 46 ホワイト VV3CIA99729",
      "モンクレール SALZMAN 21年 ナイロン ダウンジャケット 1 ホワイト",
      "ノースフェイス ポリエステル ダウンジャケット XL ブラック×ホワイト NJ1DM76A",
      "セリーヌ ウール ニット S メンズ ブラック 2A19R423P 毛羽立ち有",
      "ヴィトン 24SS ナイロン ワンピース 38 レディース ブラック RW241WW",
      "フェンディ フェンダーチェ 22年 シルク シャツ 38 レディース マルチカラー FS7891 ズッカ チェーン メドゥーサ ハンガー付き",
      "フェンディ ズッカ 19年 レーヨン 半袖ニット 38 レディース ブラウン FZY702",
      "クリスチャンディオール ウール ノースリーブワンピース F34 レディース ブラック 441R64A1486 ベルト有",
    ],
    parent5: [
      "ヴィトン モノグラム ミュルティクレ6 M60701 フューシャピンク   178",
      "ヴィトン M61083 エセンシャル V LE1109 ネックレス GP ゴールド 216",
      "ヴィトン バイカラー モノグラム アンプラント ジッピーウォレット M69794 トゥルトレールクレーム",
      "シャネル ココマーク ピアス(両耳用 片方のみ) メタル×ラインストーン",
      "ティファニー リターントゥティファニー ハートタグ ブレスレット 925 5.4g シルバー スレ くすみ 有 ボールチェーン",
      "エルメス エルミーPPM ぬいぐるみ ポリエステル ブラウン",
      "フェンディ チャーム キャンバス ブラック ITOチャーム ドッグモチーフ",
      "シャネル マトラッセ キャビアスキン コンパクトウォレット ブラック ゴールド金具 ランダムシリアル",
      "フェンディ ロゴ 8M0423 レザー コインケース シルバー",
      "カルティエ マストドゥカルティエ ボールペン GP シルバー",
    ],
    parent6: [
      "マルチカラー ダイヤ リング 750 22.9g 588 013 025 D020",
      "サファイア ダイヤ リング Pt900 8.1g 5.14 1.04",
      "エメラルド リング Pt900 6.9g 1.26 0.40",
      "サファイア　スリランカ産非加熱リング　S14.55/D2.41",
      "ダイヤ ネックレス Pt900×Pt850 13.9g 1.62",
      "タサキ バランス エラ パール リング 750(YG) 5.6g 約8.0mm",
      "エルメス シェーヌダンクルMM ブレスレット 13コマ 925 52.3g シルバー",
      "ティファニー パール ピアス 750(WG) 3.6g",
      "カルティエ ジュストアンクル SM ブレスレット 750(YG) 9.9g 17",
      "ヴァンクリーフ&アーペル ヴィンテージアルハンブラ カーネリアン ネックレス 750(YG) 5.2g",
    ],
    parent7: [
      "ミキモト パール イヤリング SV 4.4g 約5.0～5.5mm 刻印かすれ 地金変色",
      "チセー 色石 ダイヤ ネックレス K18(YG)×Pt900 10.7g 9.18 D0.22",
      "岩倉康二 色石 リング K18(YG)×Pt900 5.2g 石小カケ 接合跡",
      "ヴァンドーム青山 ダイヤ リング K10(PG) 0.8g",
      "4℃ ダイヤ リング K10(PG) 1.4g",
      "ポメラート ヌード クラシック プラシオライト リング 750(PG×WG) 6.0g 53 PAA1100 06000 000PA",
      "フレッド フォース10 ミディアム ダイヤ リング 750(WG) 3.4g 48",
      "プラダ トライアングルプレート カチューシャ ナイロン ブラック",
      "プラダ 1IB375 サフィアーノ バングル GP×革 ブラック×ゴールド",
      "シャネル マドモアゼル 96P チョーカー GP×ラインストーン×革 ブラック×ゴールド ネックレス リボンモチーフ",
    ],
  };
  const mockImages = {
    leaf1: [
      "https://watchjournal.net/wp/wp-content/uploads/allu-r-10150759.jpg",
      "https://image.nanboya.com/ALLU/8161435/A3832813.JPG?size=large",
      "https://image.nanboya.com/ALLU/8154537/A3827454.JPG?size=large",
      "https://image.nanboya.com/ALLU/7817804/A3579015.JPG?size=large",
      "https://image.nanboya.com/ALLU/7819295/AP108568.JPG?size=large",

      "https://tshop.r10s.jp/kanteiyamagata/cabinet/08188394/21-2246-1.jpg?fitin=720%3A720",
      "https://image.allu-official.com/item/1454009/655c0868390e6.webp",
      "https://www.kanteikyoku-maebashi.jp/wp-content/uploads/2020/03/ab7e360095e7ce8036bb068e05a36811.jpg",
      "https://d2i9ajxhye77uw.cloudfront.net/media/public/2143100320123_01.webp",
      "https://image.allu-official.com/item/1565854/6654370aa38f6.webp",

      "https://image.nanboya.com/ALLU/8167448/A3836990.JPG?size=large",
      "https://image.nanboya.com/ALLU/8148808/A3822911.JPG?size=large",
      "https://image.nanboya.com/ALLU/8042826/A3746539.JPG?size=large",
      "https://image.nanboya.com/ALLU/7980617/A3701040.JPG?size=large",
      "https://image.nanboya.com/ALLU/7793968/A3561079.JPG?size=large",
    ],
    leaf21: [
      "https://image.nanboya.com/items/5771439/YZ055279.JPG?size=medium",
      "https://assets.mercari-shops-static.com/-/large/plain/jgt5bcFFXXXw8HhfdQ8Rwg.jpg@jpg",
      "https://euroclassics-ginza.com/FV730set.jpg",
      "https://static.mercdn.net/item/detail/orig/photos/m28804215917_4.jpg?1737539692",
      "https://image.allu-official.com/item/1615737/66fd19b514743.webp",
      "https://shop.kind.co.jp/cdn/shop/files/8045001146663_2.jpg?v=1753796501&width=1200",
      "https://tshop.r10s.jp/ippin78marutaka/cabinet/ring/23k130-1-1.jpg?fitin=720%3A720",
      "https://i.ebayimg.com/images/g/OHcAAOSwbPlm4F4P/s-l400.jpg",
      "https://tshop.r10s.jp/kanteidan/cabinet/05169507/05169510/imgrc0098900440.jpg?fitin=720%3A720",
      "https://shop.r10s.jp/kanteikyoku-moriokaten/cabinet/_097/1240002061756_1.jpg",
    ],
    leaf311: [
      "https://thumbnail.image.rakuten.co.jp/@0_mall/tokyo-brand/cabinet/tool/55/101783955_1.jpg",
      "https://image.allu-official.com/item/1570338/666aa51d339d3.webp",
      "https://image1.shopserve.jp/brandpeace.jp/pic-labo/llimg/005254217-2.jpg?t=20240716110140",
      "https://image.allu-official.com/item/1571369/6669282e24b96.webp",
      "https://image.allu-official.com/item/1666314/67e013e7cf1c2.webp",
      "https://image.nanboya.com/ALLU/8174974/A3842503.JPG?size=large",
      "https://image.nanboya.com/ALLU/8159906/A3831634.JPG?size=large",
      "https://image.nanboya.com/ALLU/8159883/A3831616.JPG?size=large",
      "https://image.nanboya.com/ALLU/8179748/A3845782.JPG?size=large",
      "https://image.nanboya.com/ALLU/8197020/A3858728.JPG?size=large",
    ],
    leaf41: [
      "https://tshop.r10s.jp/cliffedge/cabinet/2005/20051204_1.jpg",
      "https://image.allu-official.com/item/1728335/67cd6e277b91a.webp",
      "https://img.fril.jp/img/773404147/l/2619874734.jpg?1751065501",
      "https://image.allu-official.com/item/1654519/67596479262c2.webp",
      "https://static.mercdn.net/item/detail/orig/photos/m61822286000_3.jpg?1733888090",
      "https://image.nanboya.com/ALLU/8190118/A3853140.JPG?size=large",
      "https://image.nanboya.com/ALLU/8101167/A3788338.JPG?size=large",
      "https://image.nanboya.com/ALLU/7983215/A3703029.JPG?size=large",
      "https://image.nanboya.com/ALLU/7973427/A3695686.JPG?size=large",
      "https://image.nanboya.com/ALLU/7848046/A3601803.JPG?size=large",
    ],
    parent5: [
      "https://image.allu-official.com/item/1728264/67ca220ee90f5.webp",
      "https://image.allu-official.com/item/1589441/66b340e55992c.webp",
      "https://image.allu-official.com/item/1490263/6658845e581b3.webp",
      "https://image.allu-official.com/item/1652965/67509d885f39a.webp",
      "https://image.allu-official.com/item/1423578/65682653d8012.webp",
      "https://image.nanboya.com/ALLU/8192809/A3855120.JPG?size=large",
      "https://image.nanboya.com/ALLU/8195036/A3857091.JPG?size=large",
      "https://image.nanboya.com/ALLU/8193354/A3855657.JPG?size=large",
      "https://image.nanboya.com/ALLU/8192502/A3854966.JPG?size=large",
      "https://image.nanboya.com/ALLU/8183147/A3847970.JPG?size=large",
    ],
    parent6: [
      "https://image.allu-official.com/item/1423734/671e5576c3ee0.webp",
      "https://ec.wb-ookura.com/cdn/shop/files/S__6766608_0_600x600_crop_center.jpg?v=1754275373",
      "https://thumbnail.image.rakuten.co.jp/@0_mall/sht-shtrading/cabinet/item20250214/900034-miwa-1.jpg",
      "https://shop.r10s.jp/ains1/cabinet/11896945/11896946/051854-1-a.jpg",
      "https://thumbnail.image.rakuten.co.jp/@0_mall/sankyu1999/cabinet/08651305/imgrc0103183695.jpg",
      "https://image.nanboya.com/ALLU/7811350/A3574435.JPG?size=large",
      "https://image.nanboya.com/ALLU/7489851/A3334091.JPG?size=large",
      "https://image.nanboya.com/ALLU/7196291/A3116222.JPG?size=large",
      "https://image.nanboya.com/ALLU/8186335/AP123948.JPG?size=large",
      "https://image.nanboya.com/ALLU/8185193/A3849565.JPG?size=large",
    ],
    parent7: [
      "https://image.allu-official.com/item/1561263/6735f10078439.webp",
      "https://www.coco-one.com/php/image/goods/883/5_1.jpg",
      "https://www.selby.shop/cdn/shop/files/250227-029_5_600x600.jpg?v=1746076240",
      "https://tshop.r10s.jp/kanteikyoku-masaki/cabinet/09811374/imgrc0092381236.jpg?fitin=720%3A720",
      "https://item-shopping.c.yimg.jp/i/l/wonderprice_100302050b500849",
      "https://image.nanboya.com/ALLU/7971890/A3694330.JPG?size=large",
      "https://image.allu-official.com/item/1404533/66a4e85eea12b.webp?size=large",
      "https://image.nanboya.com/ALLU/8180223/A3845989.JPG?size=large",
      "https://image.nanboya.com/ALLU/8170369/A3839066.JPG?size=large",
      "https://image.nanboya.com/ALLU/7249147/A3155533.JPG?size=large",
    ],
  };

  const mockPrices = {
    leaf1: [
      4190000,
      3650000,
      3750000,
      3850000,
      3950000,
      Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000,
      Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000,
      Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000,
      Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000,
      Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000,
      810000,
      710000,
      720000,
      730000,
      740000,
    ],
  };

  const mockCategories = [
    "leaf1",
    "leaf311",
    "leaf21",
    "leaf41",
    "parent5",
    "parent6",
    "parent7",
  ];

  const mockProducts = mockCategories.flatMap((category) => {
    const length = category == "leaf1" ? 15 : 10;
    const products = Array.from({ length: length }, (_, index) => ({
      id: `${category}-${index + 1}`,
      category,
      image: mockImages[category][index],
      price:
        "¥" +
        (category == "leaf1"
          ? mockPrices[category][index]
          : Math.floor(Math.random() * (2000000 - 100000 + 1)) + 100000
        ).toLocaleString("en-US"),
      name: mockNames[category][index],
      supplement: "〇〇番、ケース径 etc...",
      accessories: "なし",
      saleDate: "2025年3月25日",
      rank: "B",
      isHighlighted: index === 1,
      hasAuction: index === 2,
    }));
    return products;
  });

  const [listProducts, setListProducts] = useState(mockProducts);

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
              キーワード検索
            </label>
            <Input
              allowClear
              placeholder="キーワードを入力"
              style={{ width: "100%" }}
              className="input-search"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
            />
          </div>
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
              カテゴリ
            </label>
            <Select
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

  useEffect(() => {
    setSearchKeyword("");
    setListProducts(mockProducts);
  }, [isOpen]);
  const handleResetSearchProducts = async () => {
    setLoading(true);
    await fakeApiCall();
    setLoading(false);
    setSearchKeyword("");
    setListProducts(mockProducts);
  };
  const handleSearchProducts = async () => {
    setLoading(true);
    await fakeApiCall();
    setLoading(false);
    const filtered = mockProducts.filter((p) =>
      p.name.toLowerCase().includes(searchKeyword.toLowerCase()),
    );
    setListProducts(filtered);
  };

  const fakeApiCall = () => new Promise((resolve) => setTimeout(resolve, 500));
  const [loading, setLoading] = useState(false);

  const [editableStr, setEditableStr] = useState("エクスプローラー36 124270");
  const [category, setCategory] = useState(["parent1", "parent10", "leaf1"]);
  return (
    <Drawer
      open={isOpen}
      width="100%"
      placement="right"
      onClose={() => setVisible(false)}
      zIndex={10000}
    >
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
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    onClick={() => {
                      handleSearchProducts();
                    }}
                  >
                    検索する
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    style={{ width: "100%" }}
                    onClick={() => {
                      handleResetSearchProducts();
                    }}
                  >
                    キャンセル
                  </Button>
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
                total={listProducts.length}
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
                全 {listProducts.length} 件中　1 から 30 件目まで表示
              </span>
            </div>

            {/* Product Grid */}
            {/* border-2 border-[#23B7E5] */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {listProducts.map((product) => (
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
                              setVisible(applyItem, product.id);
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
