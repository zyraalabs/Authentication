import { Section, Text } from "@react-email/components";

interface CodeLine {
  prompt?: boolean;
  success?: boolean;
  brand?: boolean;
  text: string;
  dim?: string;
}

interface EmailCodeBlockProps {
  lines: CodeLine[];
  label?: string;
}

const mono = "'Courier New', monospace";

export function EmailCodeBlock({
  lines,
  label = "zsh · ~/projects",
}: EmailCodeBlockProps) {
  return (
    <Section
      style={{
        backgroundColor: "#0D0D10",
        border: "1px solid #1E1E25",
        borderRadius: "10px",
        overflow: "hidden",
        margin: "20px 0",
      }}
    >
      <Section
        style={{
          backgroundColor: "#131318",
          borderBottom: "1px solid #1E1E25",
          padding: "8px 14px",
        }}
      >
        <Text style={{ margin: 0, lineHeight: "1" }}>
          <span
            style={{
              display: "inline-block",
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              backgroundColor: "#FF5F57",
              marginRight: "5px",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              backgroundColor: "#FFBD2E",
              marginRight: "5px",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              backgroundColor: "#28CA41",
              marginRight: "10px",
            }}
          />
          <span
            style={{ fontFamily: mono, fontSize: "10px", color: "#5A5850" }}
          >
            {label}
          </span>
        </Text>
      </Section>

      <Section style={{ padding: "10px 14px 0" }}>
        <Text
          style={{
            margin: "0 0 10px",
            border: "1px solid #D97218",
            borderRadius: "6px",
            padding: "5px 10px",
            fontFamily: mono,
            fontSize: "11px",
            lineHeight: "1.6",
          }}
        >
          <span style={{ color: "#F0922A", fontWeight: "700" }}>
            Z&nbsp;&nbsp;Zyraa
          </span>
          <span style={{ color: "#6B6760" }}>
            {" "}
            · AI-powered full-stack builder
          </span>
          <span style={{ color: "#6B6760", float: "right" }}>v0.1.0</span>
        </Text>
      </Section>

      <Section style={{ padding: "0 14px 10px" }}>
        {lines.map((line, i) => (
          <Text
            key={i}
            style={{
              fontFamily: mono,
              fontSize: "12px",
              lineHeight: "1.9",
              margin: "0",
              color: "#F2F0EC",
            }}
          >
            {line.prompt && (
              <span style={{ color: "#D97218", fontWeight: "700" }}>$ </span>
            )}
            {line.success && (
              <span style={{ color: "#34B85F", fontWeight: "700" }}>✓ </span>
            )}
            {line.brand && (
              <span style={{ color: "#F0922A", fontWeight: "700" }}>○ </span>
            )}
            <span style={{ fontWeight: line.prompt ? "600" : "400" }}>
              {line.text}
            </span>
            {line.dim && <span style={{ color: "#6B6760" }}> {line.dim}</span>}
          </Text>
        ))}
      </Section>

      <Section style={{ padding: "0 14px 12px" }}>
        <Text
          style={{
            margin: "6px 0 0",
            border: "1px solid #1E1E25",
            borderRadius: "6px",
            padding: "6px 10px",
            fontFamily: mono,
            fontSize: "12px",
            lineHeight: "1.6",
            color: "#5A5850",
          }}
        >
          <span style={{ color: "#D97218", fontWeight: "700" }}>❯ </span>
          describe your next change
          <span style={{ color: "#D97218" }}> ▌</span>
        </Text>
      </Section>
    </Section>
  );
}
