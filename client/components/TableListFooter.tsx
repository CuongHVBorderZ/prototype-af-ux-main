import { FilterOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Flex,
  MenuProps,
  Row,
  Space,
  Statistic,
  theme,
} from "antd";
import React from "react";
import { FilterDropdown } from "./FiterDropdown";
import { Title } from "@radix-ui/react-alert-dialog";
const { useToken } = theme;
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Checkbox>時計</Checkbox>,
  },
  {
    key: "2",
    label: <Checkbox>バッグ</Checkbox>,
  },
  {
    key: "3",
    label: <Checkbox>アパレル</Checkbox>,
  },
];
// eslint-disable-next-line react/prop-types
const TableListFooter = (statisticValues) => {
  const { token } = useToken();
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
  };
  return (
    <>
      <div style={{ marginBottom: "20px", fontSize: "22px" }}>
        <span style={{ marginRight: "10px" }}>査定結果</span>
        <FilterDropdown></FilterDropdown>
      </div>
      <Flex justify="space-between">
        <Statistic title="総見込売価" value={statisticValues.a} prefix="¥" />
        <Statistic
          title="成立した見込売価"
          value={statisticValues.b}
          prefix="¥"
        />
        <Statistic title="仕入高" value={statisticValues.c} prefix="¥" />
        <Statistic title="見込粗利高" value={statisticValues.d} prefix="¥" />
        <Statistic title="見込粗利率" value={statisticValues.e} prefix="¥" />
        <Statistic title="成約率" value={statisticValues.f} suffix="%" />
      </Flex>
    </>
  );
};

export default TableListFooter;
