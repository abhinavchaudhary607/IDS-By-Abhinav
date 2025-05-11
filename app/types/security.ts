export interface SecurityEvent {
    id: string;
    timestamp: string;
    event_type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    source_ip: string;
    description: string;
    status: 'new' | 'investigating' | 'resolved';
  }
  
  export interface NetworkActivity {
    timestamp: number;
    ip: string;
    requestCount: number;
    lastRequest: number;
  }
  
  export const DETECTION_CONFIG = {
    REQUEST_RATE_THRESHOLD: 50,
    CONCURRENT_CONNECTIONS_THRESHOLD: 20,
    FAILED_LOGIN_THRESHOLD: 5,
    PORT_SCAN_THRESHOLD: 10,
    MONITORING_INTERVAL: 10000,
  };
  