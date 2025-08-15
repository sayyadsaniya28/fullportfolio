import { useState } from 'react';
import api from '../utils/api.js';

export default function AdminRegistration() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    profilePhoto: '',
    gitLink: '',
    linkedinLink: '',
    instaLink: '',
    password: '',
    skills: ['React', 'Node'],
    experience: [{ companyName: '', profile: '', location: '', jobDescription: '', startDate: '', endDate: '' }],
    userAddress: '',
    education: [{ collegeName: '', degree: '', address: '', percentage: '' }],
    projects: [{ projectName: '', projectDescription: '', skillsUsed: '' }],
    certifications: [{ certificationName: '', dateIssued: '' }],
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const addExperience = () => {
    setForm(f => ({
      ...f,
      experience: [...f.experience, { companyName: '', profile: '', location: '', jobDescription: '', startDate: '', endDate: '' }]
    }));
  };

  const removeExperience = (index) => {
    setForm(f => ({
      ...f,
      experience: f.experience.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index, field, value) => {
    setForm(f => ({
      ...f,
      experience: f.experience.map((exp, i) => i === index ? { ...exp, [field]: value } : exp)
    }));
  };

  const addEducation = () => {
    setForm(f => ({
      ...f,
      education: [...f.education, { collegeName: '', degree: '', address: '', percentage: '' }]
    }));
  };

  const removeEducation = (index) => {
    setForm(f => ({
      ...f,
      education: f.education.filter((_, i) => i !== index)
    }));
  };

  const updateEducation = (index, field, value) => {
    setForm(f => ({
      ...f,
      education: f.education.map((edu, i) => i === index ? { ...edu, [field]: value } : edu)
    }));
  };

  const addProject = () => {
    setForm(f => ({
      ...f,
      projects: [...f.projects, { projectName: '', projectDescription: '', skillsUsed: '' }]
    }));
  };

  const removeProject = (index) => {
    setForm(f => ({
      ...f,
      projects: f.projects.filter((_, i) => i !== index)
    }));
  };

  const updateProject = (index, field, value) => {
    setForm(f => ({
      ...f,
      projects: f.projects.map((proj, i) => i === index ? { ...proj, [field]: value } : proj)
    }));
  };

  const addCertification = () => {
    setForm(f => ({
      ...f,
      certifications: [...f.certifications, { certificationName: '', dateIssued: '' }]
    }));
  };

  const removeCertification = (index) => {
    setForm(f => ({
      ...f,
      certifications: f.certifications.filter((_, i) => i !== index)
    }));
  };

  const updateCertification = (index, field, value) => {
    setForm(f => ({
      ...f,
      certifications: f.certifications.map((cert, i) => i === index ? { ...cert, [field]: value } : cert)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    
    try {
      // Collect form data from the new fields
      const formData = new FormData(e.target);
      
      // Build the complete data object
      const completeData = {
        name: form.name,
        email: form.email,
        profilePhoto: form.profilePhoto,
        gitLink: form.gitLink,
        linkedinLink: form.linkedinLink,
        instaLink: form.instaLink,
        password: form.password,
        userAddress: form.userAddress,
        skills: form.skills,
        experience: form.experience.filter(exp => exp.companyName), // Only add if company name exists
        education: form.education.filter(edu => edu.collegeName), // Only add if college name exists
        projects: form.projects.filter(proj => proj.projectName), // Only add if project name exists
        certifications: form.certifications.filter(cert => cert.certificationName) // Only add if certification name exists
      };

      const isMultipart = !!file;
      if (isMultipart) {
        const fd = new FormData();
        Object.entries(completeData).forEach(([k, v]) => {
          if (Array.isArray(v)) {
            fd.append(k, JSON.stringify(v));
          } else {
            fd.append(k, v);
          }
        });
        fd.append('profilePhoto', file);
        await api.post('/admin/registration', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/admin/registration', completeData);
      }
      setMessage('Registration successful');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to register');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-12">
      <h2 className="section-title" data-aos="fade-up">Admin Registration</h2>
      <form onSubmit={handleSubmit} className="card p-6 grid md:grid-cols-2 gap-4" data-aos="fade-up">
        <input className="card p-3" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="card p-3" name="email" placeholder="Email" value={form.email} onChange={handleChange} type="email" required />
        <input className="card p-3" name="gitLink" placeholder="GitHub Link" value={form.gitLink} onChange={handleChange} />
        <input className="card p-3" name="linkedinLink" placeholder="LinkedIn Link" value={form.linkedinLink} onChange={handleChange} />
        <input className="card p-3" name="instaLink" placeholder="Instagram Link" value={form.instaLink} onChange={handleChange} />
        <input className="card p-3" name="userAddress" placeholder="Address / Headline" value={form.userAddress} onChange={handleChange} />
        <input className="card p-3" name="password" placeholder="Password" value={form.password} onChange={handleChange} type="password" required />
        <input className="card p-3" name="profilePhoto" placeholder="Profile Photo URL (or upload below)" value={form.profilePhoto} onChange={handleChange} />
        <input className="card p-3 md:col-span-2" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />

        {/* Skills Section */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Skills (comma separated)</h3>
          <input 
            className="card p-3 w-full" 
            name="skills" 
            placeholder="React, Node.js, MongoDB, Express" 
            value={Array.isArray(form.skills) ? form.skills.join(', ') : form.skills} 
            onChange={(e) => setForm(f => ({ ...f, skills: e.target.value.split(',').map(s => s.trim()) }))} 
          />
        </div>

        {/* Experience Section */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Experience</h3>
            <button type="button" onClick={addExperience} className="btn-primary text-sm px-3 py-1">+ Add Experience</button>
          </div>
          <div className="space-y-4">
            {form.experience.map((exp, index) => (
              <div key={index} className="card p-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Experience #{index + 1}</h4>
                  {form.experience.length > 1 && (
                    <button type="button" onClick={() => removeExperience(index)} className="text-red-500 hover:text-red-700">Remove</button>
                  )}
                </div>
                <div className="space-y-3">
                  <input 
                    className="card p-3" 
                    placeholder="Company Name" 
                    value={exp.companyName} 
                    onChange={(e) => updateExperience(index, 'companyName', e.target.value)} 
                  />
                  <input 
                    className="card p-3" 
                    placeholder="Job Profile" 
                    value={exp.profile} 
                    onChange={(e) => updateExperience(index, 'profile', e.target.value)} 
                  />
                  <input 
                    className="card p-3" 
                    placeholder="Location" 
                    value={exp.location} 
                    onChange={(e) => updateExperience(index, 'location', e.target.value)} 
                  />
                  <textarea 
                    className="card p-3 w-full" 
                    placeholder="Job Description" 
                    rows="3"
                    value={exp.jobDescription} 
                    onChange={(e) => updateExperience(index, 'jobDescription', e.target.value)} 
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      className="card p-3" 
                      type="date" 
                      placeholder="Start Date" 
                      value={exp.startDate} 
                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)} 
                    />
                    <input 
                      className="card p-3" 
                      type="date" 
                      placeholder="End Date" 
                      value={exp.endDate} 
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Education</h3>
            <button type="button" onClick={addEducation} className="btn-primary text-sm px-3 py-1">+ Add Education</button>
          </div>
          <div className="space-y-4">
            {form.education.map((edu, index) => (
              <div key={index} className="card p-4 border-l-4 border-green-500">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Education #{index + 1}</h4>
                  {form.education.length > 1 && (
                    <button type="button" onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-700">Remove</button>
                  )}
                </div>
                <div className="space-y-3">
                  <input 
                    className="card p-3" 
                    placeholder="College/University Name" 
                    value={edu.collegeName} 
                    onChange={(e) => updateEducation(index, 'collegeName', e.target.value)} 
                  />
                  <input 
                    className="card p-3" 
                    placeholder="Degree" 
                    value={edu.degree} 
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)} 
                  />
                  <input 
                    className="card p-3" 
                    placeholder="College Address" 
                    value={edu.address} 
                    onChange={(e) => updateEducation(index, 'address', e.target.value)} 
                  />
                  <input 
                    className="card p-3" 
                    type="number" 
                    placeholder="Percentage" 
                    min="0" 
                    max="100" 
                    value={edu.percentage} 
                    onChange={(e) => updateEducation(index, 'percentage', parseFloat(e.target.value) || 0)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Projects</h3>
            <button type="button" onClick={addProject} className="btn-primary text-sm px-3 py-1">+ Add Project</button>
          </div>
          <div className="space-y-4">
            {form.projects.map((proj, index) => (
              <div key={index} className="card p-4 border-l-4 border-purple-500">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Project #{index + 1}</h4>
                  {form.projects.length > 1 && (
                    <button type="button" onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700">Remove</button>
                  )}
                </div>
                <div className="space-y-3">
                  <input 
                    className="card p-3" 
                    placeholder="Project Name" 
                    value={proj.projectName} 
                    onChange={(e) => updateProject(index, 'projectName', e.target.value)} 
                  />
                  <textarea 
                    className="card p-3 w-full" 
                    placeholder="Project Description" 
                    rows="3"
                    value={proj.projectDescription} 
                    onChange={(e) => updateProject(index, 'projectDescription', e.target.value)} 
                  />
                  <input 
                    className="card p-3" 
                    placeholder="Skills Used (comma separated)" 
                    value={proj.skillsUsed} 
                    onChange={(e) => updateProject(index, 'skillsUsed', e.target.value)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Certifications</h3>
            <button type="button" onClick={addCertification} className="btn-primary text-sm px-3 py-1">+ Add Certification</button>
          </div>
          <div className="space-y-4">
            {form.certifications.map((cert, index) => (
              <div key={index} className="card p-4 border-l-4 border-yellow-500">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Certification #{index + 1}</h4>
                  {form.certifications.length > 1 && (
                    <button type="button" onClick={() => removeCertification(index)} className="text-red-500 hover:text-red-700">Remove</button>
                  )}
                </div>
                <div className="space-y-3">
                  <input 
                    className="card p-3" 
                    placeholder="Certification Name" 
                    value={cert.certificationName} 
                    onChange={(e) => updateCertification(index, 'certificationName', e.target.value)} 
                  />
                  <input 
                    className="card p-3" 
                    type="date" 
                    placeholder="Date Issued" 
                    value={cert.dateIssued} 
                    onChange={(e) => updateCertification(index, 'dateIssued', e.target.value)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-primary md:col-span-2" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
        {message && <div className="text-white/80 md:col-span-2">{message}</div>}
      </form>
    </div>
  );
}


