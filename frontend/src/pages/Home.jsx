import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api.js';
import Loader from '../components/Loader.jsx';
import Footer from '../components/Footer.jsx';

// Navbar component for the top navigation bar
function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-6 px-4 md:px-12 bg-gradient-to-b from-gray-900/90 to-gray-800/80 backdrop-blur-md shadow-lg fixed top-0 left-0 z-30 border-b border-gray-800">
      <div className="flex items-center gap-2">
        {/* <img src="/logo192.png" alt="Logo" className="h-9 w-9 rounded-xl shadow-lg" /> */}
        <span className="font-bold text-2xl text-white tracking-tight">Portfolio</span>
      </div>
      <ul className="hidden md:flex items-center gap-8 text-gray-100 font-medium">
        <li><a href="#home" className="hover:text-pink-400 transition">Home</a></li>
        <li><a href="#about" className="hover:text-pink-400 transition">About</a></li>
        <li><a href="#services" className="hover:text-pink-400 transition">Skills</a></li>
        <li><a href="#portfolio" className="hover:text-pink-400 transition">Experience</a></li>
        <li><a href="#page" className="hover:text-pink-400 transition">Education</a></li>
        <li><a href="#contact" className="hover:text-pink-400 transition">Contact</a></li>
      </ul>
      {/* <a
        href="#consultant"
        className="hidden md:inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
      >
        Get Free Consultant
      </a> */}
      {/* Mobile menu icon (optional) */}
    </nav>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' } }
};

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get('/getalldata');
        if (mounted) setData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Loader />;

  const admin = data?.admins?.[0];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-100">
      <Navbar />
      {/* Hero Section */}
      <section
        id="home"
        className="relative flex flex-col-reverse md:flex-row items-center justify-between pt-32 md:pt-40 pb-20 px-4 md:px-0 container mx-auto"
        style={{ minHeight: '80vh' }}
      >
        {/* Left: Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10">
          <span className="uppercase text-xs font-semibold tracking-widest text-pink-400 mb-4 bg-gray-800/60 px-3 py-1 rounded-full shadow">
            Creative Designer
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            Hi, I&apos;m{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-400">
              {admin?.name || 'Designer Haris F. Watson'}
            </span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-xl bg-gray-800/60 px-4 py-3 rounded-xl shadow">
            {admin?.userAddress ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur ac quam in congue. Proin dictum, nulla a mattis gravida, sapien purus.'}
          </p>
          <div className="flex gap-4">
            <a
              href="#about"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
            >
              Learn More
            </a>
            <a
              href="#contact"
              className="bg-gray-800 hover:bg-gray-700 text-pink-300 font-semibold px-6 py-3 rounded-lg shadow-lg border border-pink-500 transition"
            >
              Hire Me
            </a>
          </div>
          {/* Social Links */}
          <div className="flex gap-5 mt-10">
            {admin?.gitLink && (
              <a
                href={admin.gitLink}
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white text-3xl transition"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            )}
            {admin?.linkedinLink && (
              <a
                href={admin.linkedinLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-300 hover:text-blue-100 text-3xl transition"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {admin?.instaLink && (
              <a
                href={admin.instaLink}
                target="_blank"
                rel="noreferrer"
                className="text-pink-300 hover:text-pink-100 text-3xl transition"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
          </div>
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-12 md:mb-0 z-10">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-pink-500/30 via-purple-700/30 to-gray-900/30 rounded-3xl blur-2xl"></div>
            <img
              src={
                admin?.profilePhoto ||
                'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&facepad=2&q=80'
              }
              alt="Profile"
              className="h-64 w-64 md:h-96 md:w-96 rounded-3xl object-cover shadow-2xl border-4 border-gray-900 relative z-10"
              style={{
                objectPosition: 'center top',
                background:
                  'linear-gradient(135deg, #23272f 0%, #18181b 100%)'
              }}
            />
            {/* Optionally, add a tablet illustration overlay */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-40 h-8 bg-gray-800 rounded-2xl shadow-lg opacity-80"></div>
          </div>
        </div>
        {/* Subtle abstract wave pattern at the bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 md:h-40"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 1 }}
        >
          <path
            fill="#18181b"
            fillOpacity="1"
            d="M0,224L60,202.7C120,181,240,139,360,133.3C480,128,600,160,720,186.7C840,213,960,235,1080,218.7C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* About */}
      <motion.section
        id="about"
        className="p-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="section-title text-3xl md:text-4xl mb-6 text-white">About</h2>
        <motion.div
          className="card p-8 md:p-12 text-lg md:text-2xl font-medium leading-relaxed shadow-xl bg-gray-900/80"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          <span className="text-gray-200">
            {admin?.profile || 'Passionate developer crafting beautiful and performant apps.'}
          </span>
        </motion.div>
      </motion.section>

      {/* Skills */}
      <motion.section
        id="services"
        className="p-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="section-title text-3xl md:text-4xl mb-6 text-white">Skills</h2>
        <div className="flex flex-wrap gap-4 md:gap-6">
          <AnimatePresence>
            {(admin?.skills || []).map((s, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ delay: idx * 0.07, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.12, backgroundColor: '#ef4444', color: '#fff' }}
                className="card px-6 py-3 text-lg md:text-xl font-semibold shadow-md cursor-pointer transition-all text-gray-100 bg-gray-900/80"
              >
                {s}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section
        id="portfolio"
        className="p-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="section-title text-3xl md:text-4xl mb-6 text-white">Experience</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {(admin?.experience || []).map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.7, type: 'spring' }}
                className="card p-8 shadow-lg border-l-8 border-red-400/60 bg-gray-900/80"
              >
                <div className="font-bold text-2xl text-red-300 mb-2">{exp.companyName}</div>
                <div className="text-gray-400 text-base mb-1">
                  {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                </div>
                <div className="text-gray-100 mt-2 text-lg">{exp.jobDescription}</div>
                <div className="text-gray-400 mt-3 text-base">{exp.profile} • {exp.location}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        id="page"
        className="p-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="section-title text-3xl md:text-4xl mb-6 text-white">Education</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {(admin?.education || []).map((ed, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.7, type: 'spring' }}
                className="card p-8 shadow-lg border-l-8 border-gray-400/60 bg-gray-900/80"
              >
                <div className="font-bold text-2xl text-gray-200 mb-2">{ed.collegeName} <span className="text-gray-400 text-lg">({ed.degree})</span></div>
                <div className="text-gray-400 text-base mb-1">{ed.address}</div>
                <div className="text-gray-100 mt-2 text-lg">{ed.percentage}%</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section
        className="p-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="section-title text-3xl md:text-4xl mb-6 text-white">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {(admin?.projects || []).map((pr, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.7, type: 'spring' }}
                className="card p-8 shadow-lg border-l-8 border-gray-300/60 bg-gray-900/80"
              >
                <div className="font-bold text-2xl text-gray-200 mb-2">{pr.projectName}</div>
                <div className="text-gray-100 mt-2 text-lg">{pr.projectDescription}</div>
                <div className="text-gray-400 text-base mt-3">Skills: {pr.skillsUsed}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Certifications */}
      <motion.section
        id="contact"
        className="p-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="section-title text-3xl md:text-4xl mb-6 text-white">Certifications</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {(admin?.certifications || []).map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.7, type: 'spring' }}
                className="card p-8 shadow-lg border-l-8 border-yellow-400/60 bg-gray-900/80"
              >
                <div className="font-bold text-2xl text-yellow-300 mb-2">{c.certificationName}</div>
                <div className="text-gray-400 text-base">
                  {c.dateIssued ? new Date(c.dateIssued).toLocaleDateString() : ''}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        className="p-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="section-title text-3xl md:text-4xl mb-6 text-white">Get In Touch</h2>
        <div className="max-w-2xl ">
          <motion.form
            className="card p-8 shadow-xl bg-gray-900/80"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-200 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-200 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-200 font-semibold mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                placeholder="What's this about?"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-200 font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition resize-none"
                placeholder="Tell me about your project or inquiry..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
