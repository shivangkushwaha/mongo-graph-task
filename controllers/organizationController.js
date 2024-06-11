const Organization = require('../models/organization');

exports.getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createOrganization = async (req, res) => {
    const { name } = req.body;
    const organization = new Organization({ name });
    try {
        const newOrganization = await organization.save();
        res.status(201).json(newOrganization);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateOrganization = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const organization = await Organization.findByIdAndUpdate(id, { name }, { new: true });
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.status(200).json(organization);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteOrganization = async (req, res) => {
    const { id } = req.params;
    try {
        const organization = await Organization.findByIdAndRemove(id);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.status(200).json({ message: 'Organization deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
