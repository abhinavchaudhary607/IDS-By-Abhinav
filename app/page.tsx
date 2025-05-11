"use client";

import { Shield, Activity, Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Next-Gen Intrusion Detection System
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Protect your network with advanced threat detection and real-time monitoring capabilities
            </p>
            <Button size="lg" className="mr-4"><Link href={'/myapp'}>Get Started</Link></Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4 pt-6">
                <Shield className="w-12 h-12 text-primary" />
                <h3 className="text-2xl font-semibold">Real-time Protection</h3>
                <p className="text-muted-foreground">
                  Continuous monitoring and instant threat detection to keep your network secure
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-4 pt-6">
                <Activity className="w-12 h-12 text-primary" />
                <h3 className="text-2xl font-semibold">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Detailed insights and analysis of network traffic and potential threats
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-4 pt-6">
                <Bell className="w-12 h-12 text-primary" />
                <h3 className="text-2xl font-semibold">Instant Alerts</h3>
                <p className="text-muted-foreground">
                  Immediate notifications when suspicious activities are detected
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}