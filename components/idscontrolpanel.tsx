'use client';

import { useState } from 'react';
import { SecurityEvent } from '../app/types/security';

export default function IDSControlPanel({ onNewEvents }: { onNewEvents: (events: SecurityEvent[]) => void }) {
  const [log, setLog] = useState<string[]>([]);

  const logEvent = (msg: string) =>
    setLog((prev) => [...prev.slice(-19), msg]);

  const request = async (body: any): Promise<SecurityEvent[]> => {
    const res = await fetch('/api/log-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.events?.length) {
      onNewEvents(data.events); 
    }
    return data.events || [];
  };

  const simulateBruteForce = async () => {
    const ip = '192.168.1.50';
    for (let i = 0; i < 7; i++) {
      const events = await request({ ip, success: false });
      logEvent(
        `Brute Force Attempt ${i + 1}: ${
          events.map((e) => e.event_type).join(', ') || 'None'
        }`
      );
      await new Promise((res) => setTimeout(res, 200));
    }
  };

  const simulatePortScan = async () => {
    const ip = '192.168.60.60';
    for (let port = 20; port < 35; port++) {
      const events = await request({ ip, port });
      logEvent(
        `Port Scan on ${port}: ${
          events.map((e) => e.event_type).join(', ') || 'None'
        }`
      );
      await new Promise((res) => setTimeout(res, 150));
    }
  };

  const simulateHighRate = async () => {
    const ip = '192.168.70.70';
    for (let i = 0; i < 60; i++) {
      const events = await request({ ip });
      if (events.length) {
        logEvent(`High Rate Event: ${events.map((e) => e.event_type).join(', ')}`);
      }
      await new Promise((res) => setTimeout(res, 50));
    }
  };

  const simulateMixed = async () => {
    logEvent('🎲 Starting Mixed Simulation');
    await simulateBruteForce();
    await simulatePortScan();
    await simulateHighRate();
    logEvent('✅ Mixed Simulation Complete');
  };

  const simulateSafe = async () => {
    const ip = '192.168.1.1';
    for (let i = 0; i < 3; i++) {
      const events = await request({ ip, success: true });
      logEvent(
        `Safe Request ${i + 1}: ${
          events.map((e) => e.event_type).join(', ') || 'None'
        }`
      );
    }
  };

  const clearLocal = () => {
    localStorage.removeItem('securityEvents');
    setLog([]);
    window.location.reload();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-bold mb-4">🧪 IDS Test Panel</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={simulateBruteForce} className="bg-red-500 text-white px-3 py-1 rounded">
          Brute Force
        </button>
        <button onClick={simulatePortScan} className="bg-orange-500 text-white px-3 py-1 rounded">
          Port Scan
        </button>
        <button onClick={simulateHighRate} className="bg-yellow-500 text-white px-3 py-1 rounded">
          High Rate
        </button>
        <button onClick={simulateMixed} className="bg-purple-600 text-white px-3 py-1 rounded">
          Mixed
        </button>
        <button onClick={simulateSafe} className="bg-green-500 text-white px-3 py-1 rounded">
          Safe Traffic
        </button>
        <button onClick={clearLocal} className="bg-gray-700 text-white px-3 py-1 rounded">
          Clear Events
        </button>
      </div>
      <div className="h-48 overflow-auto bg-gray-100 rounded p-2 text-sm text-black">
        {log.map((msg, i) => (
          <div key={i}>• {msg}</div>
        ))}
      </div>
    </div>
  );
}
