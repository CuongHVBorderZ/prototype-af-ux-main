import { FilterOutlined } from "@ant-design/icons";
import { Col, Drawer, Row, Statistic } from "antd";
import React from "react";

// eslint-disable-next-line react/prop-types
const TableListFooter = () => {
  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <span>
          査定結果 <FilterOutlined></FilterOutlined>{" "}
        </span>
      </div>
      <Row gutter={16}>
        <Col span={4}>
          <Statistic title="総見込売価" value={"¥1,200,000"} />
        </Col>
        <Col span={4}>
          <Statistic title="成立した見込売価" value={"¥1,200,000"} />
        </Col>
        <Col span={4}>
          <Statistic title="仕入高" value={"¥1,200,000"} />
        </Col>
        <Col span={4}>
          <Statistic title="見込粗利高" value={"¥1,200,000"} />
        </Col>
        <Col span={4}>
          <Statistic title="見込粗利率" value={"20.00%"} />
        </Col>
        <Col span={4}>
          <Statistic title="成約率" value={"83.33%"} />
        </Col>
      </Row>
    </>
  );
};

export default TableListFooter;
