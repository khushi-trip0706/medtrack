import React, { useState, useEffect } from 'react';
import { Upload, User, Heart, Calendar, FileText, ShoppingCart, MessageCircle, Bell, LogOut, CheckCircle, XCircle, Activity, Users, DollarSign, Package } from 'lucide-react';

const styles = {
  landingContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #EFF6FF, #E0E7FF)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '2rem',
    maxWidth: '28rem',
    width: '100%'
  },
  cardWide: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '2rem',
    maxWidth: '42rem',
    width: '100%'
  },
  button: {
    width: '100%',
    backgroundColor: '#4F46E5',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem'
  },
  buttonGreen: {
    backgroundColor: '#059669',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600'
  },
  buttonRed: {
    backgroundColor: '#DC2626',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #D1D5DB',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  sidebar: {
    width: '16rem',
    backgroundColor: '#312E81',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  sidebarButton: {
    width: '100%',
    textAlign: 'left',
    padding: '0.75rem 1.5rem',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  },
  mainLayout: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#F3F4F6'
  },
  mainContent: {
    flex: 1,
    overflow: 'auto'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};

const HealthcareDApp = () => {
  const [account, setAccount] = useState('');
  const [userRole, setUserRole] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [notifications, setNotifications] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [pendingDoctors, setPendingDoctors] = useState([
    { address: '0x123...', name: 'Dr. Aditya Joshi', specialization: 'Cardiology', experience: 10, fees: 0.05 }
  ]);
  
  const [approvedDoctors, setApprovedDoctors] = useState([
    { address: '0x456...', name: 'Dr. Khushi Tripathi', specialization: 'Neurology', experience: 15, fees: 0.08 },
    { address: '0x789...', name: 'Dr. Ananya Pandey', specialization: 'Pediatrics', experience: 8, fees: 0.04 }
  ]);

  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol 500mg', price: 0.001, quantity: 1000 },
    { id: 2, name: 'Amoxicillin 250mg', price: 0.002, quantity: 500 }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'John Doe', doctorName: 'Dr. Michael Chen', date: '2025-11-20', status: 'Booked', fees: 0.08 }
  ]);

  const [patients, setPatients] = useState([
    { address: '0xabc...', name: 'John Doe', email: 'john@example.com', totalAppointments: 3 }
  ]);

  const [patientForm, setPatientForm] = useState({ name: '', email: '', allergies: '', currentMedications: '' });
  const [doctorForm, setDoctorForm] = useState({ name: '', email: '', specialization: '', experience: '', fees: '' });
  const [medicineForm, setMedicineForm] = useState({ name: '', price: '', quantity: '' });
  const [appointmentForm, setAppointmentForm] = useState({ doctor: '', date: '' });

  useEffect(() => {
    setNotifications([
      { id: 1, message: 'New appointment booked', isRead: false }
    ]);
  }, []);

  const connectWallet = () => {
    setAccount('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
    setUserRole('admin');
  };

  const registerPatient = () => {
    alert('Patient registered successfully!');
    setUserRole('patient');
    setCurrentPage('patient-dashboard');
  };

  const registerDoctor = () => {
    alert('Doctor registration submitted!');
    setCurrentPage('home');
  };

  const approveDoctor = (doctor) => {
    setApprovedDoctors([...approvedDoctors, doctor]);
    setPendingDoctors(pendingDoctors.filter(d => d.address !== doctor.address));
    alert(`Doctor ${doctor.name} approved!`);
  };

  const addMedicine = () => {
    setMedicines([...medicines, {
      id: medicines.length + 1,
      name: medicineForm.name,
      price: parseFloat(medicineForm.price),
      quantity: parseInt(medicineForm.quantity)
    }]);
    setMedicineForm({ name: '', price: '', quantity: '' });
    alert('Medicine added!');
  };

  if (!account) {
    return (
      <div style={styles.landingContainer}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Heart style={{ width: '4rem', height: '4rem', color: '#EF4444', margin: '0 auto 1rem' }} />
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '0.5rem' }}>
              Healthcare DApp
            </h1>
            <p style={{ color: '#6B7280' }}>Decentralized Healthcare Management System</p>
          </div>
          <button style={styles.button} onClick={connectWallet}>
            Connect MetaMask Wallet
          </button>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', textAlign: 'center', marginTop: '1rem' }}>
            Connect your wallet to access the platform
          </p>
        </div>
      </div>
    );
  }

  if (currentPage === 'home' && !userRole) {
    return (
      <div style={styles.landingContainer}>
        <div style={styles.cardWide}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
            Register As
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button
              onClick={() => setCurrentPage('register-patient')}
              style={{
                padding: '1.5rem',
                border: '2px solid #C7D2FE',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              <User style={{ width: '3rem', height: '3rem', color: '#4F46E5', margin: '0 auto 0.5rem' }} />
              <p style={{ fontWeight: '600' }}>Patient</p>
            </button>
            <button
              onClick={() => setCurrentPage('register-doctor')}
              style={{
                padding: '1.5rem',
                border: '2px solid #BBF7D0',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              <Activity style={{ width: '3rem', height: '3rem', color: '#059669', margin: '0 auto 0.5rem' }} />
              <p style={{ fontWeight: '600' }}>Doctor</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'register-patient') {
    return (
      <div style={styles.landingContainer}>
        <div style={styles.card}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Patient Registration</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Full Name"
              value={patientForm.name}
              onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={patientForm.email}
              onChange={(e) => setPatientForm({...patientForm, email: e.target.value})}
              style={styles.input}
            />
            <textarea
              placeholder="Allergies"
              value={patientForm.allergies}
              onChange={(e) => setPatientForm({...patientForm, allergies: e.target.value})}
              style={{...styles.input, minHeight: '4rem'}}
            />
            <button style={styles.button} onClick={registerPatient}>Register</button>
            <button 
              style={{...styles.button, backgroundColor: '#E5E7EB', color: '#1F2937'}}
              onClick={() => setCurrentPage('home')}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'register-doctor') {
    return (
      <div style={styles.landingContainer}>
        <div style={styles.card}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Doctor Registration</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Full Name"
              value={doctorForm.name}
              onChange={(e) => setDoctorForm({...doctorForm, name: e.target.value})}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={doctorForm.email}
              onChange={(e) => setDoctorForm({...doctorForm, email: e.target.value})}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Specialization"
              value={doctorForm.specialization}
              onChange={(e) => setDoctorForm({...doctorForm, specialization: e.target.value})}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Years of Experience"
              value={doctorForm.experience}
              onChange={(e) => setDoctorForm({...doctorForm, experience: e.target.value})}
              style={styles.input}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Consultation Fees (ETH)"
              value={doctorForm.fees}
              onChange={(e) => setDoctorForm({...doctorForm, fees: e.target.value})}
              style={styles.input}
            />
            <div style={{
              border: '2px dashed #D1D5DB',
              borderRadius: '0.5rem',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <Upload style={{ width: '2rem', height: '2rem', color: '#9CA3AF', margin: '0 auto 0.5rem' }} />
              <label style={{ color: '#4F46E5', cursor: 'pointer' }}>
                Upload Certification
                <input type="file" style={{ display: 'none' }} />
              </label>
            </div>
            <button style={{...styles.button, backgroundColor: '#059669'}} onClick={registerDoctor}>
              Submit for Approval
            </button>
            <button 
              style={{...styles.button, backgroundColor: '#E5E7EB', color: '#1F2937'}}
              onClick={() => setCurrentPage('home')}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.mainLayout}>
      <div style={styles.sidebar}>
        <div style={{ padding: '1.5rem' }}>
          <Heart style={{ width: '2.5rem', height: '2.5rem', marginBottom: '0.5rem' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Healthcare DApp</h2>
          <p style={{ fontSize: '0.875rem', color: '#C7D2FE', marginTop: '0.25rem' }}>
            {userRole === 'admin' ? 'Admin' : userRole === 'doctor' ? 'Doctor' : 'Patient'} Portal
          </p>
        </div>
        
        <nav style={{ marginTop: '1.5rem', flex: 1 }}>
          {userRole === 'admin' && (
            <>
              <button
                onClick={() => setCurrentPage('admin-dashboard')}
                style={{
                  ...styles.sidebarButton,
                  backgroundColor: currentPage === 'admin-dashboard' ? '#1E1B4B' : 'transparent'
                }}
              >
                <Activity style={{ display: 'inline', width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }} />
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('verify-doctors')}
                style={{
                  ...styles.sidebarButton,
                  backgroundColor: currentPage === 'verify-doctors' ? '#1E1B4B' : 'transparent'
                }}
              >
                <Users style={{ display: 'inline', width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }} />
                Verify Doctors
              </button>
              <button
                onClick={() => setCurrentPage('add-medicine')}
                style={{
                  ...styles.sidebarButton,
                  backgroundColor: currentPage === 'add-medicine' ? '#1E1B4B' : 'transparent'
                }}
              >
                <Package style={{ display: 'inline', width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }} />
                Add Medicine
              </button>
            </>
          )}
          
          {userRole === 'patient' && (
            <>
              <button
                onClick={() => setCurrentPage('patient-dashboard')}
                style={{
                  ...styles.sidebarButton,
                  backgroundColor: currentPage === 'patient-dashboard' ? '#1E1B4B' : 'transparent'
                }}
              >
                <Activity style={{ display: 'inline', width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }} />
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('book-appointment')}
                style={{
                  ...styles.sidebarButton,
                  backgroundColor: currentPage === 'book-appointment' ? '#1E1B4B' : 'transparent'
                }}
              >
                <Calendar style={{ display: 'inline', width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }} />
                Book Appointment
              </button>
              <button
                onClick={() => setCurrentPage('marketplace')}
                style={{
                  ...styles.sidebarButton,
                  backgroundColor: currentPage === 'marketplace' ? '#1E1B4B' : 'transparent'
                }}
              >
                <ShoppingCart style={{ display: 'inline', width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }} />
                Marketplace
              </button>
            </>
          )}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid #4C1D95' }}>
          <button
            onClick={() => {setAccount(''); setUserRole(''); setCurrentPage('home');}}
            style={styles.sidebarButton}
          >
            <LogOut style={{ display: 'inline', width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }} />
            Disconnect
          </button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>
            {currentPage === 'admin-dashboard' && 'Admin Dashboard'}
            {currentPage === 'verify-doctors' && 'Verify Doctors'}
            {currentPage === 'add-medicine' && 'Add Medicine'}
            {currentPage === 'patient-dashboard' && 'Patient Dashboard'}
            {currentPage === 'book-appointment' && 'Book Appointment'}
            {currentPage === 'marketplace' && 'Medicine Marketplace'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Bell style={{ width: '1.5rem', height: '1.5rem', color: '#4B5563', cursor: 'pointer' }} />
              {notifications.filter(n => !n.isRead).length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-0.25rem',
                  right: '-0.25rem',
                  backgroundColor: '#EF4444',
                  color: 'white',
                  fontSize: '0.75rem',
                  borderRadius: '9999px',
                  width: '1rem',
                  height: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>
              {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {currentPage === 'admin-dashboard' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              <div style={styles.statCard}>
                <Users style={{ width: '2rem', height: '2rem', color: '#3B82F6', marginBottom: '0.5rem' }} />
                <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Total Patients</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{patients.length}</p>
              </div>
              <div style={styles.statCard}>
                <Activity style={{ width: '2rem', height: '2rem', color: '#10B981', marginBottom: '0.5rem' }} />
                <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Total Doctors</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{approvedDoctors.length}</p>
              </div>
              <div style={styles.statCard}>
                <Calendar style={{ width: '2rem', height: '2rem', color: '#8B5CF6', marginBottom: '0.5rem' }} />
                <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Appointments</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{appointments.length}</p>
              </div>
              <div style={styles.statCard}>
                <DollarSign style={{ width: '2rem', height: '2rem', color: '#F59E0B', marginBottom: '0.5rem' }} />
                <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Total Earnings</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>1.24 ETH</p>
              </div>
            </div>
          )}

          {currentPage === 'verify-doctors' && (
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Pending Verifications</h3>
              {pendingDoctors.map((doctor, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderBottom: '1px solid #E5E7EB'
                }}>
                  <div>
                    <p style={{ fontWeight: '600' }}>{doctor.name}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{doctor.specialization}</p>
                    <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
                      Experience: {doctor.experience} years | Fees: {doctor.fees} ETH
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => approveDoctor(doctor)} style={styles.buttonGreen}>
                      <CheckCircle style={{ width: '1.25rem', height: '1.25rem' }} />
                    </button>
                    <button style={styles.buttonRed}>
                      <XCircle style={{ width: '1.25rem', height: '1.25rem' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentPage === 'add-medicine' && (
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              maxWidth: '28rem'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Add New Medicine</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={medicineForm.name}
                  onChange={(e) => setMedicineForm({...medicineForm, name: e.target.value})}
                  style={styles.input}
                />
                <input
                  type="number"
                  step="0.001"
                  placeholder="Price (ETH)"
                  value={medicineForm.price}
                  onChange={(e) => setMedicineForm({...medicineForm, price: e.target.value})}
                  style={styles.input}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={medicineForm.quantity}
                  onChange={(e) => setMedicineForm({...medicineForm, quantity: e.target.value})}
                  style={styles.input}
                />
                <button style={styles.button} onClick={addMedicine}>Add Medicine</button>
              </div>
            </div>
          )}

          {currentPage === 'patient-dashboard' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div style={styles.statCard}>
                <Calendar style={{ width: '2rem', height: '2rem', color: '#3B82F6', marginBottom: '0.5rem' }} />
                <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Total Appointments</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>3</p>
              </div>
              <div style={styles.statCard}>
                <FileText style={{ width: '2rem', height: '2rem', color: '#10B981', marginBottom: '0.5rem' }} />
                <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Prescriptions</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>5</p>
              </div>
              <div style={styles.statCard}>
                <ShoppingCart style={{ width: '2rem', height: '2rem', color: '#8B5CF6', marginBottom: '0.5rem' }} />
                <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Orders</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>8</p>
              </div>
            </div>
          )}

          {currentPage === 'book-appointment' && (
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Available Doctors</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {approvedDoctors.map((doctor, idx) => (
                  <div key={idx} style={{
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    <p style={{ fontWeight: '600', fontSize: '1.125rem' }}>{doctor.name}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{doctor.specialization}</p>
                    <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Experience: {doctor.experience} years</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4F46E5', marginTop: '0.5rem' }}>
                      Fees: {doctor.fees} ETH
                    </p>
                    <button
                      onClick={() => setAppointmentForm({...appointmentForm, doctor: doctor.name})}
                      style={{...styles.button, marginTop: '0.75rem'}}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentPage === 'marketplace' && (
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Medicine Marketplace</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {medicines.map((medicine) => (
                  <div key={medicine.id} style={{
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    <Package style={{ width: '3rem', height: '3rem', color: '#4F46E5', marginBottom: '0.5rem' }} />
                    <p style={{ fontWeight: '600' }}>{medicine.name}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Price: {medicine.price} ETH</p>
                    <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Stock: {medicine.quantity}</p>
                    <button style={{...styles.button, backgroundColor: '#059669', marginTop: '0.75rem'}}>
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthcareDApp;