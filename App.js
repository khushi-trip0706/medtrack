import React, { useState, useEffect } from 'react';
import { Upload, User, Heart, Calendar, FileText, ShoppingCart, MessageCircle, Bell, LogOut, CheckCircle, XCircle, Clock, Activity, Users, DollarSign, Package } from 'lucide-react';

const HealthcareDApp = () => {
  const [account, setAccount] = useState('');
  const [userRole, setUserRole] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [notifications, setNotifications] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const [pendingDoctors, setPendingDoctors] = useState([
    { address: '0x123...', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', experience: 10, fees: 0.05 }
  ]);
  
  const [approvedDoctors, setApprovedDoctors] = useState([
    { address: '0x456...', name: 'Dr. Michael Chen', specialization: 'Neurology', experience: 15, fees: 0.08, totalAppointments: 45 },
    { address: '0x789...', name: 'Dr. Emily Brown', specialization: 'Pediatrics', experience: 8, fees: 0.04, totalAppointments: 32 }
  ]);

  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol 500mg', price: 0.001, quantity: 1000 },
    { id: 2, name: 'Amoxicillin 250mg', price: 0.002, quantity: 500 },
    { id: 3, name: 'Ibuprofen 400mg', price: 0.0015, quantity: 800 }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'John Doe', doctorName: 'Dr. Michael Chen', date: '2025-11-20', status: 'Booked', fees: 0.08 },
    { id: 2, patientName: 'Jane Smith', doctorName: 'Dr. Emily Brown', date: '2025-11-22', status: 'Completed', fees: 0.04 }
  ]);

  const [medicalRecords, setMedicalRecords] = useState([
    { id: 1, doctorName: 'Dr. Michael Chen', diagnosis: 'Migraine', treatment: 'Prescribed pain relief', date: '2025-11-10' }
  ]);

  const [prescriptions, setPrescriptions] = useState([
    { id: 1, doctorName: 'Dr. Emily Brown', medicineName: 'Paracetamol 500mg', quantity: 10, date: '2025-11-12' }
  ]);

  const [orders, setOrders] = useState([
    { id: 1, medicineName: 'Ibuprofen 400mg', quantity: 20, totalPrice: 0.03, date: '2025-11-14' }
  ]);

  const [patients, setPatients] = useState([
    { address: '0xabc...', name: 'John Doe', email: 'john@example.com', totalAppointments: 3 },
    { address: '0xdef...', name: 'Jane Smith', email: 'jane@example.com', totalAppointments: 2 }
  ]);

  const [patientForm, setPatientForm] = useState({ name: '', email: '', allergies: '', currentMedications: '' });
  const [doctorForm, setDoctorForm] = useState({ name: '', email: '', specialization: '', experience: '', fees: '' });
  const [medicineForm, setMedicineForm] = useState({ name: '', price: '', quantity: '' });
  const [appointmentForm, setAppointmentForm] = useState({ doctor: '', date: '' });
  const [medicalRecordForm, setMedicalRecordForm] = useState({ patient: '', diagnosis: '', treatment: '' });
  const [prescriptionForm, setPrescriptionForm] = useState({ patient: '', medicine: '', quantity: '' });
  const [purchaseQuantity, setPurchaseQuantity] = useState({});

  useEffect(() => {
    setNotifications([
      { id: 1, message: 'New appointment booked', timestamp: new Date(), isRead: false },
      { id: 2, message: 'Prescription created', timestamp: new Date(), isRead: false }
    ]);
  }, []);

  const connectWallet = () => {
    const mockAccount = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
    setAccount(mockAccount);
    setUserRole('admin');
  };

  const registerPatient = () => {
    alert('Patient registered successfully!');
    setUserRole('patient');
    setCurrentPage('patient-dashboard');
  };

  const registerDoctor = () => {
    alert('Doctor registration submitted! Awaiting admin approval.');
    setCurrentPage('home');
  };

  const approveDoctor = (doctor) => {
    setApprovedDoctors([...approvedDoctors, doctor]);
    setPendingDoctors(pendingDoctors.filter(d => d.address !== doctor.address));
    alert(`Doctor ${doctor.name} approved!`);
  };

  const rejectDoctor = (doctor) => {
    setPendingDoctors(pendingDoctors.filter(d => d.address !== doctor.address));
    alert(`Doctor ${doctor.name} rejected!`);
  };

  const addMedicine = () => {
    const newMedicine = {
      id: medicines.length + 1,
      name: medicineForm.name,
      price: parseFloat(medicineForm.price),
      quantity: parseInt(medicineForm.quantity)
    };
    setMedicines([...medicines, newMedicine]);
    setMedicineForm({ name: '', price: '', quantity: '' });
    alert('Medicine added successfully!');
  };

  const bookAppointment = () => {
    if (!appointmentForm.doctor || !appointmentForm.date) {
      alert('Please fill all fields');
      return;
    }
    const newAppointment = {
      id: appointments.length + 1,
      patientName: 'You',
      doctorName: appointmentForm.doctor,
      date: appointmentForm.date,
      status: 'Booked',
      fees: 0.05
    };
    setAppointments([...appointments, newAppointment]);
    setAppointmentForm({ doctor: '', date: '' });
    alert('Appointment booked successfully!');
  };

  const purchaseMedicine = (medicine) => {
    const quantity = purchaseQuantity[medicine.id] || 1;
    const newOrder = {
      id: orders.length + 1,
      medicineName: medicine.name,
      quantity: quantity,
      totalPrice: medicine.price * quantity,
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([...orders, newOrder]);
    alert('Medicine purchased successfully!');
  };

  const markAppointmentComplete = (appointmentId) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'Completed' } : apt
    ));
    alert('Appointment marked as complete!');
  };

  const addMedicalRecord = () => {
    if (!medicalRecordForm.patient || !medicalRecordForm.diagnosis) {
      alert('Please fill all fields');
      return;
    }
    const newRecord = {
      id: medicalRecords.length + 1,
      doctorName: 'You',
      diagnosis: medicalRecordForm.diagnosis,
      treatment: medicalRecordForm.treatment,
      date: new Date().toISOString().split('T')[0]
    };
    setMedicalRecords([...medicalRecords, newRecord]);
    setMedicalRecordForm({ patient: '', diagnosis: '', treatment: '' });
    alert('Medical record added successfully!');
  };

  const createPrescription = () => {
    if (!prescriptionForm.patient || !prescriptionForm.medicine) {
      alert('Please fill all fields');
      return;
    }
    const newPrescription = {
      id: prescriptions.length + 1,
      doctorName: 'You',
      medicineName: prescriptionForm.medicine,
      quantity: parseInt(prescriptionForm.quantity),
      date: new Date().toISOString().split('T')[0]
    };
    setPrescriptions([...prescriptions, newPrescription]);
    setPrescriptionForm({ patient: '', medicine: '', quantity: '' });
    alert('Prescription created successfully!');
  };

  const sendChatMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, {
        id: chatMessages.length + 1,
        sender: 'You',
        message: newMessage,
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  // Landing Page
  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Healthcare DApp</h1>
            <p className="text-gray-600">Decentralized Healthcare Management System</p>
          </div>
          <button
            onClick={connectWallet}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Connect MetaMask Wallet
          </button>
          <p className="text-sm text-gray-500 text-center mt-4">
            Connect your wallet to access the platform
          </p>
        </div>
      </div>
    );
  }

  // Registration Selection
  if (currentPage === 'home' && !userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register As</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentPage('register-patient')}
              className="p-6 border-2 border-indigo-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <User className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-800">Patient</p>
            </button>
            <button
              onClick={() => setCurrentPage('register-doctor')}
              className="p-6 border-2 border-green-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition"
            >
              <Activity className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-800">Doctor</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Patient Registration
  if (currentPage === 'register-patient') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Registration</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={patientForm.name}
              onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={patientForm.email}
              onChange={(e) => setPatientForm({...patientForm, email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Allergies (if any)"
              value={patientForm.allergies}
              onChange={(e) => setPatientForm({...patientForm, allergies: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="2"
            />
            <textarea
              placeholder="Current Medications"
              value={patientForm.currentMedications}
              onChange={(e) => setPatientForm({...patientForm, currentMedications: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="2"
            />
            <button
              onClick={registerPatient}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Register
            </button>
            <button
              onClick={() => setCurrentPage('home')}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Doctor Registration
  if (currentPage === 'register-doctor') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctor Registration</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={doctorForm.name}
              onChange={(e) => setDoctorForm({...doctorForm, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={doctorForm.email}
              onChange={(e) => setDoctorForm({...doctorForm, email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Specialization"
              value={doctorForm.specialization}
              onChange={(e) => setDoctorForm({...doctorForm, specialization: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Years of Experience"
              value={doctorForm.experience}
              onChange={(e) => setDoctorForm({...doctorForm, experience: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Consultation Fees (ETH)"
              value={doctorForm.fees}
              onChange={(e) => setDoctorForm({...doctorForm, fees: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <label className="cursor-pointer text-indigo-600 hover:text-indigo-700">
                Upload Certification
                <input type="file" className="hidden" />
              </label>
            </div>
            <button
              onClick={registerDoctor}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Submit for Approval
            </button>
            <button
              onClick={() => setCurrentPage('home')}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard Layout
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6">
          <Heart className="w-10 h-10 mb-2" />
          <h2 className="text-xl font-bold">Healthcare DApp</h2>
          <p className="text-sm text-indigo-300 mt-1">
            {userRole === 'admin' ? 'Admin' : userRole === 'doctor' ? 'Doctor' : 'Patient'} Portal
          </p>
        </div>
        
        <nav className="mt-6 flex-1">
          {userRole === 'admin' && (
            <>
              <button onClick={() => setCurrentPage('admin-dashboard')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'admin-dashboard' ? 'bg-indigo-800' : ''}`}>
                <Activity className="inline w-5 h-5 mr-3" />Dashboard
              </button>
              <button onClick={() => setCurrentPage('verify-doctors')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'verify-doctors' ? 'bg-indigo-800' : ''}`}>
                <Users className="inline w-5 h-5 mr-3" />Verify Doctors
              </button>
              <button onClick={() => setCurrentPage('add-medicine')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'add-medicine' ? 'bg-indigo-800' : ''}`}>
                <Package className="inline w-5 h-5 mr-3" />Add Medicine
              </button>
            </>
          )}
          
          {userRole === 'doctor' && (
            <>
              <button onClick={() => setCurrentPage('doctor-dashboard')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'doctor-dashboard' ? 'bg-indigo-800' : ''}`}>
                <Activity className="inline w-5 h-5 mr-3" />Dashboard
              </button>
              <button onClick={() => setCurrentPage('appointments')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'appointments' ? 'bg-indigo-800' : ''}`}>
                <Calendar className="inline w-5 h-5 mr-3" />Appointments
              </button>
              <button onClick={() => setCurrentPage('patients-list')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'patients-list' ? 'bg-indigo-800' : ''}`}>
                <Users className="inline w-5 h-5 mr-3" />My Patients
              </button>
              <button onClick={() => setCurrentPage('add-record')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'add-record' ? 'bg-indigo-800' : ''}`}>
                <FileText className="inline w-5 h-5 mr-3" />Add Record
              </button>
              <button onClick={() => setCurrentPage('create-prescription')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'create-prescription' ? 'bg-indigo-800' : ''}`}>
                <FileText className="inline w-5 h-5 mr-3" />Prescriptions
              </button>
            </>
          )}
          
          {userRole === 'patient' && (
            <>
              <button onClick={() => setCurrentPage('patient-dashboard')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'patient-dashboard' ? 'bg-indigo-800' : ''}`}>
                <Activity className="inline w-5 h-5 mr-3" />Dashboard
              </button>
              <button onClick={() => setCurrentPage('book-appointment')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'book-appointment' ? 'bg-indigo-800' : ''}`}>
                <Calendar className="inline w-5 h-5 mr-3" />Book Appointment
              </button>
              <button onClick={() => setCurrentPage('marketplace')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'marketplace' ? 'bg-indigo-800' : ''}`}>
                <ShoppingCart className="inline w-5 h-5 mr-3" />Marketplace
              </button>
              <button onClick={() => setCurrentPage('my-prescriptions')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'my-prescriptions' ? 'bg-indigo-800' : ''}`}>
                <FileText className="inline w-5 h-5 mr-3" />Prescriptions
              </button>
              <button onClick={() => setCurrentPage('medical-history')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'medical-history' ? 'bg-indigo-800' : ''}`}>
                <FileText className="inline w-5 h-5 mr-3" />Medical History
              </button>
              <button onClick={() => setCurrentPage('order-history')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'order-history' ? 'bg-indigo-800' : ''}`}>
                <ShoppingCart className="inline w-5 h-5 mr-3" />Order History
              </button>
            </>
          )}
          
          <button onClick={() => setCurrentPage('chat')} className={`w-full text-left px-6 py-3 hover:bg-indigo-800 ${currentPage === 'chat' ? 'bg-indigo-800' : ''}`}>
            <MessageCircle className="inline w-5 h-5 mr-3" />Chat
          </button>
        </nav>

        <div className="p-6 border-t border-indigo-800">
          <button onClick={() => {setAccount(''); setUserRole(''); setCurrentPage('home');}} className="w-full text-left px-4 py-2 hover:bg-indigo-800 rounded">
            <LogOut className="inline w-5 h-5 mr-3" />Disconnect
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {currentPage === 'admin-dashboard' && 'Admin Dashboard'}
            {currentPage === 'doctor-dashboard' && 'Doctor Dashboard'}
            {currentPage === 'patient-dashboard' && 'Patient Dashboard'}
            {currentPage === 'verify-doctors' && 'Verify Doctors'}
            {currentPage === 'add-medicine' && 'Add Medicine'}
            {currentPage === 'appointments' && 'Appointments'}
            {currentPage === 'patients-list' && 'My Patients'}
            {currentPage === 'add-record' && 'Add Medical Record'}
            {currentPage === 'create-prescription' && 'Create Prescription'}
            {currentPage === 'book-appointment' && 'Book Appointment'}
            {currentPage === 'marketplace' && 'Medicine Marketplace'}
            {currentPage === 'my-prescriptions' && 'My Prescriptions'}
            {currentPage === 'medical-history' && 'Medical History'}
            {currentPage === 'order-history' && 'Order History'}
            {currentPage === 'chat' && 'Chat'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
              {notifications.filter(n => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {/* Admin Dashboard */}
          {currentPage === 'admin-dashboard' && (
            <div>
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <Users className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="text-gray-600 text-sm">Total Patients</p>
                  <p className="text-3xl font-bold">{patients.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <Activity className="w-8 h-8 text-green-500 mb-2" />
                  <p className="text-gray-600 text-sm">Total Doctors</p>
                  <p className="text-3xl font-bold">{approvedDoctors.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <Calendar className="w-8 h-8 text-purple-500 mb-2" />
                  <p className="text-gray-600 text-sm">Total Appointments</p>
                  <p className="text-3xl font-bold">{appointments.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <DollarSign className="w-8 h-8 text-yellow-500 mb-2" />
                  <p className="text-gray-600 text-sm">Total Earnings</p>
                  <p className="text-3xl font-bold">1.24 ETH</p>
                </div>
              </div>
            </div>
          )}

          {/* Verify Doctors */}
          {currentPage === 'verify-doctors' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Pending Verifications</h3>
              {pendingDoctors.length === 0 ? (
                <p className="text-gray-500">No pending doctor verifications</p>
              ) : (
                pendingDoctors.map((doctor, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border-b">
                    <div>
                      <p className="font-semibold">{doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      <p className="text-sm text-gray-500">Experience: {doctor.experience} years | Fees: {doctor.fees} ETH</p>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => approveDoctor(doctor)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button onClick={() => rejectDoctor(doctor)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Add Medicine */}
          {currentPage === 'add-medicine' && (
            <div className="bg-white p-6 rounded-lg shadow max-w-md">
              <h3 className="text-lg font-semibold mb-4">Add New Medicine</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={medicineForm.name}
                  onChange={(e) => setMedicineForm({...medicineForm, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  step="0.001"
                  placeholder="Price (ETH)"
                  value={medicineForm.price}
                  onChange={(e) => setMedicineForm({...medicineForm, price: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={medicineForm.quantity}
                  onChange={(e) => setMedicineForm({...medicineForm, quantity: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={addMedicine}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Add Medicine
                </button>
              </div>
            </div>
          )}

          {/* Doctor Dashboard */}
          {currentPage === 'doctor-dashboard' && (
            <div>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <Calendar className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="text-gray-600 text-sm">Total Appointments</p>
                  <p className="text-3xl font-bold">45</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <Users className="w-8 h-8 text-green-500 mb-2" />
                  <p className="text-gray-600 text-sm">Total Patients</p>
                  <p className="text-3xl font-bold">{patients.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <FileText className="w-8 h-8 text-purple-500 mb-2" />
                  <p className="text-gray-600 text-sm">Records Added</p>
                  <p className="text-3xl font-bold">{medicalRecords.length}</p>
                </div>
              </div>
            </div>
          )}

          {/* Appointments (Doctor) */}
          {currentPage === 'appointments' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">My Appointments</h3>
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{apt.patientName}</p>
                      <p className="text-sm text-gray-600">Date: {apt.date}</p>
                      <p className="text-sm text-gray-500">Fees: {apt.fees} ETH</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${apt.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {apt.status}
                      </span>
                      {apt.status === 'Booked' && (
                        <button
                          onClick={() => markAppointmentComplete(apt.id)}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Patients List (Doctor) */}
          {currentPage === 'patients-list' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">My Patients</h3>
              <div className="space-y-3">
                {patients.map((patient) => (
                  <div key={patient.address} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{patient.name}</p>
                      <p className="text-sm text-gray-600">{patient.email}</p>
                      <p className="text-sm text-gray-500">Total Appointments: {patient.totalAppointments}</p>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Medical Record (Doctor) */}
          {currentPage === 'add-record' && (
            <div className="bg-white p-6 rounded-lg shadow max-w-md">
              <h3 className="text-lg font-semibold mb-4">Add Medical Record</h3>
              <div className="space-y-4">
                <select
                  value={medicalRecordForm.patient}
                  onChange={(e) => setMedicalRecordForm({...medicalRecordForm, patient: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Patient</option>
                  {patients.map((patient) => (
                    <option key={patient.address} value={patient.address}>{patient.name}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Diagnosis"
                  value={medicalRecordForm.diagnosis}
                  onChange={(e) => setMedicalRecordForm({...medicalRecordForm, diagnosis: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="3"
                />
                <textarea
                  placeholder="Treatment"
                  value={medicalRecordForm.treatment}
                  onChange={(e) => setMedicalRecordForm({...medicalRecordForm, treatment: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="3"
                />
                <button
                  onClick={addMedicalRecord}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Add Record
                </button>
              </div>
            </div>
          )}

          {/* Create Prescription (Doctor) */}
          {currentPage === 'create-prescription' && (
            <div className="bg-white p-6 rounded-lg shadow max-w-md">
              <h3 className="text-lg font-semibold mb-4">Create Prescription</h3>
              <div className="space-y-4">
                <select
                  value={prescriptionForm.patient}
                  onChange={(e) => setPrescriptionForm({...prescriptionForm, patient: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Patient</option>
                  {patients.map((patient) => (
                    <option key={patient.address} value={patient.address}>{patient.name}</option>
                  ))}
                </select>
                <select
                  value={prescriptionForm.medicine}
                  onChange={(e) => setPrescriptionForm({...prescriptionForm, medicine: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Medicine</option>
                  {medicines.map((med) => (
                    <option key={med.id} value={med.name}>{med.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={prescriptionForm.quantity}
                  onChange={(e) => setPrescriptionForm({...prescriptionForm, quantity: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={createPrescription}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Create Prescription
                </button>
              </div>
            </div>
          )}

          {/* Patient Dashboard */}
          {currentPage === 'patient-dashboard' && (
            <div>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <Calendar className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="text-gray-600 text-sm">Total Appointments</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <FileText className="w-8 h-8 text-green-500 mb-2" />
                  <p className="text-gray-600 text-sm">Prescriptions</p>
                  <p className="text-3xl font-bold">{prescriptions.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <ShoppingCart className="w-8 h-8 text-purple-500 mb-2" />
                  <p className="text-gray-600 text-sm">Orders</p>
                  <p className="text-3xl font-bold">{orders.length}</p>
                </div>
              </div>
            </div>
          )}

          {/* Book Appointment (Patient) */}
          {currentPage === 'book-appointment' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Available Doctors</h3>
                <div className="grid grid-cols-2 gap-4">
                  {approvedDoctors.map((doctor, idx) => (
                    <div key={idx} className="border rounded-lg p-4 hover:shadow-lg transition">
                      <p className="font-semibold text-lg">{doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      <p className="text-sm text-gray-500">Experience: {doctor.experience} years</p>
                      <p className="text-sm font-semibold text-indigo-600 mt-2">Fees: {doctor.fees} ETH</p>
                      <button
                        onClick={() => setAppointmentForm({...appointmentForm, doctor: doctor.name})}
                        className="w-full mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {appointmentForm.doctor && (
                <div className="bg-white p-6 rounded-lg shadow max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Book Appointment</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={appointmentForm.doctor}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    />
                    <input
                      type="date"
                      value={appointmentForm.date}
                      onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={bookAppointment}
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Medicine Marketplace (Patient) */}
          {currentPage === 'marketplace' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Medicine Marketplace</h3>
              <div className="grid grid-cols-3 gap-4">
                {medicines.map((medicine) => (
                  <div key={medicine.id} className="border rounded-lg p-4">
                    <Package className="w-12 h-12 text-indigo-600 mb-2" />
                    <p className="font-semibold">{medicine.name}</p>
                    <p className="text-sm text-gray-600">Price: {medicine.price} ETH</p>
                    <p className="text-sm text-gray-500">Stock: {medicine.quantity}</p>
                    <div className="mt-3 flex space-x-2">
                      <input
                        type="number"
                        min="1"
                        max={medicine.quantity}
                        defaultValue="1"
                        onChange={(e) => setPurchaseQuantity({...purchaseQuantity, [medicine.id]: parseInt(e.target.value)})}
                        className="w-20 p-2 border border-gray-300 rounded"
                      />
                      <button
                        onClick={() => purchaseMedicine(medicine)}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Prescriptions (Patient) */}
          {currentPage === 'my-prescriptions' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">My Prescriptions</h3>
              <div className="space-y-3">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{prescription.medicineName}</p>
                      <p className="text-sm text-gray-600">Prescribed by: {prescription.doctorName}</p>
                      <p className="text-sm text-gray-500">Quantity: {prescription.quantity} | Date: {prescription.date}</p>
                    </div>
                    <FileText className="w-8 h-8 text-indigo-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medical History (Patient) */}
          {currentPage === 'medical-history' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Medical History</h3>
              <div className="space-y-3">
                {medicalRecords.map((record) => (
                  <div key={record.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-gray-800">{record.diagnosis}</p>
                      <span className="text-sm text-gray-500">{record.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Doctor: {record.doctorName}</p>
                    <p className="text-sm text-gray-700">Treatment: {record.treatment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order History (Patient) */}
          {currentPage === 'order-history' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Order History</h3>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{order.medicineName}</p>
                      <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                      <p className="text-sm text-gray-500">Date: {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-indigo-600">{order.totalPrice} ETH</p>
                      <span className="text-xs text-green-600">Delivered</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat */}
          {currentPage === 'chat' && (
            <div className="bg-white rounded-lg shadow h-96 flex flex-col">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Chat with Doctor/Patient</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {chatMessages.length === 0 ? (
                  <p className="text-gray-500 text-center">No messages yet. Start a conversation!</p>
                ) : (
                  chatMessages.map((msg) => (
                    <div key={msg.id} className="mb-3">
                      <div className="flex items-start space-x-2">
                        <div className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                          {msg.sender[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{msg.sender}</p>
                          <p className="text-sm text-gray-700">{msg.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{msg.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-4 border-t flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={sendChatMessage}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthcareDApp;
