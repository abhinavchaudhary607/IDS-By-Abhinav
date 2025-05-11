'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { SecurityEvent, DETECTION_CONFIG } from '../types/security';
import IDSControlPanel from '../../components/idscontrolpanel';
export default function Home() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    event_type: '',
    severity: 'low' as SecurityEvent['severity'],
    source_ip: '',
    description: ''
  });
  
  useEffect(() => {
    const storedEvents = localStorage.getItem('securityEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(events);
      localStorage.setItem('securityEvents', JSON.stringify(events));
    }
    setLoading(false);
    // const monitorInterval = setInterval(monitorSystem, DETECTION_CONFIG.MONITORING_INTERVAL);
    // return () => clearInterval(monitorInterval);
  }, []);

  const monitorSystem = async () => {
    try {
      const res = await fetch('/api/log-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip: '192.168.1.50', port: 80 }) 
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
  
      const { events: newEvents } = await res.json();
  
      if (newEvents.length > 0) {
        const updatedEvents = [...newEvents, ...events];
        setEvents(updatedEvents);
        localStorage.setItem('securityEvents', JSON.stringify(updatedEvents));
      }
    } catch (error) {
      console.error('Error monitoring system:', error);
    }
  };
  
  

  const addEvent = (event: SecurityEvent) => {
    const updatedEvents = [event, ...events];
    setEvents(updatedEvents);
    localStorage.setItem('securityEvents', JSON.stringify(updatedEvents));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event: SecurityEvent = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...newEvent,
      status: 'new'
    };
    addEvent(event);
    setNewEvent({
      event_type: '',
      severity: 'low',
      source_ip: '',
      description: ''
    });
  };

  const updateEventStatus = (id: string, newStatus: SecurityEvent['status']) => {
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, status: newStatus } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem('securityEvents', JSON.stringify(updatedEvents));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-3xl font-bold mb-8 text-black">Intrusion Detection System</h1> */}
        <IDSControlPanel onNewEvents={(newEvents) => {
              const updatedEvents = [...newEvents, ...events];
              setEvents(updatedEvents);
              localStorage.setItem('securityEvents', JSON.stringify(updatedEvents));
            }} />

        {/* Add New Event Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Security Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Type</label>
                <input
                  type="text"
                  value={newEvent.event_type}
                  onChange={(e) => setNewEvent({...newEvent, event_type: e.target.value})}
                  className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Severity</label>
                <select
                  value={newEvent.severity}
                  onChange={(e) => setNewEvent({...newEvent, severity: e.target.value as SecurityEvent['severity']})}
                  className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Source IP</label>
                <input
                  type="text"
                  value={newEvent.source_ip}
                  onChange={(e) => setNewEvent({...newEvent, source_ip: e.target.value})}
                  className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Event
            </button>
          </form>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Security Events</h2>
            <div className="flex space-x-2">
              <span className="px-3 py-1 rounded-full text-xs bg-red-600 text-white">Critical</span>
              <span className="px-3 py-1 rounded-full text-xs bg-orange-500 text-white">High</span>
              <span className="px-3 py-1 rounded-full text-xs bg-yellow-500 text-white">Medium</span>
              <span className="px-3 py-1 rounded-full text-xs bg-blue-500 text-white">Low</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No security events found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source IP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(event.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.event_type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getSeverityColor(event.severity)}`}>
                          {event.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.source_ip}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{event.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          event.status === 'new' ? 'bg-red-100 text-red-800' :
                          event.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select
                          value={event.status}
                          onChange={(e) => updateEventStatus(event.id, e.target.value as SecurityEvent['status'])}
                          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="new">New</option>
                          <option value="investigating">Investigating</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}