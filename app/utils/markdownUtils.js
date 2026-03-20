export function stripMarkdown(text) {
  return text
    .replace(/#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/^\s*[-*+]\s/gm, '• ')
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1')
    .replace(/>\s?(.*)/gm, '$1')
    .replace(/---/g, '────────────────')
    .trim();
}

export function printMarkdown(title, subtitle, content, footer) {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} — Firm Law AI</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 14px; line-height: 1.9; margin: 48px; color: #000; }
          h1.doc-title { font-size: 22px; text-align: center; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px; }
          .subtitle { text-align: center; font-size: 12px; color: #555; margin-bottom: 8px; }
          .meta { text-align: center; font-size: 12px; color: #555; margin-bottom: 32px; border-bottom: 1px solid #ccc; padding-bottom: 16px; }
          h1 { font-size: 18px; margin-top: 24px; margin-bottom: 8px; }
          h2 { font-size: 16px; margin-top: 20px; margin-bottom: 6px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
          h3 { font-size: 14px; margin-top: 16px; margin-bottom: 4px; }
          p { margin: 8px 0; }
          ul, ol { padding-left: 24px; margin: 8px 0; }
          li { margin: 4px 0; }
          strong { font-weight: 700; }
          em { font-style: italic; }
          blockquote { border-left: 3px solid #999; padding-left: 16px; margin: 12px 0; color: #555; font-style: italic; }
          code { background: #f5f5f5; border: 1px solid #ddd; border-radius: 3px; padding: 1px 5px; font-family: monospace; font-size: 13px; }
          hr { border: none; border-top: 1px solid #ccc; margin: 20px 0; }
          .footer { margin-top: 48px; font-size: 11px; color: #888; border-top: 1px solid #ccc; padding-top: 12px; text-align: center; }
          @media print { .no-print { display: none; } body { margin: 32px; } }
        </style>
      </head>
      <body>
        <h1 class="doc-title">${title}</h1>
        <div class="subtitle">Firm Law AI — Indian Legal Assistant</div>
        <div class="meta">${subtitle} &nbsp;|&nbsp; ${new Date().toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
        <div id="content"></div>
        <div class="footer">${footer}</div>
        <div class="no-print" style="margin-top:20px; text-align:center;">
          <button onclick="window.print()" style="padding:10px 24px; background:#c9a84c; border:none; border-radius:6px; font-size:14px; cursor:pointer; font-weight:600;">🖨️ Print / Save as PDF</button>
        </div>
        <script>
          const raw = ${JSON.stringify(content)};
          const html = raw
            .replace(/^#{6}\\s+(.+)$/gm, '<h6>$1</h6>')
            .replace(/^#{5}\\s+(.+)$/gm, '<h5>$1</h5>')
            .replace(/^#{4}\\s+(.+)$/gm, '<h4>$1</h4>')
            .replace(/^#{3}\\s+(.+)$/gm, '<h3>$1</h3>')
            .replace(/^#{2}\\s+(.+)$/gm, '<h2>$1</h2>')
            .replace(/^#{1}\\s+(.+)$/gm, '<h1>$1</h1>')
            .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
            .replace(/\\*(.*?)\\*/g, '<em>$1</em>')
            .replace(/^[-*+]\\s+(.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\\/li>\\n?)+/g, '<ul>$&</ul>')
            .replace(/^\\d+\\.\\s+(.+)$/gm, '<li>$1</li>')
            .replace(/---/g, '<hr/>')
            .replace(/\\n\\n/g, '</p><p>')
            .replace(/\\n/g, '<br/>');
          document.getElementById('content').innerHTML = '<p>' + html + '</p>';
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
}