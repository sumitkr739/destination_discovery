import aiService from '../services/aiService.js';
import prisma from '../services/prismaService.js';

export const generateTrip = async (req, res) => {
  try {
    const { destination, budget, duration, personality, interests } = req.body;

    if (!destination || !budget || !duration || !personality || !interests) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log(`🌍 Generating trip for ${destination}...`);

    const tripContent = await aiService.generateTripContent({
      destination,
      budget,
      duration,
      personality,
      interests
    });

    const trip = await prisma.trip.create({
      data: {
        userId: req.user?.userId || null,
        destination,
        budget,
        duration,
        personality,
        interests,
        story: tripContent.story,
        hiddenGems: tripContent.hiddenGems,
        foodPassport: tripContent.foodPassport,
        culturalEtiquette: tripContent.culturalEtiquette,
        festivals: tripContent.festivals,
        souvenirs: tripContent.souvenirs,
        phrases: tripContent.phrases,
        packingList: tripContent.packingList,
        timeline: tripContent.timeline,
        attractions: tripContent.attractions
      }
    });

    console.log(`✅ Trip created: ${trip.id}`);

    res.json({
      success: true,
      tripId: trip.id,
      data: {
        destination,
        budget,
        duration,
        personality,
        interests,
        ...tripContent
      }
    });
  } catch (error) {
    console.error('Error generating trip:', error);
    res.status(500).json({ 
      error: 'Failed to generate trip',
      message: error.message 
    });
  }
};

export const getTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await prisma.trip.findUnique({ where: { id } });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json({ success: true, data: trip });
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ 
      error: 'Failed to fetch trip',
      message: error.message 
    });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const where = req.user ? { userId: req.user.userId } : { userId: null };
    
    const trips = await prisma.trip.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        destination: true,
        budget: true,
        duration: true,
        personality: true,
        interests: true,
        createdAt: true,
        story: true
      }
    });

    res.json({ success: true, data: trips });
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ 
      error: 'Failed to fetch trips',
      message: error.message 
    });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.trip.delete({ where: { id } });
    res.json({ success: true, message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ 
      error: 'Failed to delete trip',
      message: error.message 
    });
  }
};