import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    companyName: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    jobDescription: { type: String },
    profile: { type: String },
    location: { type: String },
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    collegeName: { type: String },
    degree: { type: String },
    address: { type: String },
    percentage: { type: Number },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String },
    projectDescription: { type: String },
    skillsUsed: { type: String },
  },
  { _id: false }
);

const certificationSchema = new mongoose.Schema(
  {
    certificationName: { type: String },
    dateIssued: { type: Date },
  },
  { _id: false }
);

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    profilePhoto: { type: String }, // URL or base64
    gitLink: { type: String },
    linkedinLink: { type: String },
    instaLink: { type: String },
    password: { type: String, required: true },
    skills: [{ type: String }],
    experience: [experienceSchema],
    userAddress: { type: String },
    education: [educationSchema],
    projects: [projectSchema],
    certifications: [certificationSchema],
  },
  { timestamps: true }
);

export const Admin = mongoose.model('Admin', adminSchema);


