import React, { useState } from "react";
import {
  Typography,
  Table,
  Checkbox,
  Form,
  InputNumber,
  Select,
  Row,
  Col,
  Space,
  Input,
  Flex,
  Button,
  Divider,
  notification,
  Collapse,
  CollapseProps,
} from "antd";

const { Title } = Typography;

const StateDefinition = ({ updateStatusAssessed }) => {
  // 状態ランクの評価基準データ
  const conditionRankingData = [
    {
      key: "N",
      rank: "N",
      definition: "未使用",
      description:
        "保護シール、付属品、年式などのNランクの条件をすべて満たしている",
    },
    {
      key: "S",
      rank: "S",
      definition: "新品同等",
      description: "着用もしくは使用された形跡のない状態の商品",
    },
    {
      key: "SA",
      rank: "SA",
      definition: "非常にきれい",
      description:
        "数回の使用された形跡が見られるが、新品と遜色のない状態の良い商品",
    },
    {
      key: "A",
      rank: "A",
      definition: "きれい",
      description: "少々の使用感が見られるが、状態の良い商品",
    },
    {
      key: "AB",
      rank: "AB",
      definition: "ややきれい",
      description: "目立たない汚れや、小傷などが見られる商品",
    },
    {
      key: "B",
      rank: "B",
      definition: "使用感あり",
      description: "使用による傷や汚れが見られる商品",
    },
    {
      key: "BC",
      rank: "BC",
      definition: "劣化あり",
      description: "傷や汚れにより、外観に影響が出ている商品",
    },
    {
      key: "C",
      rank: "C",
      definition: "非常に劣化あり",
      description: "通常使用にも支障が出るレベルの商品",
    },
    {
      key: "J",
      rank: "J",
      definition: "使用困難",
      description: "状態の劣化や損傷により使用が困難な商品",
    },
  ];

  // 総合ランクの評価基準データ
  const overallRankingData = [
    {
      key: "S",
      rank: "S(なし)",
      description: "未開封かつ、初期傷が無い状態",
    },
    {
      key: "A",
      rank: "A(極小)",
      description:
        "未開封だが初期傷がある、または、試着程度の状態。ルーペを使用しないとキズの確認ができない使用感",
    },
    {
      key: "AB",
      rank: "AB(小)",
      description: "数回程度の使用感の状態、一般的に美品と呼ばれる",
    },
    {
      key: "B",
      rank: "B(中)",
      description:
        "平均的な使用感、ルーペを使用しなくても小キズが判断できる状態",
    },
    {
      key: "BC",
      rank: "BC(大)",
      description: "長期にわたって使用を繰り返した商品の状態",
    },
    {
      key: "C",
      rank: "C(特大)",
      description: "上記かつ、状態異常がある状態",
    },
  ];

  // 状態異常チェックデータ
  const conditionAnomalyData = [
    { key: "1", anomaly: "変色", selected: true },
    { key: "2", anomaly: "サイクロップスレンズ傷", selected: false },
    { key: "3", anomaly: "ルミナス劣化", selected: false },
    { key: "4", anomaly: "パーツ欠損", selected: false },
    { key: "5", anomaly: "破損", selected: true },
    { key: "6", anomaly: "リューズねじ込み不良", selected: false },
    { key: "7", anomaly: "操作不良", selected: false },
    { key: "8", anomaly: "社外パーツ", selected: false },
  ];

  // 大分類状態ランクチェックデータ
  const [partsRankingData, setPartsRankingData] = useState([
    {
      key: "case",
      part: "ケース",
      S: false,
      A: false,
      AB: false,
      B: false,
      BC: false,
      C: true,
    },
    {
      key: "bezel",
      part: "ベゼル",
      S: false,
      A: false,
      AB: false,
      B: false,
      BC: true,
      C: false,
    },
    {
      key: "dial",
      part: "文字盤",
      S: false,
      A: true,
      AB: false,
      B: false,
      BC: false,
      C: false,
    },
    {
      key: "hands",
      part: "針",
      S: false,
      A: true,
      AB: false,
      B: false,
      BC: false,
      C: false,
    },
    {
      key: "crystal",
      part: "風防",
      S: false,
      A: true,
      AB: false,
      B: false,
      BC: false,
      C: false,
    },
    {
      key: "strap",
      part: "ベルト",
      S: false,
      A: true,
      AB: false,
      B: false,
      BC: false,
      C: false,
    },
    {
      key: "buckle",
      part: "バックル/尾錠",
      S: false,
      A: true,
      AB: false,
      B: false,
      BC: false,
      C: false,
    },
    {
      key: "crown",
      part: "リューズ",
      S: false,
      A: true,
      AB: false,
      B: false,
      BC: false,
      C: false,
    },
    {
      key: "caseback",
      part: "裏蓋",
      S: false,
      A: true,
      AB: false,
      B: false,
      BC: false,
      C: false,
    },
    {
      key: "movement",
      part: "内部",
      S: false,
      A: true,
      AB: false,
      B: false,
      BC: false,
      C: false,
    },
  ]);

  const handleCheckboxChange = (
    recordKey: string,
    field: string,
    checked: boolean,
  ) => {
    setPartsRankingData((prev) =>
      prev.map((item) => {
        if (item.key === recordKey) {
          return {
            key: item.key,
            part: item.part,
            S: checked && field === "S",
            A: checked && field === "A",
            AB: checked && field === "AB",
            B: checked && field === "B",
            BC: checked && field === "BC",
            C: checked && field === "C",
          };
        }
        return item;
      }),
    );
  };

  const conditionRankingColumns = [
    {
      title: "状態ランク",
      dataIndex: "rank",
      key: "rank",
      width: 120,
      align: "center" as const,
    },
    {
      title: "定義",
      dataIndex: "definition",
      key: "definition",
      width: 120,
      align: "center" as const,
    },
    {
      title: "説明",
      dataIndex: "description",
      key: "description",
      align: "left" as const,
    },
  ];

  const overallRankingColumns = [
    {
      title: "大分類状態ランク",
      dataIndex: "rank",
      key: "rank",
      width: 180,
      align: "center" as const,
    },
    {
      title: "説明",
      dataIndex: "description",
      key: "description",
      align: "left" as const,
    },
  ];

  const conditionAnomalyColumns = [
    {
      title: "状態異常",
      dataIndex: "anomaly",
      key: "anomaly",
      width: 180,
    },
    {
      title: "有",
      key: "selected",
      width: 60,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Checkbox defaultChecked={Math.random() > 0.5} />
      ),
    },
    {
      title: "該当部位",
      key: "parts",
      width: 250,
      maxWidth: 250,
      render: (_: any, record: any) => (
        <Select
          placeholder="Select"
          maxTagCount={2}
          style={{
            width: "100%",
            maxWidth: "300px",
            padding: "0px!important",
            margin: "0px",
          }}
          // size="small"
          mode="multiple"
          defaultValue={["ケース", "ベゼル"]}
          options={[
            { label: "ケース", value: "ケース" },
            { label: "ベゼル", value: "ベゼル" },
            { label: "文字盤", value: "文字盤" },
            { label: "針", value: "針" },
            { label: "風防", value: "風防" },
            { label: "ベルト", value: "ベルト" },
            { label: "バックル/尾錠", value: "バックル/尾錠" },
            { label: "リューズ", value: "リューズ" },
            { label: "裏蓋", value: "裏蓋" },
            { label: "内部(裏スケ)", value: "内部(裏スケ)" },
          ]}
        />
      ),
    },
  ];

  const partsRankingColumns = [
    {
      title: "大分類（部位）",
      dataIndex: "part",
      key: "part",
      width: 140,
    },
    {
      title: "S(なし)",
      key: "S",
      width: 80,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Checkbox
          checked={record.S}
          onChange={(e) =>
            handleCheckboxChange(record.key, "S", e.target.checked)
          }
          disabled={["case", "bezel"].includes(record.key)}
        />
      ),
    },
    {
      title: "A(極小)",
      key: "A",
      width: 80,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Checkbox
          checked={record.A}
          onChange={(e) =>
            handleCheckboxChange(record.key, "A", e.target.checked)
          }
          disabled={["case", "bezel"].includes(record.key)}
        />
      ),
    },
    {
      title: "AB(小)",
      key: "AB",
      width: 80,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Checkbox
          checked={record.AB}
          onChange={(e) =>
            handleCheckboxChange(record.key, "AB", e.target.checked)
          }
        />
      ),
    },
    {
      title: "B(中)",
      key: "B",
      width: 80,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Checkbox
          checked={record.B}
          onChange={(e) =>
            handleCheckboxChange(record.key, "B", e.target.checked)
          }
        />
      ),
    },
    {
      title: "BC(大)",
      key: "BC",
      width: 80,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Checkbox
          checked={record.BC}
          onChange={(e) =>
            handleCheckboxChange(record.key, "BC", e.target.checked)
          }
        />
      ),
    },
    {
      title: "C(特大)",
      key: "C",
      width: 80,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Checkbox
          checked={record.C}
          onChange={(e) =>
            handleCheckboxChange(record.key, "C", e.target.checked)
          }
        />
      ),
    },
  ];

  const [api, contextHolder] = notification.useNotification();
  const onFinish = () => {
    updateStatusAssessed(true);
    api.success({
      message: "成功",
      description: "データが正常に保存されました",
    });
    // setTimeout(() => {
    //   navigate("/");
    // }, 700);
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "総合ランクの評価基準",
      children: (
        <Table
          columns={overallRankingColumns}
          dataSource={overallRankingData}
          pagination={false}
          size="small"
          bordered
        />
      ),
    },
    {
      key: "2",
      label: "状態ランクの評価基準",
      children: (
        <Table
          columns={conditionRankingColumns}
          dataSource={conditionRankingData}
          pagination={false}
          size="small"
          bordered
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {contextHolder}
      <Collapse ghost items={items} />
      {/* 状態異常・ダメージなしの総合ランク */}
      <div style={{ marginTop: 10 }}>
        <Title level={5} style={{ marginBottom: 16 }}>
          状態異常・ダメージなしの総合ランク
        </Title>

        {/* ランクチェックボックス */}
        <div style={{ marginBottom: 24 }}>
          <Space size="large">
            <Checkbox defaultChecked={Math.random() > 0.5}>Nランク</Checkbox>
            <Checkbox defaultChecked={Math.random() > 0.5}>Sランク</Checkbox>
            <Checkbox defaultChecked={Math.random() > 0.5}>SAランク</Checkbox>
          </Space>
        </div>

        <Row gutter={24} style={{ marginBottom: 24 }}>
          <Col xxl={12} span={24}>
            <Title level={5} style={{ marginBottom: 5 }}>
              状態異常チェック
            </Title>
            <div className="small-table-container">
              <Table
                className="conditionAnomalyTable"
                columns={conditionAnomalyColumns}
                dataSource={conditionAnomalyData}
                pagination={false}
                size="small"
                bordered
              />
            </div>
          </Col>
          <Col xxl={0} span={24}>
            <div style={{ margin: "30px 0" }} />
          </Col>
          <Col xxl={12} span={24}>
            <Title level={5} style={{ marginBottom: 5 }}>
              大分類状態ランクチェック
            </Title>
            <div className="small-table-container">
              <Table
                className="partsRankingTable"
                columns={partsRankingColumns}
                dataSource={partsRankingData}
                pagination={false}
                size="small"
                bordered
              />
            </div>
          </Col>
        </Row>

        {/* フッター情報 */}
        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col span={6}>
            <Form.Item label="状態ランク点数">
              <InputNumber
                value={28}
                disabled
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  background: "rgba(0, 0, 0, 0.04)",
                  lineHeight: "40px",
                  color: "rgba(0, 0, 0, 0.25)",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="総合ランク判定">
              <Input
                value="BC"
                disabled
                style={{ width: "100%", padding: "4px 11px" }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="総合ランク（手修正）">
              <Select
                placeholder="Select"
                style={{
                  width: "100%",
                  height: "40px",
                }}
                defaultValue="Ａ"
                options={[
                  { label: "Ｎ", value: "Ｎ" },
                  { label: "Ｓ", value: "Ｓ" },
                  { label: "ＳＡ", value: "ＳＡ" },
                  { label: "Ａ", value: "Ａ" },
                  { label: "ＡＢ", value: "ＡＢ" },
                  { label: "Ｂ", value: "Ｂ" },
                  { label: "ＢＣ", value: "ＢＣ" },
                  { label: "Ｃ", value: "Ｃ" },
                  { label: "Ｊ", value: "Ｊ" },
                  { label: "良好", value: "良好" },
                  { label: "ネームあり", value: "ネームあり" },
                  { label: "シミあり", value: "シミあり" },
                  { label: "ヤブレ", value: "ヤブレ" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StateDefinition;
