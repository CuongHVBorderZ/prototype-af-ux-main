import { Drawer } from "antd";
import ItemForm from "./ItemForm";
import React from "react";

// eslint-disable-next-line react/prop-types
const DrawerSearchItems = () => {
  return (
    <Drawer
      title="査定PF商品詳細情報登録 <商談ID:5699>"
      onClose={onClose}
      open={open}
      zIndex={1030}
      width="50%"
    >
      <ItemForm />
    </Drawer>
  );
};

export default DrawerSearchItems;
