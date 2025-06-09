import jsPDF from "jspdf";

export function generatePDF(report, fileName = `PhishGuard_Report_${report.id}.pdf`) {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 40;
  const marginTop = 60;
  const contentWidth = pageWidth - marginX * 2;
  const lineHeight = 18;
  let y = 100;

  const logo = new window.Image();
  logo.src = "/logo.png";

  // Helper: Check if there's enough space, add page if not
  function checkPageSpace(currentY, neededSpace) {
    if (currentY + neededSpace > pageHeight - 60) {
      doc.addPage();
      return marginTop;
    }
    return currentY;
  }

  // Helper: Truncate array to fit remaining space on the page
  function fitArrayToPage(arr, y, itemHeight, extraSpace = 0) {
    const available = pageHeight - 60 - y - extraSpace;
    const maxItems = Math.floor(available / itemHeight);
    if (arr.length > maxItems) {
      return {
        visible: arr.slice(0, maxItems - 1),
        truncated: true,
        remaining: arr.length - (maxItems - 1),
      };
    }
    return { visible: arr, truncated: false, remaining: 0 };
  }

  // Helper: Remove emojis and most non-ASCII symbols for PDF compatibility
  function cleanTextForPDF(text) {
    // Remove emojis and most non-ASCII symbols for PDF compatibility
    return String(text)
      .replace(
        /[\u{1F600}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}\u2122]/gu,
        ""
      )
      .replace(/[^\x00-\x7F]/g, ""); // Remove any remaining non-ASCII
  }

  // Helper: Split long field values into multiple lines
  function splitLongField(label, value, maxWidth, doc) {
    if (!value) return [[label, ""]];
    const labelWidth = doc.getTextWidth(label) + 8;
    const availableWidth = maxWidth - labelWidth - 16;
    // Clean value for PDF (remove emojis and non-ASCII)
    const cleanValue = cleanTextForPDF(value);
    const lines = doc.splitTextToSize(cleanValue, availableWidth);
    return lines.map((line, idx) =>
      idx === 0
        ? [label, line]
        : ["", line]
    );
  }

  logo.onload = () => {
    // HEADER
    doc.setFillColor("#333652");
    doc.rect(0, 0, pageWidth, 80, "F");
    doc.addImage(logo, "PNG", marginX, 15, 50, 50);
    doc.setFontSize(24).setFont("helvetica", "bold").setTextColor("#fff");
    doc.text("PhishGuard AI", marginX + 70, 38);
    doc.setFontSize(14).setFont("helvetica", "normal");
    doc.text("Email Analysis Report", marginX + 70, 62);

    // FOOTER
    doc.setFillColor("#e7a92f");
    doc.rect(0, pageHeight - 40, pageWidth, 40, "F");
    doc.setFontSize(10).setTextColor("#333652");
    doc.text("© PhishGuard AI 2025 | All Rights Reserved", marginX, pageHeight - 18);

    y = checkPageSpace(y, 10);
    drawDivider(doc, y, pageWidth, marginX);
    y += 20;

    // METADATA Section Heading
    y = checkPageSpace(y, lineHeight);
    doc.setFontSize(14).setFont("helvetica", "bold").setTextColor("#0f61a5");
    doc.text("METADATA", marginX, y);
    y += lineHeight;

    // Sanitize the title before splitting for PDF
    const sanitizedTitle = cleanTextForPDF(report.title);

    const metadata = [
      ["Report ID:", report.id],
      ["Date Analysed:", new Date(report.date).toLocaleString()],
      ...splitLongField("Email Title:", sanitizedTitle, contentWidth, doc),
      ["Sender:", report.sender],
    ];

    doc.setFontSize(12).setTextColor("#333652");
    metadata.forEach(([key, value]) => {
      y = checkPageSpace(y, lineHeight);
      doc.setFont("helvetica", "bold");
      doc.text(key, marginX, y);
      const keyWidth = doc.getTextWidth(key);
      doc.setFont("helvetica", "normal");
      doc.text(String(value), marginX + keyWidth + 8, y);
      y += lineHeight;
    });

    y = checkPageSpace(y, 6);
    y += 6;
    drawDivider(doc, y, pageWidth, marginX);
    y = checkPageSpace(y, 18);
    y += 18;

    // ANALYSIS RESULT Heading
    y = checkPageSpace(y, lineHeight);
    doc.setFontSize(14).setFont("helvetica", "bold").setTextColor("#0f61a5");
    doc.text("ANALYSIS RESULT", marginX, y);
    y += lineHeight;

    // Prediction
    y = checkPageSpace(y, lineHeight);
    const predictionColor = report.isPhishing ? "#d32f2f" : "#388e3c";
    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor("#000");
    doc.text("Prediction:", marginX, y);
    const predKeyWidth = doc.getTextWidth("Prediction: ");
    doc.setFont("helvetica", "normal").setTextColor(predictionColor);
    doc.text(report.isPhishing ? "Phishing Email" : "Legitimate Email", marginX + predKeyWidth + 8, y);
    y += lineHeight;

    // Risk Score
    y = checkPageSpace(y, lineHeight);
    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor("#000");
    doc.text("Risk Score:", marginX, y);
    const riskKeyWidth = doc.getTextWidth("Risk Score: ");
    doc.setFont("helvetica", "normal").setTextColor(predictionColor);
    doc.text(`${report.riskScore}% (${report.riskLevel})`, marginX + riskKeyWidth + 8, y);
    y += lineHeight;

    // Recommendation
    y = checkPageSpace(y, lineHeight + 10);
    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor("#333652");
    doc.text("Recommendation:", marginX, y);
    y += 16;

    // Recommendation list
    let recommendations = [];
    if (Array.isArray(report.suggestion)) {
      recommendations = report.suggestion;
    } else if (typeof report.suggestion === "string") {
      recommendations = report.suggestion.split(/\n|;/).map(s => s.trim()).filter(Boolean);
    }

    if (recommendations.length > 0) {
      const recFit = fitArrayToPage(recommendations, y, 14, 120);
      doc.setFont("helvetica", "normal").setFontSize(11).setTextColor("#333652");
      recFit.visible.forEach(rec => {
        y = checkPageSpace(y, 14);
        doc.text("• " + rec, marginX + 12, y);
        y += 14;
      });
      if (recFit.truncated) {
        y = checkPageSpace(y, 14);
        doc.text(`...and ${recFit.remaining} more`, marginX + 12, y);
        y += 14;
      }
    } else {
      y = checkPageSpace(y, 14);
      doc.setFont("helvetica", "normal").setFontSize(11).setTextColor("#333652");
      doc.text("None", marginX + 12, y);
      y += 14;
    }

    y = checkPageSpace(y, 10);
    y += 10;
    drawDivider(doc, y, pageWidth, marginX);
    y = checkPageSpace(y, 20);
    y += 20;

    // DETECTED FEATURES Heading
    y = checkPageSpace(y, lineHeight);
    doc.setFontSize(14).setFont("helvetica", "bold").setTextColor("#0f61a5");
    doc.text("DETECTED FEATURES", marginX, y);
    y += lineHeight;

    // URLs
    y = checkPageSpace(y, lineHeight);
    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor("#333652");
    doc.text("URLs:", marginX, y);
    y += 20;

    if (report.urls?.length) {
      const urlFit = fitArrayToPage(report.urls, y, 18, 80);
      doc.setFont("helvetica", "normal").setFontSize(11).setTextColor("#000");
      urlFit.visible.forEach(url => {
        const urlLines = doc.splitTextToSize(url, contentWidth - 40);
        urlLines.forEach((line, idx) => {
          y = checkPageSpace(y, 14);
          const bullet = idx === 0 ? "• " : "  ";
          doc.text(bullet + line, marginX + 24, y);
          y += 14;
        });
        y += 4;
      });
      if (urlFit.truncated) {
        y = checkPageSpace(y, 14);
        doc.text(`...and ${urlFit.remaining} more`, marginX + 24, y);
        y += 14;
      }
    } else {
      y = checkPageSpace(y, lineHeight);
      doc.setFont("helvetica", "normal").setFontSize(11).setTextColor("#888");
      doc.text("None", marginX + 24, y);
      y += lineHeight;
    }

    // Flagged Keywords (extracted from limeExplanation)
    const flaggedKeywords = Array.isArray(report.limeExplanation)
      ? report.limeExplanation.map(([keyword]) => cleanTextForPDF(keyword))
      : [];

    y = checkPageSpace(y, lineHeight);
    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor("#333652");
    doc.text("Flagged Keywords:", marginX, y);
    y += 20;

    if (flaggedKeywords.length) {
      const kwFit = fitArrayToPage(flaggedKeywords, y, 14, 40);
      doc.setFont("helvetica", "normal").setFontSize(11).setTextColor("#000");
      kwFit.visible.forEach(keyword => {
        y = checkPageSpace(y, 14);
        doc.text("• " + keyword, marginX + 24, y);
        y += 14;
      });
      if (kwFit.truncated) {
        y = checkPageSpace(y, 14);
        doc.text(`...and ${kwFit.remaining} more`, marginX + 24, y);
        y += 14;
      }
    } else {
      y = checkPageSpace(y, lineHeight);
      doc.setFont("helvetica", "normal").setFontSize(11).setTextColor("#888");
      doc.text("None", marginX + 24, y);
      y += lineHeight;
    }

    doc.save(fileName);
  };

  logo.onerror = () => {
    generatePDFWithoutLogo(report, fileName);
  };
}

function drawDivider(doc, y, pageWidth, marginX) {
  doc.setDrawColor("#e7a92f").setLineWidth(0.8);
  doc.line(marginX, y, pageWidth - marginX, y);
}
