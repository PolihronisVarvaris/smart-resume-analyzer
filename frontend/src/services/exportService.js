import jsPDF from 'jspdf';

export const generatePDFReport = (analysisData, fileName = 'resume-analysis-report') => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text('Resume Analysis Report', 20, 30);
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
  
  let yPosition = 60;
  
  // Overall Score
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text('Overall Score', 20, yPosition);
  
  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246);
  doc.text(`${analysisData.overall_score}/100`, 20, yPosition + 15);
  
  yPosition += 35;
  
  // Detailed Scores
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Detailed Analysis', 20, yPosition);
  
  yPosition += 10;
  
  // Grammar Score
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Grammar & Spelling:', 20, yPosition);
  doc.setTextColor(59, 130, 246);
  doc.text(`${analysisData.grammar_analysis?.score || 0}/100`, 80, yPosition);
  
  yPosition += 7;
  
  // Formatting Score
  doc.setTextColor(100, 100, 100);
  doc.text('Formatting:', 20, yPosition);
  doc.setTextColor(59, 130, 246);
  doc.text(`${analysisData.formatting_analysis?.score || 0}/100`, 80, yPosition);
  
  yPosition += 15;
  
  // Technical Skills
  if (analysisData.keyword_analysis?.technical_skills?.length > 0) {
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text('Technical Skills Found:', 20, yPosition);
    
    yPosition += 8;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    // Remove unused index parameter
    analysisData.keyword_analysis.technical_skills.forEach((skill) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`• ${skill}`, 25, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10;
  }
  
  // Missing Keywords
  if (analysisData.keyword_analysis?.missing_keywords?.length > 0) {
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text('Recommended Keywords:', 20, yPosition);
    
    yPosition += 8;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    // Remove unused index parameter
    analysisData.keyword_analysis.missing_keywords.forEach((keyword) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`• ${keyword}`, 25, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10;
  }
  
  // Suggestions
  if (analysisData.suggestions?.length > 0) {
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text('Improvement Suggestions:', 20, yPosition);
    
    yPosition += 8;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    // Remove unused index parameter
    analysisData.suggestions.forEach((suggestion) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      const lines = doc.splitTextToSize(`• ${suggestion}`, 160);
      lines.forEach((line) => {
        doc.text(line, 25, yPosition);
        yPosition += 6;
      });
      yPosition += 2;
    });
  }
  
  // Save the PDF
  doc.save(`${fileName}.pdf`);
};

export const generateHTMLReport = (analysisData) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Resume Analysis Report</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; }
            .score { font-size: 2em; color: #3b82f6; font-weight: bold; }
            .section { margin: 20px 0; }
            .skill-list { list-style-type: none; padding: 0; }
            .skill-list li { padding: 5px 0; }
            .suggestion { background: #f3f4f6; padding: 10px; margin: 5px 0; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Resume Analysis Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
            <h2>Overall Score</h2>
            <div class="score">${analysisData.overall_score}/100</div>
        </div>
        
        <div class="section">
            <h2>Detailed Scores</h2>
            <p>Grammar & Spelling: ${analysisData.grammar_analysis?.score || 0}/100</p>
            <p>Formatting: ${analysisData.formatting_analysis?.score || 0}/100</p>
        </div>
        
        ${analysisData.keyword_analysis?.technical_skills?.length > 0 ? `
        <div class="section">
            <h2>Technical Skills Found</h2>
            <ul class="skill-list">
            ${analysisData.keyword_analysis.technical_skills.map(skill => `<li>• ${skill}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
        
        ${analysisData.keyword_analysis?.missing_keywords?.length > 0 ? `
        <div class="section">
            <h2>Recommended Keywords</h2>
            <ul class="skill-list">
            ${analysisData.keyword_analysis.missing_keywords.map(keyword => `<li>• ${keyword}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
        
        ${analysisData.suggestions?.length > 0 ? `
        <div class="section">
            <h2>Improvement Suggestions</h2>
            ${analysisData.suggestions.map(suggestion => `<div class="suggestion">${suggestion}</div>`).join('')}
        </div>
        ` : ''}
    </body>
    </html>
  `;
  
  return htmlContent;
};