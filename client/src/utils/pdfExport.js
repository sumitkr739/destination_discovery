import jsPDF from 'jspdf';

export const exportToPDF = async (trip) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper to add new page if needed
  const checkPageBreak = (additionalSpace = 10) => {
    if (yPosition + additionalSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper to add text with wrapping
  const addText = (text, fontSize, isBold = false, color = [0, 0, 0]) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    pdf.setTextColor(...color);
    
    const lines = pdf.splitTextToSize(text, contentWidth);
    lines.forEach(line => {
      checkPageBreak();
      pdf.text(line, margin, yPosition);
      yPosition += fontSize * 0.5;
    });
    yPosition += 3;
  };

  // Title
  addText(`Cultural Journey to ${trip.destination}`, 20, true, [37, 99, 235]);
  yPosition += 5;

  // Trip details
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`${trip.budget} • ${trip.duration} • ${trip.personality}`, margin, yPosition);
  yPosition += 10;

  // Story
  checkPageBreak(30);
  addText('Your Destination Story', 14, true, [67, 56, 202]);
  addText(trip.story, 10);
  yPosition += 5;

  // Hidden Gems
  if (trip.hiddenGems && trip.hiddenGems.length > 0) {
    checkPageBreak(30);
    addText('Hidden Gems', 14, true, [16, 185, 129]);
    trip.hiddenGems.forEach((gem, idx) => {
      checkPageBreak(15);
      addText(`${idx + 1}. ${gem.name}`, 11, true);
      addText(gem.description, 9);
      addText(`Category: ${gem.category} | Best Time: ${gem.bestTime}`, 8, false, [100, 100, 100]);
      yPosition += 2;
    });
    yPosition += 5;
  }

  // Food Passport
  if (trip.foodPassport) {
    checkPageBreak(30);
    addText('Local Food Passport', 14, true, [239, 68, 68]);
    
    const foodSections = [
      { title: 'Signature Dishes', data: trip.foodPassport.signature },
      { title: 'Street Food', data: trip.foodPassport.street },
      { title: 'Drinks', data: trip.foodPassport.drinks },
      { title: 'Sweet Treats', data: trip.foodPassport.sweetTreats },
    ];

    foodSections.forEach(section => {
      if (section.data && section.data.length > 0) {
        checkPageBreak(20);
        addText(section.title, 11, true);
        section.data.forEach(item => {
          checkPageBreak(12);
          const itemName = item.dish || item.drink || item.item;
          addText(`• ${itemName} (${item.price})`, 9, true);
          addText(item.description, 8);
          addText(`Where: ${item.where}`, 8, false, [100, 100, 100]);
        });
        yPosition += 2;
      }
    });
    yPosition += 5;
  }

  // Timeline
  if (trip.timeline && trip.timeline.length > 0) {
    checkPageBreak(30);
    addText('Day-by-Day Itinerary', 14, true, [34, 197, 94]);
    
    trip.timeline.forEach(day => {
      checkPageBreak(20);
      addText(`Day ${day.day}: ${day.title}`, 12, true, [37, 99, 235]);
      
      if (day.activities) {
        day.activities.forEach(activity => {
          checkPageBreak(15);
          addText(`${activity.time} - ${activity.activity}`, 9, true);
          addText(`Location: ${activity.location}`, 8);
          if (activity.tips) {
            addText(`💡 Tip: ${activity.tips}`, 8, false, [100, 100, 100]);
          }
          yPosition += 1;
        });
      }
      yPosition += 3;
    });
    yPosition += 5;
  }

  // Cultural Etiquette
  if (trip.culturalEtiquette && trip.culturalEtiquette.length > 0) {
    checkPageBreak(30);
    addText('Cultural Etiquette', 14, true, [147, 51, 234]);
    
    trip.culturalEtiquette.forEach(item => {
      checkPageBreak(20);
      addText(item.category, 11, true);
      
      if (item.dos && item.dos.length > 0) {
        addText("Do's:", 9, true, [34, 197, 94]);
        item.dos.forEach(doItem => {
          addText(`✓ ${doItem}`, 8);
        });
      }
      
      if (item.donts && item.donts.length > 0) {
        addText("Don'ts:", 9, true, [239, 68, 68]);
        item.donts.forEach(dontItem => {
          addText(`✗ ${dontItem}`, 8);
        });
      }
      yPosition += 2;
    });
    yPosition += 5;
  }

  // Festivals
  if (trip.festivals && trip.festivals.length > 0) {
    checkPageBreak(30);
    addText('Festivals & Events', 14, true, [251, 146, 60]);
    
    trip.festivals.forEach(festival => {
      checkPageBreak(15);
      addText(`${festival.name} (${festival.month})`, 11, true);
      addText(festival.description, 9);
      addText(`Experience: ${festival.experience}`, 8, false, [100, 100, 100]);
      yPosition += 2;
    });
    yPosition += 5;
  }

  // Essential Phrases
  if (trip.phrases && trip.phrases.length > 0) {
    checkPageBreak(30);
    addText('Essential Phrases', 14, true, [6, 182, 212]);
    
    trip.phrases.forEach(phrase => {
      checkPageBreak(10);
      addText(`${phrase.phrase} - ${phrase.pronunciation}`, 9, true);
      addText(phrase.meaning, 8, false, [100, 100, 100]);
    });
    yPosition += 5;
  }

  // Souvenirs
  if (trip.souvenirs && trip.souvenirs.length > 0) {
    checkPageBreak(30);
    addText('Authentic Souvenirs', 14, true, [236, 72, 153]);
    
    trip.souvenirs.forEach(souvenir => {
      checkPageBreak(12);
      addText(`• ${souvenir.item}`, 9, true);
      addText(souvenir.description, 8);
      addText(`Where: ${souvenir.where} | Price: ${souvenir.priceRange}`, 8, false, [100, 100, 100]);
      yPosition += 1;
    });
    yPosition += 5;
  }

  // Packing List
  if (trip.packingList) {
    checkPageBreak(30);
    addText('Smart Packing List', 14, true, [99, 102, 241]);
    
    const packingSections = [
      { title: 'Essentials', data: trip.packingList.essentials },
      { title: 'Clothing', data: trip.packingList.clothing },
      { title: 'Tech & Gadgets', data: trip.packingList.tech },
      { title: 'Optional', data: trip.packingList.optional },
    ];

    packingSections.forEach(section => {
      if (section.data && section.data.length > 0) {
        checkPageBreak(15);
        addText(section.title, 11, true);
        section.data.forEach(item => {
          addText(`☐ ${item}`, 8);
        });
        yPosition += 2;
      }
    });
  }

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text('Generated by CultureLens AI - Discover Places Like a Local', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Save the PDF
  pdf.save(`${trip.destination.replace(/\s+/g, '-')}-Cultural-Journey.pdf`);
};
