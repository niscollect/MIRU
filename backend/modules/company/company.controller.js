const Company = require("../../models/company");

// ---------------- CREATE COMPANY (SELLER) ----------------
exports.createCompany = async (req, res) => {
  try {
    const { name, description, websiteUrl, logoUrl, industry, country } =
      req.body;

    if (!name || !websiteUrl) {
      return res.status(400).json({
        message: "Company name and website URL are required",
      });
    }

    // slug generation (simple + predictable)
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const existing = await Company.findOne({ slug });
    if (existing) {
      return res.status(409).json({
        message: "Company with this name already exists",
      });
    }

    const company = await Company.create({
      name,
      slug,
      description,
      websiteUrl,
      logoUrl,
      industry,
      country,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Company registered successfully. Awaiting admin approval.",
      company,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create company" });
  }
};

/// get mere companies ke seller
exports.getMyCompanies = async (req, res) => {
  try {
    const companies = await Company.find({
      owner: req.user._id,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json({ companies });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch companies" });
  }
};
