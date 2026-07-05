import jsPDF from 'jspdf';

// Helper to clean non-ASCII symbols and emojis that break jsPDF Helvetica font
const cleanText = (text) => {
  if (!text) return '';
  if (typeof text !== 'string') return String(text);
  
  // Replace curly punctuation and common symbols with standard ASCII equivalents
  let cleaned = text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2022]/g, '•')
    .replace(/[\u2026]/g, '...');
    
  // Remove emojis / surrogate pairs
  cleaned = cleaned.replace(/[\uD800-\uDFFF]./g, '');
  
  // Remove symbol ranges unsupported by Helvetica
  cleaned = cleaned.replace(/[\u2600-\u27BF]/g, '');
  
  return cleaned;
};

export const exportToPDF = async (trip) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper to add new page if needed and draw header decorations
  const checkPageBreak = (additionalSpace = 10) => {
    if (yPosition + additionalSpace > pageHeight - margin - 15) {
      pdf.addPage();
      yPosition = margin + 15;
      return true;
    }
    return false;
  };

  // Helper to add text with wrapping
  const addText = (text, fontSize, isBold = false, color = [55, 65, 81]) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    pdf.setTextColor(...color);
    
    const lines = pdf.splitTextToSize(cleanText(text), contentWidth);
    lines.forEach(line => {
      checkPageBreak(5);
      pdf.text(line, margin, yPosition);
      yPosition += fontSize * 0.45;
    });
    yPosition += 2.5;
  };

  // Helper to draw section header with visual vertical accent bar
  const drawSectionHeader = (title, color = [99, 102, 241]) => {
    checkPageBreak(20);
    pdf.setFillColor(...color);
    pdf.rect(margin, yPosition, 4, 8, 'F'); // Vertical indicator bar
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(17, 24, 39); // Slate-900
    pdf.text(cleanText(title), margin + 6, yPosition + 6.5);
    yPosition += 15;
  };

  // 1. Dark Slate Cover Banner
  pdf.setFillColor(15, 23, 42); // slate-900
  pdf.rect(0, 0, pageWidth, 45, 'F');
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(255, 255, 255);
  pdf.text(cleanText(`Cultural Journey to ${trip.destination}`), margin, 24);
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(110, 231, 249); // Cyan accent
  pdf.text('CULTURELENS TRAVEL REPORT', margin, 34);
  
  yPosition = 55;

  // 2. Structured Traveler Profile Box Grid
  pdf.setFillColor(249, 250, 251); // Gray-50
  pdf.setDrawColor(229, 231, 235); // Gray-200
  pdf.setLineWidth(0.3);
  pdf.roundedRect(margin, yPosition, contentWidth, 25, 3, 3, 'FD');
  
  pdf.setFontSize(8.5);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(107, 114, 128); // Gray-500
  
  pdf.text('BUDGET', margin + 8, yPosition + 8);
  pdf.text('DURATION', margin + 50, yPosition + 8);
  pdf.text('PERSONALITY', margin + 92, yPosition + 8);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.5);
  pdf.setTextColor(17, 24, 39);
  pdf.text(cleanText(trip.budget), margin + 8, yPosition + 15);
  pdf.text(cleanText(trip.duration), margin + 50, yPosition + 15);
  pdf.text(cleanText(trip.personality), margin + 92, yPosition + 15);
  
  // Interests tag line in profile box
  if (trip.interests && trip.interests.length > 0) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(107, 114, 128);
    pdf.text('INTERESTS:', margin + 8, yPosition + 21);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(99, 102, 241);
    pdf.text(cleanText(trip.interests.join('  •  ')), margin + 28, yPosition + 21);
  }
  yPosition += 35;

  // 3. Destination Story / Narrative
  drawSectionHeader('Destination Story', [99, 102, 241]);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(55, 65, 81);
  
  const storyLines = pdf.splitTextToSize(cleanText(trip.story), contentWidth);
  storyLines.forEach(line => {
    checkPageBreak(5);
    pdf.text(line, margin, yPosition);
    yPosition += 5.5;
  });
  yPosition += 8;

  // 4. Hidden Gems
  if (trip.hiddenGems && trip.hiddenGems.length > 0) {
    drawSectionHeader('Hidden Gems', [16, 185, 129]); // Emerald-500
    
    trip.hiddenGems.forEach((gem) => {
      const descLines = pdf.splitTextToSize(cleanText(gem.description), contentWidth - 10);
      const height = 17 + (descLines.length * 4.5);
      
      checkPageBreak(height);
      pdf.setFillColor(249, 250, 251);
      pdf.setDrawColor(229, 231, 235);
      pdf.roundedRect(margin, yPosition, contentWidth, height - 3, 2, 2, 'FD');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(17, 24, 39);
      pdf.text(cleanText(gem.name), margin + 5, yPosition + 6);
      
      pdf.setFontSize(8);
      pdf.setTextColor(16, 185, 129);
      pdf.text(cleanText(gem.category.toUpperCase()), pageWidth - margin - 5, yPosition + 6, { align: 'right' });
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(75, 85, 99);
      let textY = yPosition + 12;
      descLines.forEach(line => {
        pdf.text(line, margin + 5, textY);
        textY += 4.5;
      });
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(156, 163, 175);
      pdf.text(cleanText(`Best Time to Visit: ${gem.bestTime}`), margin + 5, textY + 1.5);
      
      yPosition += height;
    });
    yPosition += 8;
  }

  // 5. Food Passport
  if (trip.foodPassport) {
    drawSectionHeader('Food Passport', [239, 68, 68]); // Red-500
    
    const foodSections = [
      { title: 'Signature Dishes', data: trip.foodPassport.signature },
      { title: 'Street Food', data: trip.foodPassport.street },
      { title: 'Drinks', data: trip.foodPassport.drinks },
      { title: 'Sweet Treats', data: trip.foodPassport.sweetTreats },
    ];

    foodSections.forEach(section => {
      if (section.data && section.data.length > 0) {
        checkPageBreak(15);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(220, 38, 38);
        pdf.text(cleanText(section.title), margin, yPosition);
        yPosition += 6;
        
        section.data.forEach(item => {
          const itemName = item.dish || item.drink || item.item;
          const descLines = pdf.splitTextToSize(cleanText(item.description), contentWidth - 10);
          const height = 19 + (descLines.length * 4.5);
          
          checkPageBreak(height);
          pdf.setFillColor(254, 242, 242); // Red-50
          pdf.setDrawColor(252, 165, 165); // Red-200
          pdf.roundedRect(margin, yPosition, contentWidth, height - 3, 2, 2, 'FD');
          
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(9.5);
          pdf.setTextColor(17, 24, 39);
          pdf.text(cleanText(itemName), margin + 5, yPosition + 6);
          
          pdf.setFontSize(8.5);
          pdf.setTextColor(220, 38, 38);
          pdf.text(cleanText(item.price), pageWidth - margin - 5, yPosition + 6, { align: 'right' });
          
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9);
          pdf.setTextColor(75, 85, 99);
          let textY = yPosition + 12;
          descLines.forEach(line => {
            pdf.text(line, margin + 5, textY);
            textY += 4.5;
          });
          
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(8);
          pdf.setTextColor(107, 114, 128);
          pdf.text(cleanText(`Where: ${item.where}`), margin + 5, textY + 1.5);
          
          yPosition += height;
        });
        yPosition += 4;
      }
    });
    yPosition += 8;
  }

  // 6. Day-by-Day Itinerary
  if (trip.timeline && trip.timeline.length > 0) {
    drawSectionHeader('Day-by-Day Itinerary', [139, 92, 246]); // Purple-500
    
    trip.timeline.forEach(day => {
      checkPageBreak(25);
      
      pdf.setFillColor(243, 244, 246); // Gray-100
      pdf.rect(margin, yPosition, contentWidth, 8, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10.5);
      pdf.setTextColor(109, 40, 217); // Deep purple
      pdf.text(cleanText(`DAY ${day.day}: ${day.title}`), margin + 4, yPosition + 5.5);
      yPosition += 12;
      
      if (day.activities) {
        day.activities.forEach(activity => {
          const actLines = pdf.splitTextToSize(cleanText(activity.activity), contentWidth - 25);
          const tipsLines = activity.tips ? pdf.splitTextToSize(cleanText(activity.tips), contentWidth - 25) : [];
          
          const height = 15 + (actLines.length * 4.5) + (tipsLines.length > 0 ? (tipsLines.length * 4) + 2 : 0);
          checkPageBreak(height);
          
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(9);
          pdf.setTextColor(6, 182, 212); // Time accent
          pdf.text(cleanText(activity.time), margin + 4, yPosition + 5);
          
          pdf.setTextColor(17, 24, 39);
          pdf.setFont('helvetica', 'bold');
          pdf.text(cleanText(activity.location), margin + 22, yPosition + 5);
          
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9);
          pdf.setTextColor(75, 85, 99);
          let textY = yPosition + 10;
          actLines.forEach(line => {
            pdf.text(line, margin + 22, textY);
            textY += 4.5;
          });
          
          if (tipsLines.length > 0) {
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(8.5);
            pdf.setTextColor(180, 83, 9); // Amber tip text
            tipsLines.forEach((line, index) => {
              const label = index === 0 ? 'Tip: ' : '';
              pdf.text(cleanText(`${label}${line}`), margin + 22, textY + 1);
              textY += 4;
            });
          }
          
          // Connect timeline bullet lines
          pdf.setDrawColor(229, 231, 235);
          pdf.setLineWidth(0.4);
          pdf.line(margin + 12, yPosition + 7, margin + 12, yPosition + height);
          
          pdf.setFillColor(139, 92, 246);
          pdf.circle(margin + 12, yPosition + 4, 1.2, 'F');
          
          yPosition += height;
        });
      }
      yPosition += 5;
    });
    yPosition += 8;
  }

  // 7. Cultural Etiquette
  if (trip.culturalEtiquette && trip.culturalEtiquette.length > 0) {
    drawSectionHeader('Cultural Etiquette', [244, 63, 94]); // Rose-500
    
    trip.culturalEtiquette.forEach(item => {
      checkPageBreak(25);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(17, 24, 39);
      pdf.text(cleanText(item.category), margin, yPosition);
      yPosition += 6;
      
      if (item.dos && item.dos.length > 0) {
        checkPageBreak(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(16, 185, 129); // Emerald-500
        pdf.text("Do's", margin, yPosition);
        yPosition += 4.5;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(75, 85, 99);
        item.dos.forEach(doItem => {
          const lines = pdf.splitTextToSize(`+  ${cleanText(doItem)}`, contentWidth);
          lines.forEach(line => {
            checkPageBreak(5);
            pdf.text(line, margin, yPosition);
            yPosition += 4.5;
          });
        });
        yPosition += 2;
      }
      
      if (item.donts && item.donts.length > 0) {
        checkPageBreak(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(239, 68, 68); // Red-500
        pdf.text("Don'ts", margin, yPosition);
        yPosition += 4.5;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(75, 85, 99);
        item.donts.forEach(dontItem => {
          const lines = pdf.splitTextToSize(`-  ${cleanText(dontItem)}`, contentWidth);
          lines.forEach(line => {
            checkPageBreak(5);
            pdf.text(line, margin, yPosition);
            yPosition += 4.5;
          });
        });
        yPosition += 2;
      }
      yPosition += 4;
    });
    yPosition += 8;
  }

  // 8. Local Festivals
  if (trip.festivals && trip.festivals.length > 0) {
    drawSectionHeader('Local Festivals', [245, 158, 11]); // Amber-500
    
    trip.festivals.forEach(festival => {
      const descLines = pdf.splitTextToSize(cleanText(festival.description), contentWidth - 10);
      const expLines = pdf.splitTextToSize(cleanText(festival.experience), contentWidth - 16);
      
      const height = 18 + (descLines.length * 4.5) + (expLines.length * 4);
      checkPageBreak(height);
      
      pdf.setFillColor(255, 251, 235); // Amber-50
      pdf.setDrawColor(252, 211, 77); // Amber-200
      pdf.roundedRect(margin, yPosition, contentWidth, height - 3, 2, 2, 'FD');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(17, 24, 39);
      pdf.text(cleanText(festival.name), margin + 5, yPosition + 6);
      
      pdf.setFontSize(8.5);
      pdf.setTextColor(217, 119, 6);
      pdf.text(cleanText(festival.month.toUpperCase()), pageWidth - margin - 5, yPosition + 6, { align: 'right' });
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(75, 85, 99);
      let textY = yPosition + 12;
      descLines.forEach(line => {
        pdf.text(line, margin + 5, textY);
        textY += 4.5;
      });
      
      pdf.setFillColor(254, 243, 199); // Amber-100
      pdf.roundedRect(margin + 3, textY + 1, contentWidth - 6, (expLines.length * 4) + 4, 1.5, 1.5, 'F');
      
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8.5);
      pdf.setTextColor(180, 83, 9);
      let expY = textY + 5;
      expLines.forEach((line, index) => {
        const label = index === 0 ? 'Insider Tip: ' : '';
        pdf.text(cleanText(`${label}${line}`), margin + 6, expY);
        expY += 4;
      });
      
      yPosition += height;
    });
    yPosition += 8;
  }

  // 9. Language Companion
  if (trip.phrases && trip.phrases.length > 0) {
    drawSectionHeader('Language Companion', [6, 182, 212]); // Cyan-500
    
    trip.phrases.forEach(phrase => {
      checkPageBreak(16);
      
      pdf.setFillColor(240, 253, 250); // Teal-50
      pdf.setDrawColor(204, 251, 241); // Teal-100
      pdf.roundedRect(margin, yPosition, contentWidth, 13, 2, 2, 'FD');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(17, 24, 39);
      pdf.text(cleanText(phrase.phrase), margin + 5, yPosition + 5.5);
      
      pdf.setFontSize(8);
      pdf.setTextColor(13, 148, 136);
      pdf.text(cleanText(`[${phrase.pronunciation}]`), margin + 5, yPosition + 9.5);
      
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(9);
      pdf.setTextColor(75, 85, 99);
      pdf.text(cleanText(`"${phrase.meaning}"`), pageWidth - margin - 5, yPosition + 8, { align: 'right' });
      
      yPosition += 16;
    });
    yPosition += 8;
  }

  // 10. Authentic Souvenirs
  if (trip.souvenirs && trip.souvenirs.length > 0) {
    drawSectionHeader('Authentic Souvenirs', [236, 72, 153]); // Pink-500
    
    trip.souvenirs.forEach(souvenir => {
      const descLines = pdf.splitTextToSize(cleanText(souvenir.description), contentWidth - 10);
      const height = 18 + (descLines.length * 4.5);
      
      checkPageBreak(height);
      pdf.setFillColor(253, 242, 248); // Pink-50
      pdf.setDrawColor(251, 207, 232); // Pink-200
      pdf.roundedRect(margin, yPosition, contentWidth, height - 3, 2, 2, 'FD');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(17, 24, 39);
      pdf.text(cleanText(souvenir.item), margin + 5, yPosition + 6);
      
      pdf.setFontSize(8.5);
      pdf.setTextColor(219, 39, 119);
      pdf.text(cleanText(souvenir.priceRange), pageWidth - margin - 5, yPosition + 6, { align: 'right' });
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(75, 85, 99);
      let textY = yPosition + 12;
      descLines.forEach(line => {
        pdf.text(line, margin + 5, textY);
        textY += 4.5;
      });
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(107, 114, 128);
      pdf.text(cleanText(`Where to Buy: ${souvenir.where}`), margin + 5, textY + 1.5);
      
      yPosition += height;
    });
    yPosition += 8;
  }

  // 11. Packing List
  if (trip.packingList) {
    drawSectionHeader('Smart Packing List', [79, 70, 229]); // Indigo-600
    
    const packingSections = [
      { title: 'Essentials', data: trip.packingList.essentials },
      { title: 'Clothing', data: trip.packingList.clothing },
      { title: 'Tech & Gadgets', data: trip.packingList.tech },
      { title: 'Optional', data: trip.packingList.optional },
    ];

    packingSections.forEach(section => {
      if (section.data && section.data.length > 0) {
        checkPageBreak(20);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10.5);
        pdf.setTextColor(67, 56, 202);
        pdf.text(cleanText(section.title), margin, yPosition);
        yPosition += 6;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(75, 85, 99);
        section.data.forEach(item => {
          checkPageBreak(6);
          pdf.text(`[ ]  ${cleanText(item)}`, margin + 3, yPosition);
          yPosition += 5.5;
        });
        yPosition += 4;
      }
    });
  }

  // 12. Multi-Page Header & Footer Decorations Injection
  const totalPages = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    
    // Draw Running Header (Skip on Page 1)
    if (i > 1) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(120, 120, 120);
      pdf.text(cleanText(`CultureLens Cultural Report: ${trip.destination}`), margin, margin);
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.2);
      pdf.line(margin, margin + 2, pageWidth - margin, margin + 2);
    }
    
    // Draw Running Footer (On all pages)
    pdf.setDrawColor(229, 231, 235);
    pdf.setLineWidth(0.2);
    pdf.line(margin, pageHeight - margin - 5, pageWidth - margin, pageHeight - margin - 5);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(120, 120, 120);
    pdf.text('CultureLens AI - Discover Places Like a Local', margin, pageHeight - margin);
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - margin, { align: 'right' });
  }

  // Save the PDF
  pdf.save(`${trip.destination.replace(/\s+/g, '-')}-Cultural-Journey.pdf`);
};
