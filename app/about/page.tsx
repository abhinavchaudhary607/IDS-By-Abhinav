import { Users, Shield, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* About Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About Our IDS Solution</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're dedicated to providing cutting-edge intrusion detection systems that help organizations stay secure in an ever-evolving threat landscape.
          </p>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6">
            <CardContent className="space-y-4 pt-6">
              <Users className="w-12 h-12 mx-auto text-primary" />
              <h3 className="text-xl font-semibold">Expert Team</h3>
              <p className="text-muted-foreground">
                Our security experts have decades of combined experience in cybersecurity
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="space-y-4 pt-6">
              <Shield className="w-12 h-12 mx-auto text-primary" />
              <h3 className="text-xl font-semibold">Advanced Technology</h3>
              <p className="text-muted-foreground">
                Using state-of-the-art technology to detect and prevent intrusions
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="space-y-4 pt-6">
              <Award className="w-12 h-12 mx-auto text-primary" />
              <h3 className="text-xl font-semibold">Industry Recognition</h3>
              <p className="text-muted-foreground">
                Award-winning solutions trusted by leading organizations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            To provide organizations with robust, reliable, and intelligent intrusion detection systems that protect their digital assets and maintain the integrity of their networks.
          </p>
        </div>
      </div>
    </div>
  );
}