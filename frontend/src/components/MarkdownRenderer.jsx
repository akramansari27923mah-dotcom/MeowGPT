// src/components/MarkdownRenderer.jsx
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, className, children }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <CodeBlock
              language={match[1]}
              value={String(children).replace(/\n$/, "")}
            />
          ) : (
            <code className="bg-black/40 px-1 rounded text-green-300 font-mono">
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-3 rounded-xl overflow-hidden border border-white/10">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-black/60 text-xs text-gray-300">
        <span className="uppercase tracking-wide">{language}</span>
        <button
          onClick={copyToClipboard}
          className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        wrapLines
        customStyle={{
          margin: 0,
          background: "rgba(0,0,0,0.6)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "13.5px",
          lineHeight: "1.6",
          padding: "14px",
        }}
        lineNumberStyle={{ color: "#6b7280", marginRight: "12px" }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}