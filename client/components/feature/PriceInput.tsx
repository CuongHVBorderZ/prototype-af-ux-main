import { useState } from "react";
import { InputNumber } from "antd";

interface FormattedInputNumberProps {
    value?: number;
    onChange?: (value: number | null) => void;
    prefix?: string;
    style?: React.CSSProperties;
    placeholder?: string;
}

export default function PriceInput({
    value,
    onChange,
    prefix = "￥",
    style,
    placeholder
}: FormattedInputNumberProps) {
    const [formatterEnabled, setFormatterEnabled] = useState(true);

    return (
        <InputNumber
            value={value}
            onChange={onChange}
            controls={false}
            prefix={prefix}
            style={{ width: "100%", ...style }}
            placeholder={placeholder}
            formatter={(val) =>
                formatterEnabled
                    ? val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : val?.toString()
            }
            parser={(val) => {
                const parsed = val?.replace(/,/g, "");
                return parsed ? Number(parsed) : undefined;
            }}
            onFocus={() => setFormatterEnabled(false)}
            onBlur={() => setFormatterEnabled(true)}
        />
    );
}
