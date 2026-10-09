import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('job_applications');
    return saved ? JSON.parse(saved) : [
      { id: 1, company: 'Google', role: 'Frontend Developer', status: 'Interview', date: '2026-10-12', salary: '$120k' },
      { id: 2, company: 'NetSol', role: 'React Developer', status: 'Applied', date: '2026-10-05', salary: 'Negotiable' },
      { id: 3, company: 'Systems Ltd', role: 'Software Engineer', status: 'Offer', date: '2026-09-28', salary: '150k PKR' },
      { id: 4, company: 'Folio3', role: 'React Native Dev', status: 'Rejected', date: '2026-09-20', salary: '100k PKR' }
    ];
  });

  const [prepNotes, setPrepNotes] = useState(() => {
    const savedNotes = localStorage.getItem('prep_notes');
    return savedNotes ? JSON.parse(savedNotes) : [
      { id: 1, title: 'Virtual DOM', content: 'React ka lightweight copy jo actual DOM ko optimize aur fast update karta hai.' },
      { id: 2, title: 'useEffect', content: 'Component mount, update, ya unmount hone par side-effects (jaise API fetching) handle karne ke liye use hota hai.' },
      { id: 3, title: 'Custom Hooks', content: 'Code ko reusable banane ke liye apni custom logic wali hooks (e.g., useAuth) banana.' },
      { id: 4, title: 'Closure', content: 'Aisa function jo apne outer scope ke variables ko yaad rakhta hai aur access kar sakta hai.' },
      { id: 5, title: 'Async/Await', content: 'Promises ko handle karne ka clean aur readable modern tareeqa.' }
    ];
  });

  const [resumes, setResumes] = useState(() => {
    const saved = localStorage.getItem('career_resumes');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Frontend Developer Resume v2', link: 'https://drive.google.com/resume-frontend', date: '2026-09-10' },
      { id: 2, title: 'Full Stack General Resume', link: 'https://drive.google.com/resume-fullstack', date: '2026-08-15' }
    ];
  });

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('career_contacts');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Ali Ahmed', company: 'Google', role: 'HR Recruiter', email: 'ali.ahmed@google.com', phone: '+92 300 1234567' },
      { id: 2, name: 'Sara Khan', company: 'Systems Ltd', role: 'Tech Lead', email: 'sara.k@systemsltd.com', phone: '+92 321 9876543' }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ company: '', role: '', status: 'Applied', date: '', salary: '' });

  const [noteForm, setNoteForm] = useState({ title: '', content: '' });
  const [resumeForm, setResumeForm] = useState({ title: '', link: '', date: '' });
  const [contactForm, setContactForm] = useState({ name: '', company: '', role: '', email: '', phone: '' });

  useEffect(() => { localStorage.setItem('job_applications', JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem('prep_notes', JSON.stringify(prepNotes)); }, [prepNotes]);
  useEffect(() => { localStorage.setItem('career_resumes', JSON.stringify(resumes)); }, [resumes]);
  useEffect(() => { localStorage.setItem('career_contacts', JSON.stringify(contacts)); }, [contacts]);

  const handleAddJob = (e) => {
    e.preventDefault();
    if (!form.company || !form.role) return;
    setApplications([...applications, { id: Date.now(), ...form }]);
    setForm({ company: '', role: '', status: 'Applied', date: '', salary: '' });
    setShowModal(false);
  };
  const deleteJob = (id) => setApplications(applications.filter(j => j.id !== id));

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteForm.title || !noteForm.content) return;
    setPrepNotes([...prepNotes, { id: Date.now(), ...noteForm }]);
    setNoteForm({ title: '', content: '' });
  };
  const deleteNote = (id) => setPrepNotes(prepNotes.filter(n => n.id !== id));

  const handleAddResume = (e) => {
    e.preventDefault();
    if (!resumeForm.title || !resumeForm.link) return;
    setResumes([...resumes, { id: Date.now(), ...resumeForm }]);
    setResumeForm({ title: '', link: '', date: '' });
  };
  const deleteResume = (id) => setResumes(resumes.filter(r => r.id !== id));

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.company) return;
    setContacts([...contacts, { id: Date.now(), ...contactForm }]);
    setContactForm({ name: '', company: '', role: '', email: '', phone: '' });
  };
  const deleteContact = (id) => setContacts(contacts.filter(c => c.id !== id));

  const filteredApplications = applications.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Offer': return { bg: '#dcfce7', color: '#166534' };
      case 'Interview': return { bg: '#fef9c3', color: '#854d0e' };
      case 'Rejected': return { bg: '#fee2e2', color: '#991b1b' };
      default: return { bg: '#e0f2fe', color: '#0369a1' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      
      {/* Professional Header / Navbar */}
      <nav style={{ background: '#0f172a', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '0.5px' }}>
          🚀 CareerHub Enterprise
        </h2>
        
        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('dashboard')} style={{ background: 'none', border: 'none', color: activeTab === 'dashboard' ? '#38bdf8' : '#94a3b8', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600' }}>Dashboard</button>
          <button onClick={() => setActiveTab('applications')} style={{ background: 'none', border: 'none', color: activeTab === 'applications' ? '#38bdf8' : '#94a3b8', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600' }}>Applications</button>
          <button onClick={() => setActiveTab('prep')} style={{ background: 'none', border: 'none', color: activeTab === 'prep' ? '#38bdf8' : '#94a3b8', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600' }}>Interview Prep</button>
          <button onClick={() => setActiveTab('resumes')} style={{ background: 'none', border: 'none', color: activeTab === 'resumes' ? '#38bdf8' : '#94a3b8', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600' }}>Resumes & Docs</button>
          <button onClick={() => setActiveTab('contacts')} style={{ background: 'none', border: 'none', color: activeTab === 'contacts' ? '#38bdf8' : '#94a3b8', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600' }}>Recruiters</button>
        </div>

        <button onClick={() => setShowModal(true)} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>+ Add Job</button>
      </nav>

      {/* Main Container */}
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 style={{ marginBottom: '1.5rem', color: '#0f172a' }}>Executive Career Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #2563eb' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem' }}>Total Applications</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>{applications.length}</p>
              </div>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #eab308' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem' }}>Interviews Scheduled</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>{applications.filter(j => j.status === 'Interview').length}</p>
              </div>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #22c55e' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem' }}>Offers Received</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>{applications.filter(j => j.status === 'Offer').length}</p>
              </div>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #ef4444' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem' }}>Rejected</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>{applications.filter(j => j.status === 'Rejected').length}</p>
              </div>
            </div>
            
            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Recent Activity Feed</h3>
            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              {applications.slice(-5).reverse().map(job => {
                const badge = getStatusStyle(job.status);
                return (
                  <div key={job.id} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: '#0f172a' }}>{job.company}</strong> - <span style={{ color: '#64748b' }}>{job.role}</span>
                    </div>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', background: badge.bg, color: badge.color }}>
                      {job.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATIONS LIST */}
        {activeTab === 'applications' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h1 style={{ color: '#0f172a', margin: 0 }}>All Job Applications</h1>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <input type="text" placeholder="Search company or role..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', width: '220px' }} />
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <option value="All">All Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '1rem' }}>Company</th>
                    <th style={{ padding: '1rem' }}>Role</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem' }}>Date Applied</th>
                    <th style={{ padding: '1rem' }}>Salary</th>
                    <th style={{ padding: '1rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.length > 0 ? filteredApplications.map(job => {
                    const badge = getStatusStyle(job.status);
                    return (
                      <tr key={job.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '1rem', fontWeight: '600', color: '#0f172a' }}>{job.company}</td>
                        <td style={{ padding: '1rem', color: '#334155' }}>{job.role}</td>
                        <td style={{ padding: '1rem' }}><span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', background: badge.bg, color: badge.color }}>{job.status}</span></td>
                        <td style={{ padding: '1rem', color: '#64748b' }}>{job.date || 'N/A'}</td>
                        <td style={{ padding: '1rem', color: '#64748b' }}>{job.salary || 'N/A'}</td>
                        <td style={{ padding: '1rem' }}><button onClick={() => deleteJob(job.id)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Delete</button></td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No applications found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: INTERVIEW PREP */}
        {activeTab === 'prep' && (
          <div>
            <h1 style={{ color: '#0f172a', margin: '0 0 0.5rem 0' }}>Interview Preparation Hub</h1>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Save and manage your technical notes, algorithms, and behavioral questions.</p>
            
            <form onSubmit={handleAddNote} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: 0, color: '#0f172a' }}>Add New Prep Note</h3>
              <input type="text" placeholder="Topic Title (e.g. System Design Basics)" value={noteForm.title} onChange={e => setNoteForm({...noteForm, title: e.target.value})} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <textarea placeholder="Write your notes or questions here..." value={noteForm.content} onChange={e => setNoteForm({...noteForm, content: e.target.value})} required rows="3" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }} />
              <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', alignSelf: 'flex-start' }}>Add Note</button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {prepNotes.map(note => (
                <div key={note.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ marginTop: 0, color: '#0f172a' }}>💡 {note.title}</h3>
                    <p style={{ color: '#475569', lineHeight: '1.6' }}>{note.content}</p>
                  </div>
                  <button onClick={() => deleteNote(note.id)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', alignSelf: 'flex-end', marginTop: '1rem' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RESUMES & DOCS */}
        {activeTab === 'resumes' && (
          <div>
            <h1 style={{ color: '#0f172a', margin: '0 0 0.5rem 0' }}>Resume & Cover Letter Vault</h1>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Keep track of your customized resume links and portfolio documents.</p>
            
            <form onSubmit={handleAddResume} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: 0, color: '#0f172a' }}>Add Resume / Doc Link</h3>
              <input type="text" placeholder="Resume Version Title (e.g. React Specialized Resume)" value={resumeForm.title} onChange={e => setResumeForm({...resumeForm, title: e.target.value})} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input type="url" placeholder="Document Link (e.g. Google Drive URL)" value={resumeForm.link} onChange={e => setResumeForm({...resumeForm, link: e.target.value})} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input type="date" value={resumeForm.date} onChange={e => setResumeForm({...resumeForm, date: e.target.value})} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', alignSelf: 'flex-start' }}>Save Document</button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {resumes.map(res => (
                <div key={res.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ marginTop: 0, color: '#0f172a' }}>📄 {res.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Updated: {res.date || 'N/A'}</p>
                    <a href={res.link} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none', wordBreak: 'break-all' }}>Open Document ↗</a>
                  </div>
                  <button onClick={() => deleteResume(res.id)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', alignSelf: 'flex-end', marginTop: '1rem' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: RECRUITER CONTACTS */}
        {activeTab === 'contacts' && (
          <div>
            <h1 style={{ color: '#0f172a', margin: '0 0 0.5rem 0' }}>Recruiter & Network Directory</h1>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Save HR contacts, hiring managers, and networking leads.</p>
            
            <form onSubmit={handleAddContact} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: 0, color: '#0f172a' }}>Add New Contact</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <input type="text" placeholder="Contact Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="text" placeholder="Company" value={contactForm.company} onChange={e => setContactForm({...contactForm, company: e.target.value})} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="text" placeholder="Role (e.g. HR Manager)" value={contactForm.role} onChange={e => setContactForm({...contactForm, role: e.target.value})} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="email" placeholder="Email Address" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="text" placeholder="Phone Number" value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', alignSelf: 'flex-start' }}>Save Contact</button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {contacts.map(c => (
                <div key={c.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ marginTop: 0, color: '#0f172a' }}>👤 {c.name} <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'normal' }}>({c.company})</span></h3>
                    <p style={{ color: '#334155', margin: '0.3rem 0' }}><strong>Role:</strong> {c.role || 'N/A'}</p>
                    <p style={{ color: '#334155', margin: '0.3rem 0' }}><strong>Email:</strong> {c.email || 'N/A'}</p>
                    <p style={{ color: '#334155', margin: '0.3rem 0' }}><strong>Phone:</strong> {c.phone || 'N/A'}</p>
                  </div>
                  <button onClick={() => deleteContact(c.id)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', alignSelf: 'flex-end', marginTop: '1rem' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* GLOBAL MODAL FOR ADDING JOB */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginTop: 0, color: '#0f172a' }}>Add New Application</h2>
            <form onSubmit={handleAddJob} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Company Name" value={form.company} onChange={e => setForm({...form, company: e.target.value})} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input type="text" placeholder="Job Role (e.g. Frontend Dev)" value={form.role} onChange={e => setForm({...form, role: e.target.value})} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
              <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input type="text" placeholder="Expected Salary (Optional)" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: '#e2e8f0', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Save Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}