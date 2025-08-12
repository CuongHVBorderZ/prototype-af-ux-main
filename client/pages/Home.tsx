import React, { useContext, useEffect, useMemo, useState } from "react";
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
} from "antd";
import type { TableColumnsType } from "antd";

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
  ArrowLeftOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  FormOutlined,
  HolderOutlined,
  InstagramOutlined,
  LoadingOutlined,
  MessageOutlined,
  PlusOutlined,
  SearchOutlined,
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

const { Title, Paragraph, Text, Link } = Typography;

const { Content } = Layout;
const { confirm } = Modal;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  category?: string;
  productnumber_weight?: string;
  serial_number?: string;
  note?: string;
  initial_offer_amount?: string;
  first_offer_price?: string;
  expected_price?: string;
  final_gross_profit?: string;
  final_rate?: string;
}

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

const initialData: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    category: "Category A",
    productnumber_weight: "PN123 / 10g",
    serial_number: "SN001",
    note: "Note 1",
    initial_offer_amount: "1000",
    first_offer_price: "900",
    expected_price: "950",
    final_gross_profit: "100",
    final_rate: "10%",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    category: "Category B",
    productnumber_weight: "PN456 / 20g",
    serial_number: "SN002",
    note: "Note 2",
    initial_offer_amount: "1500",
    first_offer_price: "1400",
    expected_price: "1450",
    final_gross_profit: "100",
    final_rate: "7%",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    category: "Category C",
    productnumber_weight: "PN789 / 15g",
    serial_number: "SN003",
    note: "Note 3",
    initial_offer_amount: "2000",
    first_offer_price: "1900",
    expected_price: "1950",
    final_gross_profit: "100",
    final_rate: "5%",
  },
];

// Editable cell component trả về <td> đúng chuẩn bảng
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

  return (
    <td {...restProps}>
      {editing ? (
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={() => onSave(record!.key, dataIndex!, value)}
          onBlur={() => onSave(record!.key, dataIndex!, value)}
          style={{ width: width ?? "100%" }}
        />
      ) : (
        <div ref={cellRef}>{children}</div>
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

  const [dataSource, setDataSource] = useState<DataType[]>(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editingCell, setEditingCell] = useState<{
    key: string;
    dataIndex: keyof DataType;
  } | null>(null);

  const [hearingOpen, setHearingOpen] = useState(false);
  const [instructionOpen, setInstructionOpen] = useState(false);

  const [openCheckAuthentication, setOpenCheckAuthentication] = useState(false);
  const [openStateDefinition, setOpenStateDefinition] = useState(false);

  const handleOnChangeStateDefinition = (e) => {
    setOpenStateDefinition(true);
  };
  const handleOnChangeCheckAuthen = (e) => {
    setOpenCheckAuthentication(true);
  };

  const save = (key: string, dataIndex: keyof DataType, value: any) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key
          ? {
            ...item,
            [dataIndex]: value,
          }
          : item,
      ),
    );
    setEditingCell(null);
  };

  const applyItem = () => {
    if (!urlParams.has("applyItem")) return;
    const applyItem = parseParamValue(urlParams.get("applyItem")) || dataSource.length + 1;
    if (applyItem) {
      const id = parseInt(String(applyItem));
      const newItem: DataType = {
        key: id.toString(),
        name: "ロレックス エクスプローラー36 124270 ステンレス ギャラなし 箱なし あまりコマなし",
        age: 0,
        address: "",
        category: "時計",
        productnumber_weight: "",
        serial_number: "",
        note: "",
        initial_offer_amount: "",
        first_offer_price: "",
        expected_price: "",
        final_gross_profit: "",
        final_rate: "",
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
  }

  const columns: TableColumnsType<DataType> = [
    {
      key: "sort",
      width: 50,
      render: () => <DragHandle />,
      fixed: "left",
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
      width: 250,
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
      key: "productnumber_weight",
      dataIndex: "productnumber_weight",
      width: 250,
      onCell: (record) => ({
        record,
        dataIndex: "productnumber_weight",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "productnumber_weight",
        onSave: save,
        onClick: () =>
          setEditingCell({
            key: record.key,
            dataIndex: "productnumber_weight",
          }),
      }),
    },
    {
      title: "商品名",
      key: "name",
      dataIndex: "name",
      width: 280,
      onCell: (record) => ({
        record,
        dataIndex: "name",
        editing:
          editingCell?.key === record.key && editingCell?.dataIndex === "name",
        onSave: save,
        onClick: () => setEditingCell({ key: record.key, dataIndex: "name" }),
      }),
    },
    {
      title: "シリアル",
      key: "serial_number",
      dataIndex: "serial_number",
      width: 250,
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
      key: "note",
      dataIndex: "note",
      width: 200,
      onCell: (record) => ({
        record,
        dataIndex: "note",
        editing:
          editingCell?.key === record.key && editingCell?.dataIndex === "note",
        onSave: save,
        onClick: () => setEditingCell({ key: record.key, dataIndex: "note" }),
      }),
    },
    {
      title: "VD真贋",
      key: "vd_check",
      render: () => (
        <div style={{ textAlign: "center" }}>
          <Checkbox
            onChange={(e) => {
              handleOnChangeCheckAuthen(e);
            }}
          ></Checkbox>
          <CheckCircleOutlined
            style={{ fontSize: "22px", marginLeft: "10px", marginTop: "3px" }}
          />
        </div>
      ),
    },
    {
      title: "状態",
      key: "status",
      render: () => (
        <div style={{ textAlign: "center" }}>
          <Checkbox
            onChange={(e) => {
              handleOnChangeStateDefinition(e);
            }}
          ></Checkbox>
          <span style={{ marginLeft: "10px" }}>A : 80</span>
        </div>
      ),
    },
    {
      title: "初回提示金額",
      key: "initial_offer_amount",
      dataIndex: "initial_offer_amount",
      width: 150,
      onCell: (record) => ({
        record,
        dataIndex: "initial_offer_amount",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "initial_offer_amount",
        onSave: save,
        onClick: () =>
          setEditingCell({
            key: record.key,
            dataIndex: "initial_offer_amount",
          }),
      }),
    },
    {
      title: "最終提示金額",
      key: "first_offer_price",
      dataIndex: "first_offer_price",
      width: 150,
      onCell: (record) => ({
        record,
        dataIndex: "first_offer_price",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "first_offer_price",
        onSave: save,
        onClick: () =>
          setEditingCell({ key: record.key, dataIndex: "first_offer_price" }),
      }),
    },
    {
      title: "見込価格",
      key: "expected_price",
      dataIndex: "expected_price",
      width: 150,
      onCell: (record) => ({
        record,
        dataIndex: "expected_price",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "expected_price",
        onSave: save,
        onClick: () =>
          setEditingCell({ key: record.key, dataIndex: "expected_price" }),
      }),
    },
    {
      title: "最終粗利",
      key: "final_gross_profit",
      dataIndex: "final_gross_profit",
      width: 150,
      onCell: (record) => ({
        record,
        dataIndex: "final_gross_profit",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "final_gross_profit",
        onSave: save,
        onClick: () =>
          setEditingCell({ key: record.key, dataIndex: "final_gross_profit" }),
      }),
    },
    {
      title: "最終粗利率",
      key: "final_rate",
      dataIndex: "final_rate",
      width: 150,
      onCell: (record) => ({
        record,
        dataIndex: "final_rate",
        editing:
          editingCell?.key === record.key &&
          editingCell?.dataIndex === "final_rate",
        onSave: save,
        onClick: () =>
          setEditingCell({ key: record.key, dataIndex: "final_rate" }),
      }),
    },
    {
      title: "成立",
      key: "established",
      align: "center",
      render: () => (
        <div style={{ textAlign: "center" }}>
          <Checkbox />
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
            onClick={() => handleEditRow(record.key)}
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
  const handleEditRow = (id) => {
    navigate("/" + id + "/detail");
  };

  const [isMarketPriceOpen, setIsMarketPriceOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const fakeApiCall = () => new Promise((resolve) => setTimeout(resolve, 500));

  useEffect(() => {
    applyItem();
  }, []);

  function parseParamValue(value) {
    if (value === 'null') return null;
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
    return value;
  }

  const handleCloseDrawer = (key: boolean = undefined) => {
    setIsMarketPriceOpen(false);
    if (key === null) {
      const id = dataSource.length + 1;
      const newItem: DataType = {
        key: id.toString(),
        name: "ロレックス エクスプローラー36 124270 ステンレス ギャラなし 箱なし あまりコマなし",
        age: 0,
        address: "",
        category: "時計",
        productnumber_weight: "",
        serial_number: "",
        note: "",
        initial_offer_amount: "",
        first_offer_price: "",
        expected_price: "",
        final_gross_profit: "",
        final_rate: "",
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

  const onFinish = async () => {
    if (dataSource.length >= 4) {
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

  const addNewitem = () => {
    const newId = Math.max(...dataSource.map((p) => Number(p.key))) + 1;
    const newItem = {
      key: newId + "",
      name: "",
      age: 0,
      address: "",
      category: "",
      productnumber_weight: "",
      serial_number: "",
      note: "",
      initial_offer_amount: "0",
      first_offer_price: "0",
      expected_price: "0",
      final_gross_profit: "0",
      final_rate: "-",
    };
    setDataSource((prev) => [...prev, newItem]);
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
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                addNewitem();
              }}
            >
              商品を追加
            </Button>
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
                footer={TableListFooter}
              />
            </SortableContext>
          </DndContext>
        </div>
        <MarketPrice
          isOpen={isMarketPriceOpen}
          setVisible={handleCloseDrawer}
          applyItem={null}
        />
        <HearingInformation open={hearingOpen} setOpen={setHearingOpen} />
        <SaleInstruction open={instructionOpen} setOpen={setInstructionOpen} />

        <Modal
          open={openCheckAuthentication}
          onOk={() => {
            setOpenCheckAuthentication(false);
          }}
          onCancel={() => {
            setOpenCheckAuthentication(false);
          }}
          title="ヒアリング項目"
          okText="確認"
          cancelText="キャンセル"
          width={{
            xs: "90%",
            sm: "80%",
            md: "70%",
            lg: "60%",
            xl: "50%",
            xxl: "50%",
          }}
          footer={null}
        >
          <ModalAuthenticityCheck
            cancel={() => setOpenCheckAuthentication(false)}
            save={(data) => {
              console.log("Checked data:", data);
              setOpenCheckAuthentication(false);
            }}
          ></ModalAuthenticityCheck>
        </Modal>
        <Modal
          open={openStateDefinition}
          onOk={() => {
            setOpenStateDefinition(false);
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
            lg: "60%",
            xl: "50%",
            xxl: "50%",
          }}
        >
          <StateDefinition></StateDefinition>
        </Modal>
      </Content>
    </>
  );
}
