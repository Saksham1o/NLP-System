import React, { useState } from 'react';
import Header from '../Components/Header';
import { Check, Trash2 } from "lucide-react"; // ✅ Added icons

const MyTask = ({ appointments, handleDeleteAppointment }) => {
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Pay electricity bill', date: 'September 12, 2025' },
    { id: 2, text: 'Pick up dry cleaning', date: 'September 11, 2025' },
    { id: 3, text: 'Buy groceries', completed: true },
  ]);

  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderFormData, setReminderFormData] = useState({
    text: '',
    date: '',
  });

  // ✅ Reminder handlers (unchanged)
  const handleReminderInputChange = (e) => {
    const { name, value } = e.target;
    setReminderFormData({ ...reminderFormData, [name]: value });
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!reminderFormData.text || !reminderFormData.date) {
      alert('Please fill out all required fields.');
      return;
    }

    const newReminder = {
      ...reminderFormData,
      id: Date.now(),
      completed: false
    };

    setReminders([...reminders, newReminder]);
    setReminderFormData({ text: '', date: '' });
    setShowReminderForm(false);
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(rem => rem.id !== id));
  };

  const handleCompleteReminder = (id) => {
    setReminders(reminders.map(rem =>
      rem.id === id ? { ...rem, completed: !rem.completed } : rem
    ));
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-start h-[90vh] text-white p-4 font-sans antialiased pt-20">
        <div className="w-full max-w-6xl flex-grow overflow-y-auto">
          <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400">
            My Tasks Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Appointments Section */}
            <div className="bg-blue-900 border-blue-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-3xl p-6 border border-gray-700 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-teal-300">
                  Upcoming Appointments
                </h2>
              </div>

              {appointments.length === 0 ? (
                <p className="text-center text-gray-400">No appointments scheduled.</p>
              ) : (
                <div className="space-y-4">
                  {appointments.map(appt => (
                    <div 
                      key={appt.id} 
                      className="bg-gray-700 bg-opacity-50 rounded-2xl p-4 flex justify-between items-center border border-gray-600 hover:border-teal-400 transition-colors duration-200 shadow-sm"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">{appt.title}</h3>
                        <p className="text-sm text-gray-300">
                          {appt.date} at {appt.time} {appt.location && `(${appt.location})`}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteAppointment(appt.id)}
                        className="py-1 px-4 text-sm rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reminders Section with Hover Buttons */}
            <div className="bg-blue-900 border-blue-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-3xl p-6 border border-gray-700 shadow-2xl">
              <h2 className="text-2xl font-bold text-purple-300 mb-6">Active Reminders</h2>

              {showReminderForm && (
                <form onSubmit={handleAddReminder} className="grid grid-cols-1 gap-4 mb-6 p-4 rounded-2xl bg-gray-900 bg-opacity-50">
                  <input
                    type="text"
                    name="text"
                    value={reminderFormData.text}
                    onChange={handleReminderInputChange}
                    placeholder="Reminder Text"
                    className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={reminderFormData.date}
                    onChange={handleReminderInputChange}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReminderForm(false)}
                      className="py-2 px-4 rounded-full bg-gray-600 hover:bg-gray-700 transition-colors duration-200 text-sm font-semibold hover:shadow-lg transition-shadow duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 rounded-full bg-teal-600 hover:bg-teal-700 transition-colors duration-200 text-sm font-semibold hover:shadow-lg transition-shadow duration-300"
                    >
                      Add Reminder
                    </button>
                  </div>
                </form>
              )}

              {reminders.length === 0 ? (
                <p className="text-center text-gray-400">No reminders set.</p>
              ) : (
                <div className="space-y-4">
                  {reminders.map(rem => (
                    <div 
                      key={rem.id} 
                      className={`bg-gray-700 bg-opacity-50 rounded-2xl p-4 flex justify-between items-center border border-gray-600 transition-colors duration-200 shadow-sm group ${rem.completed ? 'opacity-50' : 'hover:border-purple-400'}`}
                    >
                      <div>
                        <h3 className={`text-lg font-semibold ${rem.completed ? 'line-through text-gray-400' : ''}`}>
                          {rem.text}
                        </h3>
                        {rem.date && <p className={`text-sm text-gray-300 ${rem.completed ? 'line-through' : ''}`}>Due: {rem.date}</p>}
                      </div>

                      {/* ✅ Hover Buttons (tick & cross like first code) */}
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCompleteReminder(rem.id)}
                          className={`${rem.completed ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-full w-8 h-8 flex items-center justify-center`}
                        >
                          {rem.completed ? <span className="text-xs">↶</span> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteReminder(rem.id)}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowReminderForm(!showReminderForm)}
                className="w-full mt-6 py-2 px-4 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200 text-sm font-semibold shadow-lg hover:shadow-purple-500/50 hover:shadow-2xl transition-shadow duration-300"
              >
                + Add New Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTask;