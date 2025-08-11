import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";

interface EditableCellProps {
  editing: boolean;
  dataIndex?: string;
  record?: any;
  children: React.ReactNode;
  onSave: (key: string, dataIndex: string, value: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  record,
  children,
  onSave,
}) => {
  const [value, setValue] = useState(record?.[dataIndex!] ?? "");
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  if (editing) {
    return (
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={() => onSave(record.key, dataIndex!, value)}
        onBlur={() => onSave(record.key, dataIndex!, value)}
      />
    );
  }

  return <>{children}</>;
};

export default EditableCell;
