const idgen = require('shortid');
const URL = require('../models/url');

async function handleGenerateShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    res.status(400).json({ error: 'URL is required' });
    return;
  }

  let newid = idgen();
  // Ensure the shortId is not null or empty
  while (!newid) {
    newid = idgen(); // Keep generating until you get a valid ID
  }


  try {
    await URL.create({
      shortId: newid,
      redirectURL: body.url,
      visitHistory: [],
    });
  } catch (error) {
    console.error(error);  // Use console.error for errors
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  
  return res.render("home",{ shorUrl: newid });
}


const handleRedirectURL = async (req, res) => {
    const shortId = req.params.shortId;
    try {
      const entry = await URL.findOneAndUpdate(
        { shortId: shortId }, // Corrected field name
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true } // This option returns the updated document
      );
  
      if (!entry) {
        return res.status(404).send('Short URL not found');
      }
  
      res.redirect(entry.redirectURL);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  };

  const handleUpdateVisit = async (req, res) => {
    const shortId = req.params.shortId;
    try {
      const entry = await URL.findOneAndUpdate(
        { shortId: shortId }, // Corrected field name
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true } // This option returns the updated document
      );
  
      if (!entry) {
        return res.status(404).send('Short URL not found');
      }

      res.json({ redirectURL: entry.redirectURL });
      
  } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
  }
};
  
module.exports = {
  handleGenerateShortURL,
  handleRedirectURL,
  handleUpdateVisit,
};