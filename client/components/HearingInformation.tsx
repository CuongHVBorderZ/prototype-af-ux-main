import { Select, Form, Modal } from "antd";

const HearingInformation = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const { Item } = Form;

  const options = [
    { label: "YES", value: "YES" },
    { label: "NO", value: "NO" },
    { label: "不明", value: "不明" },
  ];

  const hideModal = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      onOk={hideModal}
      onCancel={hideModal}
      title="ヒアリング項目"
      okText="確認"
      cancelText="キャンセル"
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
    >
      <Form form={form} layout="vertical">
        <Item label="今後使わないか？" name="usage">
          <Select placeholder="選択してください" options={options} allowClear />
        </Item>
        <Item label="商品はいただきものか？" name="gift">
          <Select placeholder="選択してください" options={options} allowClear />
        </Item>
        <Item label="商品は最近使用していないか？" name="unused">
          <Select placeholder="選択してください" options={options} allowClear />
        </Item>
        <Item label="事前査定は無いか？" name="pre_assessment">
          <Select placeholder="選択してください" options={options} allowClear />
        </Item>
        <Item label="他社とのアイミツがあるか？" name="competition">
          <Select placeholder="選択してください" options={options} allowClear />
        </Item>
      </Form>
    </Modal>
  );
};

export default HearingInformation;
