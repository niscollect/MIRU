const Company = require("../../models/company");

// company ka approval
exports.approveCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    company.status = "APPROVED";
    company.rejectionReason = undefined;
    await company.save();

    res.json({ message: "Company approved", company });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};
