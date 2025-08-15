import { Divider, Drawer } from "antd";
import React, { useState } from "react";
import ModalAuthenticityCheck from "./ModalAuthenticityCheck";
import HeaderPNItemEdit from "./HeaderPNItemEdit";

// eslint-disable-next-line react/prop-types
const DrawerCheckAuthentication = ({ isOpen, onClose, onSave }) => {
  const [editableStr, setEditableStr] = useState("エクスプローラー36 124270");
  const [category, setCategory] = useState(["parent1", "parent10", "leaf1"]);
  return (
    <Drawer
      open={isOpen}
      // closable={false}
      onClose={() => onClose()}
      zIndex={1030}
      width="100%"
      title="VD真贋チェック"
    >
      {/* <HeaderPNItemEdit
        category={category}
        onCategoryChange={undefined}
        onOpenSearchDrawer={undefined}
        editableStr={editableStr}
        setEditableStr={setEditableStr}
      ></HeaderPNItemEdit> */}
      {/* <Divider /> */}
      <ModalAuthenticityCheck
        cancel={() => {
          onClose();
        }}
        save={() => {
          onSave();
        }}
      ></ModalAuthenticityCheck>
    </Drawer>
  );
};

export default DrawerCheckAuthentication;
