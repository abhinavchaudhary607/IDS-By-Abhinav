import { SecurityEvent, NetworkActivity, DETECTION_CONFIG } from '../types/security';

class IntrusionDetector {
  private networkActivity: Map<string, NetworkActivity> = new Map();
  private failedLogins: Map<string, number> = new Map();
  private portScans: Map<string, Set<number>> = new Map();

  public monitorRequest(ip: string, port: number = 80): SecurityEvent[] {
    const events: SecurityEvent[] = [];
    const now = Date.now();

    const activity = this.networkActivity.get(ip) || {
      timestamp: now,
      ip,
      requestCount: 0,
      lastRequest: now
    };

    activity.requestCount++;
    activity.lastRequest = now;
    this.networkActivity.set(ip, activity);

    if (this.detectHighRequestRate(ip)) {
      events.push(this.createEvent('High Request Rate', 'medium', ip, 'Unusual number of requests detected'));
    }

    if (this.detectPortScan(ip, port)) {
      events.push(this.createEvent('Port Scan Detected', 'high', ip, 'Sequential port scanning activity detected'));
    }

    return events;
  }

  public monitorLoginAttempt(ip: string, success: boolean): SecurityEvent[] {
    const events: SecurityEvent[] = [];

    if (!success) {
      const failCount = (this.failedLogins.get(ip) || 0) + 1;
      this.failedLogins.set(ip, failCount);

      if (failCount >= DETECTION_CONFIG.FAILED_LOGIN_THRESHOLD) {
        events.push(this.createEvent('Brute Force Attempt', 'critical', ip, `${failCount} failed login attempts`));
        this.failedLogins.delete(ip);
      }
    } else {
      this.failedLogins.delete(ip);
    }

    return events;
  }

  private detectHighRequestRate(ip: string): boolean {
    const activity = this.networkActivity.get(ip);
    if (!activity) return false;

    const rpm = activity.requestCount * (60000 / DETECTION_CONFIG.MONITORING_INTERVAL);
    return rpm > DETECTION_CONFIG.REQUEST_RATE_THRESHOLD;
  }

  private detectPortScan(ip: string, port: number): boolean {
    const ports = this.portScans.get(ip) || new Set();
    ports.add(port);
    this.portScans.set(ip, ports);

    if (ports.size >= DETECTION_CONFIG.PORT_SCAN_THRESHOLD) {
      this.portScans.delete(ip);
      return true;
    }

    return false;
  }

  private createEvent(
    eventType: string,
    severity: SecurityEvent['severity'],
    ip: string,
    description: string
  ): SecurityEvent {
    return {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      event_type: eventType,
      severity,
      source_ip: ip,
      description,
      status: 'new'
    };
  }

  public simulateActivity(): SecurityEvent[] {
    const events: SecurityEvent[] = [];
    const randomIP = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    const type = Math.random();

    if (type < 0.3) {
      for (let i = 0; i < DETECTION_CONFIG.REQUEST_RATE_THRESHOLD + 10; i++) {
        events.push(...this.monitorRequest(randomIP));
      }
    } else if (type < 0.6) {
      for (let port = 20; port < 30; port++) {
        events.push(...this.monitorRequest(randomIP, port));
      }
    } else {
      for (let i = 0; i < DETECTION_CONFIG.FAILED_LOGIN_THRESHOLD + 2; i++) {
        events.push(...this.monitorLoginAttempt(randomIP, false));
      }
    }

    return events;
  }
}

export const detector = new IntrusionDetector();
