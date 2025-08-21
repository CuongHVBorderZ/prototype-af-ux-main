import React, { useContext, useMemo, useRef, useState, useEffect } from "react";
import {
  Table,
  Button,
  notification,
  Layout,
  Checkbox,
  Input,
  Flex,
  Divider,
  Typography,
  Space,
  Popconfirm,
  Spin,
  Modal,
  Menu,
  Dropdown,
  Tooltip,
  Cascader,
} from "antd";
import type { MenuProps, TableColumnsType } from "antd";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AreaChartOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  DashOutlined,
  DatabaseFilled,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  FormOutlined,
  HolderOutlined,
  InstagramOutlined,
  LoadingOutlined,
  MessageOutlined,
  PercentageOutlined,
  PlusOutlined,
  SearchOutlined,
  SmileOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { createStyles } from "antd-style";
import TableListFooter from "@/components/TableListFooter";
import { useNavigate, useSearchParams } from "react-router-dom";
import MarketPrice from "./MarketPrice";
import HearingInformation from "@/components/HearingInformation";
import SaleInstruction from "@/components/SaleInstruction";
import AuthenticityCheck from "@/components/feature/AuthenticityCheck";
import ModalAuthenticityCheck from "@/components/ModalAuthenticityCheck";
import StateDefinition from "@/components/feature/StateDefinition";
import DrawerCheckAuthentication from "@/components/DrawerCheckAuthentication";

const { Title, Paragraph, Text, Link } = Typography;

const { Content } = Layout;
const { confirm } = Modal;

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: any;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

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
  deal_closed: boolean;
}
const initialData: DataType[] = [
  // {
  //   key: "1",
  //   id: 1,
  //   manage_no: "",
  //   product_name: "4℃ ダイヤ リング K10(PG) 1.4g",
  //   purchase_price: 0,
  //   prospective_selling_price: 0,
  //   price_gross_profit: 0,
  //   final_gross_profit: 0,
  //   final_gross_profit_rate: 0,
  //   overseas_sale_price: 0,
  //   overseas_sale_price_date: null,
  //   overseas_sale_price_staff: null,
  //   high_price_check_by_name: null,
  //   purchase_method: "0.店頭買取",
  //   shop_name: "33.NANBOYA姫路店_W",
  //   purchase_date: "2025-07-10",
  //   category: "ブランドジュエリー",
  //   first_category: "時計",
  //   second_category: "腕時計",
  //   brand_category: "ロレックス",
  //   production_number: "",
  //   face: "黒",
  //   material: null,
  //   watch_power: null,
  //   accessories_remainder_watch_band: null,
  //   reference_list_price: null,
  //   serial_number: "",
  //   model_name: "",
  //   model_number: "",
  //   rank: "",
  //   _comment: "",
  //   check_state_definition: false,
  //   check_authen_checked: false,
  //   deal_closed: false,
  // },
];
const EditableCell: React.FC<{
  editing: boolean;
  dataIndex?: keyof DataType;
  record?: DataType;
  children: React.ReactNode;
  onSave: (key: string, dataIndex: keyof DataType, value: any) => void;
  colSpan?: number;
  rowSpan?: number;
}> = ({ editing, dataIndex, record, children, onSave, ...restProps }) => {
  const [value, setValue] = useState(record?.[dataIndex!] ?? "");
  const [width, setWidth] = useState<number | undefined>(undefined);
  const inputRef = React.useRef<Input>(null);
  const cellRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!editing && cellRef.current) {
      setWidth(cellRef.current.offsetWidth);
    }
  }, [editing]);

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const cssObj = {};

  let customDisplayedText = false;
  let displayedText = null;
  if (
    dataIndex == "purchase_price" ||
    dataIndex == "prospective_selling_price" ||
    dataIndex == "price_gross_profit"
  ) {
    displayedText =
      Number(record?.[dataIndex!]) > 0
        ? "¥ " + Number(record?.[dataIndex!]).toLocaleString("en-US")
        : "";
    customDisplayedText = true;
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

  let categoryValues = [];
  if (dataIndex == "category") {
    categoryValues = getValuesFromLabelPath(treeData, value);
  }

  const [category, setCategory] = useState(categoryValues);
  const onCategoryChange = (newValue) => {
    setCategory(newValue);
    const newValueText = getValueText(treeData, newValue);
    onSave(record!.key, dataIndex!, newValueText);
  };
  return (
    <td {...restProps} style={cssObj}>
      {editing ? (
        dataIndex != "category" ? (
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={() => onSave(record!.key, dataIndex!, value)}
            onBlur={() => onSave(record!.key, dataIndex!, value)}
            style={{ width: width ?? "100%" }}
          />
        ) : (
          <Cascader
            showSearch
            style={{ width: width ?? "100%" }}
            // value={categoryValues}
            value={category}
            placeholder="選択してください"
            allowClear
            onChange={onCategoryChange}
            options={treeData}
          />
        )
      ) : (
        <div ref={cellRef}>
          {customDisplayedText ? displayedText : children}
        </div>
      )}
    </td>
  );
};

const Row: React.FC<
  React.HTMLAttributes<HTMLTableRowElement> & { "data-row-key": string }
> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props["data-row-key"] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging
      ? { position: "relative", zIndex: 9999, backgroundColor: "#fafafa" }
      : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

export default function Home() {
  const [urlParams] = useSearchParams();
  const [api, contextHolder] = notification.useNotification();

  const [dataSource, setDataSource] = useState<DataType[]>(() => {
    const listItems = localStorage.getItem("listItems");
    return listItems ? JSON.parse(listItems) : initialData;
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editingCell, setEditingCell] = useState<{
    key: string;
    dataIndex: keyof DataType;
  } | null>(null);

  const [hearingOpen, setHearingOpen] = useState(false);
  const [instructionOpen, setInstructionOpen] = useState(false);

  const [openCheckAuthentication, setOpenCheckAuthentication] = useState(false);
  const [openStateDefinition, setOpenStateDefinition] = useState(false);
  const [openGoldEstimatePrice, setOpenGoldEstimatePrice] = useState(false);

  const [selectedRow, setSelectedRow] = useState<DataType>();

  useEffect(() => {
    localStorage.setItem("listItems", JSON.stringify(dataSource));
  }, [dataSource]);

  const handleOnChangeStateDefinition = (e) => {
    setOpenStateDefinition(true);
  };
  const handleOnChangeCheckAuthen = (e) => {
    setOpenCheckAuthentication(true);
  };

  const handleDealClosed = (record, isChecked) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === record.key ? { ...item, deal_closed: isChecked } : item,
      ),
    );
  };

  const save = (key: string, dataIndex: keyof DataType, value: any) => {
    setDataSource((prev) =>
      prev.map((item) => {
        if (item.key !== key) return item;

        let updates: Partial<DataType> = {
          [dataIndex]: value,
        };

        if (dataIndex === "prospective_selling_price") {
          const purchasePrice = Number(value);
          const sellingPrice = Number(item.price_gross_profit || 0);
          const newFGBValue = sellingPrice - purchasePrice;
          const newFGBRateValue = purchasePrice
            ? (newFGBValue * 100) / purchasePrice
            : 0;

          updates = {
            ...updates,
            final_gross_profit: newFGBValue,
            final_gross_profit_rate: newFGBRateValue,
          };
        }

        if (dataIndex === "price_gross_profit") {
          const sellingPrice = Number(value);
          const purchasePrice = Number(item.prospective_selling_price || 0);
          const newFGBValue = sellingPrice - purchasePrice;
          const newFGBRateValue = purchasePrice
            ? (newFGBValue * 100) / purchasePrice
            : 0;

          updates = {
            ...updates,
            final_gross_profit: newFGBValue,
            final_gross_profit_rate: newFGBRateValue,
          };
        }

        return { ...item, ...updates };
      }),
    );

    setEditingCell(null);
  };

  const applyItem = () => {
    if (!urlParams.has("applyItem")) return;
    const applyItem =
      parseParamValue(urlParams.get("applyItem")) || dataSource.length + 1;
    if (applyItem) {
      const id = parseInt(String(applyItem));
      const newItem: DataType = {
        key: id.toString(),
        id: id,
        manage_no: "A3793665",
        product_name:
          "ノースフェイス ポリエステル ダウンジャケット XL ブラック×ホワイト",
        purchase_price: 0,
        prospective_selling_price: 0,
        price_gross_profit: 0,
        final_gross_profit: 0,
        final_gross_profit_rate: 0,
        overseas_sale_price: 0,
        overseas_sale_price_date: null,
        overseas_sale_price_staff: null,
        high_price_check_by_name: null,
        purchase_method: "0.店頭買取",
        shop_name: "33.NANBOYA姫路店_W",
        purchase_date: "2025-07-10",
        category: "時計/腕時計/ロレックス",
        first_category: "時計",
        second_category: "腕時計",
        brand_category: "ロレックス",
        production_number: "T5J78405",
        face: "黒",
        material: null,
        watch_power: null,
        accessories_remainder_watch_band: null,
        reference_list_price: null,
        serial_number: "T5J78405",
        model_name: "",
        model_number: "",
        rank: "",
        _comment: "",
        check_state_definition: false,
        check_authen_checked: false,
        deal_closed: false,
      };
      setDataSource((prevData) => {
        const existingItemIndex = prevData.findIndex(
          (item) => item.key === newItem.key,
        );
        if (existingItemIndex !== -1) {
          const updatedData = [...prevData];
          updatedData[existingItemIndex] = newItem;
          return updatedData;
        } else {
          // Add new item
          return [...prevData, newItem];
        }
      });
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      key: "sort",
      width: 50,
      render: () => <DragHandle />,
      fixed: "left",
    },
    {
      title: "No.",
      dataIndex: "no",
      key: "key",
      width: 60,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    // {
    //   title: "簡易査定",
    //   key: "簡易査定",
    //   width: 100,
    //   render: (_, record) => (
    //     <Checkbox
    //       checked={selectedRowKeys.includes(record.key)}
    //       onChange={(e) => {
    //         const checked = e.target.checked;
    //         let newSelected = [...selectedRowKeys];
    //         if (checked) newSelected.push(record.key);
    //         else newSelected = newSelected.filter((k) => k !== record.key);
    //         setSelectedRowKeys(newSelected);
    //       }}
    //     />
    //   ),
    //   align: "center",
    //   fixed: "left",
    // },
    {
      title: "商品分類",
      key: "category",
      dataIndex: "category",
      width: 300,
      onCell: (record) => ({
        record,
        dataIndex: "category",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "category",
        onSave: save,
        onClick: () =>
          setEditingCell({ key: record.key, dataIndex: "category" }),
      }),
      fixed: "left",
    },
    {
      title: "型番 / 重量",
      key: "manage_no",
      dataIndex: "manage_no",
      width: 150,
      onCell: (record) => ({
        record,
        dataIndex: "manage_no",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "manage_no",
        onSave: save,
        onClick: () =>
          setEditingCell({
            key: record.key,
            dataIndex: "manage_no",
          }),
      }),
    },
    {
      title: "商品名",
      key: "product_name",
      dataIndex: "product_name",
      width: 350,
      onCell: (record) => ({
        record,
        dataIndex: "product_name",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "product_name",
        onSave: save,
        onClick: () =>
          setEditingCell({ key: record.key, dataIndex: "product_name" }),
      }),
    },
    {
      title: "シリアル",
      key: "serial_number",
      dataIndex: "serial_number",
      width: 150,
      onCell: (record) => ({
        record,
        dataIndex: "serial_number",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "serial_number",
        onSave: save,
        onClick: () =>
          setEditingCell({ key: record.key, dataIndex: "serial_number" }),
      }),
    },
    {
      title: "補足",
      key: "_comment",
      dataIndex: "_comment",
      width: 200,
      onCell: (record) => ({
        record,
        dataIndex: "_comment",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "_comment",
        onSave: save,
        onClick: () =>
          setEditingCell({ key: record.key, dataIndex: "_comment" }),
      }),
    },
    {
      title: "VD真贋",
      key: "vd_check",
      render: (_, record, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Checkbox
            onChange={(e) => {
              handleOnChangeCheckAuthen(e);
              setSelectedRow(record);
            }}
            checked={record.check_authen_checked}
          ></Checkbox>
          {record.check_authen_checked ? (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle
                cx="7.5"
                cy="7.5"
                r="6.25"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <span style={{ marginLeft: "0px" }}>未</span>
          )}
        </div>
      ),
    },
    {
      title: "状態",
      key: "status",
      render: (_, record, index) => (
        <div style={{ textAlign: "center" }}>
          <Checkbox
            onChange={(e) => {
              handleOnChangeStateDefinition(e);
              setSelectedRow(record);
            }}
            checked={record.check_state_definition}
          ></Checkbox>
          {record.check_state_definition ? (
            <span style={{ marginLeft: "10px" }}>A : 80</span>
          ) : (
            <span style={{ marginLeft: "10px" }}>未</span>
          )}
        </div>
      ),
    },
    {
      title: "初回提示金額",
      key: "purchase_price",
      dataIndex: "purchase_price",
      width: 150,
      onCell: (record) => ({
        record,
        dataIndex: "purchase_price",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "purchase_price",
        onSave: save,
        onClick: () =>
          setEditingCell({
            key: record.key,
            dataIndex: "purchase_price",
          }),
        className:
          Number(record.purchase_price) <= 0
            ? "cell-yellow no-hover-cell"
            : "cell-normal no-hover-cell",
      }),
    },
    {
      title: "最終提示金額",
      key: "prospective_selling_price",
      dataIndex: "prospective_selling_price",
      width: 150,
      onCell: (record) => ({
        record,
        dataIndex: "prospective_selling_price",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "prospective_selling_price",
        onSave: save,
        onClick: () =>
          setEditingCell({
            key: record.key,
            dataIndex: "prospective_selling_price",
          }),
        className:
          Number(record.prospective_selling_price) <= 0
            ? "cell-yellow no-hover-cell"
            : "cell-normal no-hover-cell",
      }),
    },
    {
      title: "見込価格",
      key: "price_gross_profit",
      dataIndex: "price_gross_profit",
      width: 150,
      onCell: (record) => ({
        record,
        dataIndex: "price_gross_profit",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "price_gross_profit",
        onSave: save,
        onClick: () =>
          setEditingCell({ key: record.key, dataIndex: "price_gross_profit" }),
        className:
          Number(record.price_gross_profit) <= 0
            ? "cell-yellow no-hover-cell"
            : "cell-normal no-hover-cell",
      }),
    },
    // {
    //   title: "最終粗利",
    //   key: "final_gross_profit",
    //   dataIndex: "final_gross_profit",
    //   width: 150,
    //   onCell: (record) => ({
    //     record,
    //     dataIndex: "final_gross_profit",
    //     editing:
    //       editingCell?.key === record.key &&
    //       editingCell?.dataIndex === "final_gross_profit",
    //     onSave: save,
    //     onClick: () =>
    //       setEditingCell({ key: record.key, dataIndex: "final_gross_profit" }),
    //   }),
    // },
    {
      title: "最終粗利",
      key: "final_gross_profit",
      width: 160,
      render: (_, record, index) => {
        const valueFinalProfit = Number(record.final_gross_profit);
        const hasNegativeProfit = valueFinalProfit < 0;
        let content = <></>;
        if (valueFinalProfit < 0) {
          content = (
            <div
              style={{
                padding: "4px 8px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {hasNegativeProfit && (
                <WarningOutlined
                  style={{ color: "#F5222D", fontSize: "14px" }}
                />
              )}
              <Text>¥ {Number(valueFinalProfit).toLocaleString("en-US")}</Text>
            </div>
          );
        }
        return hasNegativeProfit ? (
          <Tooltip title="赤字取引となる商品は買取できません。">
            {content}
          </Tooltip>
        ) : valueFinalProfit ? (
          "¥ " + Number(valueFinalProfit).toLocaleString("en-US")
        ) : (
          "¥ 0"
        );
      },
      onCell: (record, rowIndex) => ({
        className:
          record.final_gross_profit < 0
            ? "cell-red no-hover-cell"
            : "cell-normal no-hover-cell",
      }),
    },
    {
      title: "最終粗利率",
      key: "final_gross_profit_rate",
      dataIndex: "final_gross_profit_rate",
      width: 140,
      className: "final_gross_profit_rate",
      render: (_, record, index) => {
        const valueFinalProfit = Number(record.final_gross_profit_rate);
        const hasNegativeProfit = valueFinalProfit < 0;
        let content = <></>;
        if (valueFinalProfit < 0) {
          content = (
            <div
              style={{
                padding: "4px 8px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {hasNegativeProfit && (
                <WarningOutlined
                  style={{ color: "#F5222D", fontSize: "14px" }}
                />
              )}
              <Text>{Number(valueFinalProfit).toLocaleString("en-US")}%</Text>
            </div>
          );
        }
        return hasNegativeProfit ? (
          <Tooltip title="赤字取引となる商品は買取できません。">
            {content}
          </Tooltip>
        ) : valueFinalProfit ? (
          Number(valueFinalProfit.toFixed(2)) + "%"
        ) : (
          "0%"
        );
      },
      onCell: (record, rowIndex) => ({
        className:
          record.final_gross_profit_rate < 0
            ? "cell-red no-hover-cell"
            : "cell-normal no-hover-cell",
      }),
    },
    {
      title: "成立",
      key: "established",
      align: "center",
      render: (_, record, index) => (
        <div style={{ textAlign: "center" }}>
          <Checkbox
            checked={record.deal_closed}
            onChange={(e) => {
              handleDealClosed(record, e.target.checked);
            }}
          />
        </div>
      ),
    },
    {
      title: "アクション",
      key: "アクション",
      align: "center",
      // eslint-disable-next-line no-unused-vars
      render: (_, record, index) => (
        <Space>
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEditRow(record)}
          />

          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveItem(record.key)}
          />
        </Space>
      ),
      width: 120,
    },
  ];

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const oldIndex = prev.findIndex((item) => item.key === active.id);
        const newIndex = prev.findIndex((item) => item.key === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };
  const navigate = useNavigate();
  const handleEditRow = (record) => {
    if (!record.product_name) {
      navigate(`/${record.key}/detail?mode=new`);
    } else {
      navigate(`/${record.key}/detail`);
    }
  };

  const [isMarketPriceOpen, setIsMarketPriceOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const fakeApiCall = () => new Promise((resolve) => setTimeout(resolve, 500));

  useEffect(() => {
    applyItem();
  }, []);

  function parseParamValue(value) {
    if (value === "null") return null;
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
    return value;
  }

  const handleCloseDrawer = (key: boolean = undefined) => {
    setIsMarketPriceOpen(false);
  };

  const onFinish = async () => {
    localStorage.removeItem("listItems");
    // if (dataSource.length >= 8) {
    //   api.error({
    //     message: "山仕切りの買取上限額を超過しました",
    //     description: "¥5,000を超える山仕切りは個別に商品を登録してください。",
    //   });
    //   return;
    // }
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

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const mappingPrices = [
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
  ];
  const mappingWatches = [
    "ロレックス コスモグラフデイトナ 116500LN T5J78405 SS SS AT 黒文字盤 あまりごまなし",
    "ロレックス コスモグラフデイトナ 116500LN SS SS AT 白文字盤 あまりごま2",
    "ロレックス コスモグラフデイトナ 116500LN SS SS AT 黒文字盤",
    "ロレックス コスモグラフデイトナ 116500LN SS AT 白文字盤 あまりごま3",
    "ロレックス コスモグラフデイトナ 116500LN SS AT 黒文字盤 あまりごま2",

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
  ];

  const handleAddNewItem = (id) => {
    const newId = Math.max(...dataSource.map((p) => Number(p.key)), 0) + 1;

    // Base item chung
    const baseItem = {
      key: String(newId),
      id: newId,
      manage_no: "",
      product_name: "",
      purchase_price: 0,
      prospective_selling_price: 0,
      price_gross_profit: 0,
      final_gross_profit: 0,
      final_gross_profit_rate: 0,
      overseas_sale_price: 0,
      overseas_sale_price_date: null,
      overseas_sale_price_staff: null,
      high_price_check_by_name: null,
      purchase_method: 0,
      shop_name: 0,
      purchase_date: 0,
      category: "",
      first_category: "",
      second_category: "",
      brand_category: "",
      production_number: "",
      face: "",
      material: null,
      watch_power: null,
      accessories_remainder_watch_band: null,
      reference_list_price: null,
      serial_number: "",
      model_name: "",
      model_number: "",
      rank: "",
      _comment: "",
      check_state_definition: false,
      check_authen_checked: false,
      deal_closed: false,
    };

    let watchObject = null;
    if (id.includes("leaf1")) {
      const parts = id.split("-");
      const watchId = parseInt(parts[1], 10);
      // console.log(watchId);
      const watchName = mappingWatches[watchId - 1];
      // console.log(watchName);
      const watchNameParts = watchName.split(" ");
      // console.log(watchNameParts);
      watchObject = {
        manage_no: watchNameParts[2],
        product_name: watchName,
        purchase_method: "0.店頭買取",
        shop_name: "33.NANBOYA姫路店_W",
        purchase_date: "2025-07-10",
        category: "時計/腕時計/ロレックス",
        first_category: "時計",
        second_category: "腕時計",
        brand_category: "ロレックス",
        production_number: watchNameParts[3],
        face: "黒",
        serial_number: watchNameParts[3],
        model_name: watchNameParts[1],
        model_number: watchNameParts[2],
        purchase_price: mappingPrices[watchId - 1],
      };
      // console.log(watchObject);
    }

    const overrides = {
      default: id
        ? {
            manage_no: "",
            product_name: "ダイヤ ネックレス Pt900×Pt850 13.9g 1.62",
            purchase_method: "0.店頭買取",
            shop_name: "33.NANBOYA姫路店_W",
            purchase_date: "2025-07-10",
            category: "時計/腕時計/ロレックス",
            first_category: "時計",
            second_category: "腕時計",
            brand_category: "ロレックス",
            production_number: "",
            face: "黒",
            serial_number: "",
          }
        : {},
      "leaf1-1": watchObject,
      "leaf1-2": watchObject,
      "leaf1-3": watchObject,
      "leaf1-4": watchObject,
      "leaf1-5": watchObject,
      "leaf1-6": watchObject,
      "leaf1-7": watchObject,
      "leaf1-8": watchObject,
      "leaf1-9": watchObject,
      "leaf1-10": watchObject,
      "leaf1-11": watchObject,
      "leaf1-12": watchObject,
      "leaf1-13": watchObject,
      "leaf1-14": watchObject,
      "leaf1-15": watchObject,
      "leaf311-1": {
        manage_no: "DP019614",
        product_name:
          "エルメス バーキン30 ルトゥルネ トゴ ブラック ゴールド金具 □H:2004年",
        purchase_method: "0.店頭買取",
        shop_name: "69.NANBOYA天満橋京阪シティモール店_W",
        purchase_date: "2025-06-29",
        category: "バッグ/ハンドバッグ/エルメス",
        first_category: "バッグ",
        second_category: "ハンドバッグ",
        brand_category: "エルメス",
        production_number: "バーキン30",
        face: "黒",
        serial_number: "バーキン30",
        model_name: "バーキン30",
      },
      "leaf311-2": {
        manage_no: "DP019614",
        product_name:
          "ジバンシィ GV3 レザー×スエード チェーンショルダーバッグ グレー×ボルドー",
        purchase_method: "0.店頭買取",
        shop_name: "69.02.NANBOYA梅田店_W",
        purchase_date: "2025-06-29",
        category: "バッグ/ハンドバッグ/エルメス",
        first_category: "バッグ",
        second_category: "ハンドバッグ",
        brand_category: "ジバンシィ",
        production_number: "A2893930",
        face: "黒",
        serial_number: "A2893930",
        model_name: "A2893930",
      },
    };

    console.log(overrides["leaf1-1"]);

    const newItem = {
      ...baseItem,
      ...(overrides[id] || overrides.default),
    };

    setDataSource((prev) => [...prev, newItem]);
  };

  const addNewitem = () => {
    handleAddNewItem(null);
  };

  const handleRemoveItem = (id) => {
    confirm({
      title: "これらのアイテムを削除しますか?",
      icon: <ExclamationCircleFilled />,
      content: "説明の一部",
      onOk() {
        setDataSource((prev) => prev.filter((item) => item.key !== id));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const [currentRecord, setCurrentRecord] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const subMenus = (
    <Menu
      items={[
        {
          key: "1",
          icon: <EditOutlined />,
          label: (
            <div>
              <span style={{ float: "left" }}>詳細を開く</span>
              <span style={{ color: "#00000073", float: "right" }}>(F2)</span>
            </div>
          ),
          onClick: () => handleEditRow(currentRecord),
        },
        {
          key: "2",
          icon: <AreaChartOutlined />,
          label: (
            <div>
              <span style={{ float: "left" }}>見込価格計算</span>
              <span style={{ color: "#00000073", float: "right" }}>(F3)</span>
            </div>
          ),
          onClick: () => setOpenGoldEstimatePrice(true),
        },
      ]}
    />
  );

  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setMenuVisible(false);
    }, 1000);
  };

  const [statisticValues, setStatisticValues] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
  });

  useEffect(() => {
    const newStatisticValues = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
    };

    newStatisticValues.a = dataSource.reduce((sum, item) => {
      const amount = Number(item.purchase_price) || 0;
      return sum + amount;
    }, 0);
    newStatisticValues.b = dataSource.reduce((sum, item) => {
      const amount = Number(item.prospective_selling_price) || 0;
      return sum + amount;
    }, 0);
    newStatisticValues.c = dataSource.reduce((sum, item) => {
      const amount = Number(item.price_gross_profit) || 0;
      return sum + amount;
    }, 0);
    newStatisticValues.d = dataSource.reduce((sum, item) => {
      const amount = Number(item.final_gross_profit) || 0;
      return sum + amount;
    }, 0);
    newStatisticValues.e = dataSource.reduce((sum, item) => {
      const amount = Number(item.final_gross_profit) || 0;
      return sum + amount;
    }, 0);
    newStatisticValues.f =
      newStatisticValues.b !== 0
        ? Number(
            ((newStatisticValues.d * 100) / newStatisticValues.b).toFixed(2),
          )
        : 0;
    setStatisticValues(newStatisticValues);
  }, [dataSource]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a href="#">商品を追加</a>,
    },
    {
      key: "2",
      label: <a href="#">簡易査定商品を追加</a>,
    },
    {
      key: "3",
      label: <a href="#">山仕切り商品を追加</a>,
    },
  ];

  const handleSaveCheckAuthentication = () => {
    setOpenCheckAuthentication(false);
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === selectedRow.key
          ? { ...item, check_authen_checked: true }
          : item,
      ),
    );
  };

  const handleSaveStateDefinition = () => {
    setOpenStateDefinition(false);
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === selectedRow.key
          ? { ...item, check_state_definition: true }
          : item,
      ),
    );
  };

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

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
      <Content
        style={{ padding: 24, minHeight: 1280 }}
        onClick={() => setMenuVisible(false)}
      >
        <Flex
          gap="middle"
          style={{
            margin: "20px 0",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Button
            icon={<ArrowLeftOutlined />}
            type="link"
            style={{ padding: 0 }}
          >
            一覧へもどる
          </Button>
          <Button
            icon={<FormOutlined />}
            onClick={() => {
              setHearingOpen(true);
            }}
          >
            ヒアリング項目入力
          </Button>
          <Button
            icon={<MessageOutlined />}
            onClick={() => {
              setInstructionOpen(true);
            }}
          >
            追いトーク
          </Button>
          <Button
            icon={<MessageOutlined />}
            onClick={() => {
              setInstructionOpen(true);
            }}
          >
            切り返しトーク
          </Button>
          <Button
            type="primary"
            onClick={() => {
              onFinish();
            }}
          >
            チェックシートに反映する
          </Button>
        </Flex>

        <div style={{ padding: "20px", backgroundColor: "white" }}>
          <Title level={4}>査定商品一覧</Title>
          <Flex gap="middle" style={{ margin: "20px 0" }}>
            <Button
              icon={<SearchOutlined />}
              onClick={() => {
                setIsMarketPriceOpen(true);
              }}
            >
              キーワードから特定
            </Button>
            <Button
              icon={<InstagramOutlined />}
              onClick={() => {
                setIsMarketPriceOpen(true);
              }}
            >
              画像から特定
            </Button>
            <div>
              <Button
                icon={<PlusOutlined />}
                onClick={() => {
                  addNewitem();
                }}
                style={{ borderRadius: 0 }}
              >
                商品を追加
              </Button>
              <Dropdown menu={{ items }}>
                <Button
                  icon={<DashOutlined />}
                  onClick={(e) => e.preventDefault()}
                />
              </Dropdown>
            </div>
          </Flex>
          <DndContext
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={dataSource.map((item) => item.key)}
              strategy={verticalListSortingStrategy}
            >
              <Table<DataType>
                rowHoverable={false}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered
                components={{
                  body: {
                    row: Row,
                    cell: EditableCell,
                  },
                }}
                rowKey="key"
                scroll={{ x: "max-content" }}
                footer={() => TableListFooter(statisticValues)}
                onRow={(record, rowIndex) => {
                  return {
                    onContextMenu: (event) => {
                      event.preventDefault();
                      setCurrentRecord(record);
                      setMenuPosition({ x: event.clientX, y: event.clientY });
                      setMenuVisible(false);
                      setTimeout(() => setMenuVisible(true), 10);
                    },
                  };
                }}
              />
            </SortableContext>
          </DndContext>
        </div>
        <MarketPrice
          isOpen={isMarketPriceOpen}
          setVisible={(applyItem, id) => {
            id ? handleAddNewItem(id) : null;
            handleCloseDrawer();
          }}
          applyItem={null}
        />
        <HearingInformation open={hearingOpen} setOpen={setHearingOpen} />
        <SaleInstruction open={instructionOpen} setOpen={setInstructionOpen} />

        {type === "drawer" ? (
          <DrawerCheckAuthentication
            isOpen={openCheckAuthentication}
            onClose={() => {
              setOpenCheckAuthentication(false);
            }}
            onSave={() => {
              handleSaveCheckAuthentication();
            }}
          ></DrawerCheckAuthentication>
        ) : (
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
                handleSaveCheckAuthentication();
              }}
            ></ModalAuthenticityCheck>
          </Modal>
        )}
        <Modal
          open={openStateDefinition}
          onOk={() => {
            handleSaveStateDefinition();
          }}
          onCancel={() => {
            setOpenStateDefinition(false);
          }}
          title="ヒアリング項目"
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
          style={{ top: 20 }}
        >
          <StateDefinition updateStatusAssessed={undefined}></StateDefinition>
        </Modal>
        <Modal
          open={openGoldEstimatePrice}
          onOk={() => {
            setOpenGoldEstimatePrice(false);
          }}
          onCancel={() => {
            setOpenGoldEstimatePrice(false);
          }}
          title=""
          okText="確認"
          cancelText="キャンセル"
          // width={{
          //   xs: "90%",
          //   sm: "80%",
          //   md: "70%",
          //   lg: "60%",
          //   xl: "50%",
          //   xxl: "50%",
          // }}
          width={750}
        >
          <Title
            level={4}
            style={{
              lineHeight: "28px",
              marginBottom: "20px",
            }}
          >
            見込価格計算
          </Title>
          <Flex vertical>
            <Flex>
              <div style={{ width: "120px" }}>
                <span>相場</span>
              </div>
              <div>
                <span>2025年07月18日 現在</span>
              </div>
            </Flex>
            <Flex>
              <div style={{ width: "120px" }}>
                <span>グラム単価</span>
              </div>
              <div>
                <span>¥7,284/g</span>
              </div>
            </Flex>
            <Flex>
              <div style={{ width: "120px" }}>
                <span>上限買取価格</span>
              </div>
              <div>
                <span>¥72,840</span>
              </div>
            </Flex>
            <Flex style={{ margin: "20px 0 0 0" }}>
              <div style={{ width: "120px", margin: "30px 0" }}>
                <span>見込価格計算</span>
              </div>
              <div>
                <Flex>
                  <div>
                    <Flex vertical>
                      <span>見込粗利率</span>
                      <Input size="small" suffix={<PercentageOutlined />} />
                    </Flex>
                  </div>
                  <div style={{ margin: "30px 10px" }}>
                    <ArrowRightOutlined />
                  </div>
                  <div>
                    <Flex vertical>
                      <span>見込価格</span>
                      <Input size="small" prefix={"¥"} />
                    </Flex>
                  </div>
                </Flex>
              </div>
            </Flex>
          </Flex>
        </Modal>
        {menuVisible && (
          <div
            style={{
              position: "fixed",
              top: menuPosition.y,
              left: menuPosition.x,
              zIndex: 9999,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Dropdown overlay={subMenus} visible>
              <span />
            </Dropdown>
          </div>
        )}
      </Content>
    </>
  );
}
