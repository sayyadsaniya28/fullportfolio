import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

const parseIfString = (value) => {
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return parsed;
    } catch {
      return value;
    }
  }
  return value;
};

const buildBase64FromFile = (file) => {
  if (!file) return undefined;
  const base64 = file.buffer.toString('base64');
  const mime = file.mimetype || 'image/png';
  return `data:${mime};base64,${base64}`;
};

const setAuthCookie = (res, token) => {
  const tenYearsMs = 10 * 365 * 24 * 60 * 60 * 1000;
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: tenYearsMs,
    path: '/',
  });
};

export const registerAdmin = async (req, res) => {
  try {
    let {
      name,
      email,
      profilePhoto: profilePhotoBody,
      gitLink,
      linkedinLink,
      instaLink,
      password,
      skills = [],
      experience = [],
      userAddress,
      education = [],
      projects = [],
      certifications = [],
    } = req.body;

    // Coerce possible JSON strings from multipart/form-data into arrays/objects
    skills = parseIfString(skills) || [];
    experience = parseIfString(experience) || [];
    education = parseIfString(education) || [];
    projects = parseIfString(projects) || [];
    certifications = parseIfString(certifications) || [];

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Admin with this email already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const profilePhoto = req.file ? buildBase64FromFile(req.file) : profilePhotoBody;

    const admin = await Admin.create({
      name,
      email,
      profilePhoto,
      gitLink,
      linkedinLink,
      instaLink,
      password: hashed,
      skills,
      experience,
      userAddress,
      education,
      projects,
      certifications,
    });

    const payload = { id: admin._id.toString(), email: admin.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret');
    setAuthCookie(res, token);

    const adminSafe = admin.toObject();
    delete adminSafe.password;

    return res.status(201).json({ message: 'Registration successful', admin: adminSafe });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllData = async (_req, res) => {
  try {
    const admins = await Admin.find({}).select('-password');
    return res.json({ admins });
  } catch (error) {
    console.error('Get all data error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const update = { ...req.body };

    // Parse arrays if coming from multipart/form-data as JSON strings
    if (update.skills) update.skills = parseIfString(update.skills);
    if (update.experience) update.experience = parseIfString(update.experience);
    if (update.education) update.education = parseIfString(update.education);
    if (update.projects) update.projects = parseIfString(update.projects);
    if (update.certifications) update.certifications = parseIfString(update.certifications);

    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }

    if (req.file) {
      update.profilePhoto = buildBase64FromFile(req.file);
    }

    const updated = await Admin.findByIdAndUpdate(id, update, { new: true }).select('-password');
    if (!updated) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    return res.json({ message: 'Admin updated successfully', admin: updated });
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


