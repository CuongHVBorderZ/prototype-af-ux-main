import { Button, Modal } from "antd";
import React, { useState, useRef, useEffect } from "react";

const SaleInstruction = ({ open, setOpen }) => {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = () => {
    const el = contentRef.current;
    if (!el) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
      setScrolledToBottom(true);
    }
  };

  useEffect(() => {
    if (!open) {
      setScrolledToBottom(false);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    } else {
      setScrolledToBottom(false);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  }, [open]);

  return (
    <>
      <Modal
        title="長いコンテンツのモーダル"
        open={open}
        onCancel={() => {
          contentRef.current.scrollTop = 0;
          setScrolledToBottom(false);
          setOpen(false);
        }}
        footer={
          scrolledToBottom ? (
            <Button type="primary" onClick={() => setOpen(false)}>
              確認
            </Button>
          ) : null
        }
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <div
          ref={contentRef}
          onScroll={handleScroll}
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            paddingRight: 12,
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
          }}
        >
          {/* Nội dung dài như trước */}
          これは
          <span style={{ color: "#e63946", fontWeight: "bold" }}>
            ダミーテキスト
          </span>
          です。日本語の文章がここに入ります。意味は特にありませんが、
          <span style={{ color: "#457b9d", fontStyle: "italic" }}>
            デザインの見た目
          </span>
          を確認するために使われます。文字の配置やレイアウトをチェックするのに便利です。多くのプロジェクトで、
          <span style={{ color: "#ffb703" }}>初期段階</span>
          の設計や試作に役立っています。たとえば、ウェブサイトのレイアウト、モバイルアプリのUI設計、印刷物のデザインなど、多岐にわたる分野で使用されています。
          <br />
          <br />
          新しいプロジェクトを始める際に、このようなテキストを使ってレイアウトのバランスを調整しましょう。適切な文字数や
          <span style={{ color: "#219ebc" }}>行間の確認</span>
          にも役立ちます。デザイナーや開発者は、
          <span style={{ color: "#1d3557" }}>コンテンツが完成する前</span>
          に全体の印象を掴むために、こうしたダミーテキストを多用しています。加えて、配色やフォントの選択、アクセシビリティのチェックなどにも役立ちます。
          <br />
          <br />
          また、実際のコンテンツがまだ用意できていない場合でも、この
          <span style={{ color: "#8ecae6", fontWeight: "bold" }}>
            ダミーテキスト
          </span>
          を使えば、完成イメージを共有しやすくなります。特に、クライアントとの打ち合わせやプレゼンテーションの際に、デザインの方向性を明確に示すために効果的です。さらに、このテキストは多言語対応の練習としても利用されています。
          <br />
          <br />
          テキストの長さや構成を調整することで、様々なレイアウトやフォントサイズに対応できます。さらに、色やスタイルを部分的に変えることで、重要な部分を強調したり、視覚的なアクセントをつけることも可能です。
          <span style={{ color: "#ffb703" }}>このような工夫</span>
          が、ユーザー体験の向上にもつながります。ユーザーの注意を引くためのポイントとしても有効です。
          <br />
          <br />
          最終的に、プロジェクトの成功には
          <strong>適切なコミュニケーション</strong>と<strong>緻密な設計</strong>
          が不可欠です。ダミーテキストはその一助として、デザインと開発の橋渡し役を果たしています。ぜひ積極的に活用してください。将来的には、AIを活用したダミーテキストの自動生成技術も進化していくでしょう。
          <br />
          <br />
          デザインのプロセスでは、繰り返しのフィードバックと改善が重要です。ダミーテキストを用いることで、早期に視覚的な問題点を発見し、修正することができます。また、異なるデバイスやブラウザでの表示確認にも役立ちます。これにより、最終的な製品の品質を高めることが可能です。
          <br />
          <br />
          コンテンツが完成してからデザインを始めるのではなく、先に視覚的な構造を作ることで効率的な開発が可能になります。ダミーテキストは、この段階での重要なツールとなります。ユーザーインターフェースの設計においても、テキストの長さや配置はユーザー体験に直結しますので、十分な検討が必要です。
          <br />
          <br />
          最後に、デザインの多様性を追求するために、さまざまなスタイルやフォントを試すことも推奨されます。ダミーテキストを活用しながら、色彩理論やタイポグラフィの原則を取り入れることで、より魅力的で効果的なデザインが実現できます。これらの要素が統合されることで、プロジェクトの成功に大きく寄与します。
        </div>
      </Modal>
    </>
  );
};

export default SaleInstruction;
