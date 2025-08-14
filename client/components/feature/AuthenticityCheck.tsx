import React from "react";
import {
  Typography,
  Checkbox,
  Select,
  Row,
  Col,
  Button,
  Card,
  Image,
} from "antd";

const { Title, Text } = Typography;

type AuthenticityCheckProps = {
  cancel: () => void;
  save: (data?: any) => void;
};

// eslint-disable-next-line react/prop-types
const AuthenticityCheck: React.FC<AuthenticityCheckProps> = ({
  cancel,
  save,
}) => {
  return (
    <div style={{ padding: "20px" }}>
      <div>
        {/* Check Item 1 */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <Text
              style={{
                color: "#666",
                fontSize: "14px",
                fontFamily: "Source Sans Pro",
              }}
            >
              チェックリスト1
            </Text>
            <Title
              level={5}
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 600,
                color: "rgba(0, 0, 0, 0.88)",
                fontFamily: "Source Sans Pro",
              }}
            >
              バックル ROLEXSA ドット
            </Title>
          </div>

          <Row gutter={24}>
            <Col span={12} style={{ display: "flex" }}>
              <Card
                style={{
                  border: "1px solid #52C41A",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Title
                    level={5}
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 600,
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    正規品
                  </Title>
                </div>
                <div
                  style={{
                    height: "200px",
                  }}
                >
                  <Image
                    src="https://res.cloudinary.com/wc-photo/image/upload/v1698408531/cms/Authenticity_Guarantee/4_Bezel_Inspection_fe6242847d.jpg"
                    width="100%"
                    height="200px"
                    style={{
                      objectFit: "contain",
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                </div>
                <div
                  style={{
                    borderTop: "1px solid #CCC",
                    paddingTop: "16px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    ・Oの下、EXの下、Sの後、Aの後それぞれ4点あるか確認する
                    <br />
                    ・Oの下のドットが、EXの下のドットよりも高い位置にあるか確認する
                    <br />
                    ・「A」の上部分が平たく切ったような形状
                  </Text>
                </div>
              </Card>
            </Col>
            <Col span={12} style={{ display: "flex" }}>
              <Card
                style={{
                  border: "1px solid #F5222D",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Title
                    level={5}
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 600,
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    コピー品
                  </Title>
                </div>
                <div
                  style={{
                    height: "200px",
                  }}
                >
                  <Image
                    src="https://res.cloudinary.com/wc-photo/image/upload/v1698408531/cms/Authenticity_Guarantee/4_Bezel_Inspection_fe6242847d.jpg"
                    width="100%"
                    height="200px"
                    style={{
                      objectFit: "contain",
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                </div>
                <div
                  style={{
                    borderTop: "1px solid #CCC",
                    paddingTop: "16px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    ・「S」の上半分が大きく開いており、下半分が潰れている
                    <br />
                    ・「A」の上がとんがっており、形状が違う
                    <br />
                    ・ROLEXSAのフォントが汚く、上と下の高さも揃ってない
                    <br />
                    ・ドットは4つあるが、正規品と比べて位置がバラバラ。
                    <br />
                    ・楕円形状の枠　右下に歪みがある
                    <br />
                    ・ドットがない
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Check Item 2 */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <Text
              style={{
                color: "#666",
                fontSize: "14px",
                fontFamily: "Source Sans Pro",
              }}
            >
              チェックリスト2
            </Text>
            <Title
              level={5}
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 600,
                color: "rgba(0, 0, 0, 0.88)",
                fontFamily: "Source Sans Pro",
              }}
            >
              バックル ROLEX刻印
            </Title>
          </div>

          <Row gutter={24}>
            <Col span={12} style={{ display: "flex" }}>
              <Card
                style={{
                  border: "1px solid #52C41A",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Title
                    level={5}
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 600,
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    正規品--111
                  </Title>
                </div>
                <div
                  style={{
                    height: "200px",
                  }}
                >
                  <Image
                    src="https://res.cloudinary.com/wc-photo/image/upload/v1698408531/cms/Authenticity_Guarantee/4_Bezel_Inspection_fe6242847d.jpg"
                    width="100%"
                    height="200px"
                    style={{
                      objectFit: "contain",
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                </div>
                <div
                  style={{
                    borderTop: "1px solid #CCC",
                    paddingTop: "16px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    ・Oの下、EXの下、Sの後、Aの後それぞれ4点あるか確認する
                    <br />
                    ・Oの下のドットが、EXの下のドットよりも高い位置にあるか確認する
                    <br />
                    ・「A」の上部分が平たく切ったような形状
                  </Text>
                </div>
              </Card>
            </Col>
            <Col span={12} style={{ display: "flex" }}>
              <Card
                style={{
                  border: "1px solid #F5222D",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Title
                    level={5}
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 600,
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    コピー品
                  </Title>
                </div>
                <div
                  style={{
                    height: "200px",
                  }}
                >
                  <Image
                    src="https://res.cloudinary.com/wc-photo/image/upload/v1698408531/cms/Authenticity_Guarantee/4_Bezel_Inspection_fe6242847d.jpg"
                    width="100%"
                    height="200px"
                    style={{
                      objectFit: "contain",
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                </div>
                <div
                  style={{
                    borderTop: "1px solid #CCC",
                    paddingTop: "16px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontFamily: "Source Sans Pro",
                    }}
                  >
                    ・「S」の上半分が大きく開いており、下半分が潰れている
                    <br />
                    ・「A」の上がとんがっており、形状が違う
                    <br />
                    ・ROLEXSAのフォントが汚く、上と下の高さも揃ってない
                    <br />
                    ・ドットは4つあるが、正規品と比べて位置がバラバラ。
                    <br />
                    ・楕円形状の枠　右下に歪みがある
                    <br />
                    ・ドットがない
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          height: "88px",
          borderTop: "1px solid #CCC",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 0px",
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Button
            style={{ width: "150px", display: "none" }}
            onClick={() => {
              cancel();
            }}
          >
            クリア
          </Button>
          <Button
            style={{ width: "150px" }}
            type="primary"
            onClick={() => {
              save();
            }}
          >
            真贋判定を確定
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Checkbox />
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle
                cx="7.5"
                cy="7.5"
                r="6.25"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Checkbox />
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M6.46126 2.94449L1.16751 11.782C1.05837 11.971 1.00062 12.1853 1 12.4036C0.999394 12.6218 1.05594 12.8364 1.16403 13.0261C1.27211 13.2157 1.42797 13.3737 1.61608 13.4844C1.80419 13.5951 2.01801 13.6546 2.23626 13.657H12.8238C13.042 13.6546 13.2558 13.5951 13.4439 13.4844C13.6321 13.3737 13.7879 13.2157 13.896 13.0261C14.0041 12.8364 14.0606 12.6218 14.06 12.4036C14.0594 12.1853 14.0017 11.971 13.8925 11.782L8.59876 2.94449C8.48734 2.7608 8.33046 2.60894 8.14326 2.50354C7.95606 2.39814 7.74485 2.34277 7.53001 2.34277C7.31518 2.34277 7.10397 2.39814 6.91676 2.50354C6.72956 2.60894 6.57268 2.7608 6.46126 2.94449Z"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Checkbox />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13.5 4.5L4.5 13.5" stroke="black" strokeWidth="2" />
              <path d="M4.5 4.5L13.5 13.5" stroke="black" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Button
            disabled
            size="small"
            style={{ borderRadius: "0", border: "none", background: "none" }}
          >
            前へ
          </Button>
          <Button
            size="small"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "0",
              border: "1px solid #1677ff",
              background: "none",
              color: "#1677ff",
            }}
          >
            1
          </Button>
          <Button
            size="small"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "0",
              //   border: 'none',
            }}
          >
            2
          </Button>
          <Button
            size="small"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "0",
            }}
          >
            3
          </Button>
          <Button
            size="small"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "0",
            }}
          >
            4
          </Button>
          <Button size="small" type="link" style={{ borderRadius: "0" }}>
            次へ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticityCheck;
