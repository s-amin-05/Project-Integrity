import Report from '../models/Report.js';

export const createReport = async (req, res) => {
  try {
    const { type, description, location, risk, status, reportImages, resolveImages, isAnonymous } = req.body;
    
    const reportData = {
      type,
      description,
      location, // Expecting { name, coords: [lng, lat] }
      risk,
      status,
      reportImages,
      resolveImages,
      isAnonymous: isAnonymous || false
    };

    // If user is authenticated, link the report to them
    if (req.user) {
      reportData.reportedBy = req.user._id;
    }

    const report = new Report(reportData);
    await report.save();

    res.status(201).json(report);
  } catch (error) {
    console.error('Create Report Error:', error);
    res.status(500).json({ error: 'Failed to create report', details: error.message });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error('Get All Reports Error:', error);
    res.status(500).json({ error: 'Failed to fetch reports', details: error.message });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate('reportedBy', 'displayName photoURL');
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error('Get Report By ID Error:', error);
    res.status(500).json({ error: 'Failed to fetch report', details: error.message });
  }
};

export const getReportsByLocation = async (req, res) => {
  try {
    const { lat, long, distance, status } = req.query;

    if (!lat || !long || !distance) {
      return res.status(400).json({ error: 'Missing required query parameters: lat, long, distance' });
    }

    const query = {
      'location.coords': {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(long), parseFloat(lat)]
          },
          $maxDistance: parseInt(distance) // in meters
        }
      }
    };

    if (status) {
      query.status = status;
    }

    const reports = await Report.find(query);
    res.status(200).json(reports);
  } catch (error) {
    console.error('Get Reports By Location Error:', error);
    res.status(500).json({ error: 'Failed to fetch nearby reports', details: error.message });
  }
};
