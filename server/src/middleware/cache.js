const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const cacheMiddleware = (keyGenerator) => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = keyGenerator(req);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data);
    }

    const originalJson = res.json.bind(res);
    res.json = (data) => {
      cache.set(key, {
        data,
        timestamp: Date.now()
      });
      
      if (cache.size > 100) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      
      return originalJson(data);
    };

    next();
  };
};

export const clearCache = () => {
  cache.clear();
};
