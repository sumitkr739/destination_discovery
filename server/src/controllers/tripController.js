import aiService from '../services/aiService.js';
import prisma from '../services/prismaService.js';
import Logger from '../utils/logger.js';

const logger = new Logger('TripController');

const validateTripInput = (data) => {
  const { destination, budget, duration, personality, interests } = data;
  
  if (!destination?.trim()) {
    throw new Error('Destination is required');
  }
  
  if (!['Budget', 'Mid-range', 'Luxury'].includes(budget)) {
    throw new Error('Invalid budget option');
  }
  
  if (!duration?.trim()) {
    throw new Error('Duration is required');
  }
  
  if (!personality?.trim()) {
    throw new Error('Personality is required');
  }
  
  if (!Array.isArray(interests)) {
    throw new Error('Interests must be an array');
  }
};

export const generateTrip = async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { destination, budget, duration, personality, interests } = req.body;

    validateTripInput({ destination, budget, duration, personality, interests });

    logger.info('Generating trip', { 
      destination, 
      userId: req.user?.userId 
    });

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
        destination: destination.trim(),
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

    const duration_ms = Date.now() - startTime;
    logger.info('Trip generated successfully', { 
      tripId: trip.id, 
      duration_ms 
    });

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
    logger.error('Trip generation failed', error);
    
    const statusCode = error.message.includes('required') || 
                       error.message.includes('Invalid') ? 400 : 500;
    
    res.status(statusCode).json({ 
      error: error.message || 'Failed to generate trip'
    });
  }
};

export const getTrip = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Trip ID is required' });
    }

    const trip = await prisma.trip.findUnique({ 
      where: { id },
      select: {
        id: true,
        userId: true,
        destination: true,
        budget: true,
        duration: true,
        personality: true,
        interests: true,
        story: true,
        hiddenGems: true,
        foodPassport: true,
        culturalEtiquette: true,
        festivals: true,
        souvenirs: true,
        phrases: true,
        packingList: true,
        timeline: true,
        attractions: true,
        createdAt: true
      }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json({ success: true, data: trip });
  } catch (error) {
    logger.error('Failed to fetch trip', error);
    res.status(500).json({ 
      error: 'Failed to fetch trip'
    });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = req.user ? { userId: req.user.userId } : { userId: null };
    
    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
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
      }),
      prisma.trip.count({ where })
    ]);

    res.json({ 
      success: true, 
      data: trips,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    logger.error('Failed to fetch trips', error);
    res.status(500).json({ 
      error: 'Failed to fetch trips'
    });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Trip ID is required' });
    }

    const trip = await prisma.trip.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (req.user && trip.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this trip' });
    }

    await prisma.trip.delete({ where: { id } });
    
    logger.info('Trip deleted', { tripId: id });
    
    res.json({ success: true, message: 'Trip deleted successfully' });
  } catch (error) {
    logger.error('Failed to delete trip', error);
    res.status(500).json({ 
      error: 'Failed to delete trip'
    });
  }
};