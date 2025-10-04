import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Moon,
  Sun,
  Camera,
  Save,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Settings: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Management',
    location: 'New York, NY',
    bio: 'Experienced manager with a focus on team productivity and expense optimization.',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    expenseSubmitted: true,
    approvalRequired: true,
    statusUpdates: true,
    weeklyReports: false,
    marketingEmails: false,
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeZone: 'America/New_York',
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Settings</h1>
          <p className="text-[#6B7280] mt-1">Manage your account preferences and security</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="card-3d border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-[#174871]" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 ring-4 ring-white/20">
                <AvatarFallback className="bg-gradient-to-br from-[#174871] to-[#1E88E5] text-white text-xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="border-white/30 hover:bg-white/20">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-[#6B7280] mt-1">JPG, PNG or GIF. Max size 5MB.</p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="bg-white/50 backdrop-blur-sm border-white/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="bg-white/50 backdrop-blur-sm border-white/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="pl-10 bg-white/50 backdrop-blur-sm border-white/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="pl-10 bg-white/50 backdrop-blur-sm border-white/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={profile.department} onValueChange={(value) => setProfile({ ...profile, department: value })}>
                  <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="pl-10 bg-white/50 backdrop-blur-sm border-white/30"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-[#174871] to-[#1E88E5] hover:from-[#1E88E5] hover:to-[#174871] text-white">
              <Save className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="card-3d border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-[#174871]" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-[#6B7280]">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-[#6B7280]">Receive push notifications in browser</p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, pushNotifications: checked })
                  }
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4>Expense Notifications</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Expense Submitted</Label>
                    <p className="text-sm text-[#6B7280]">When a team member submits an expense</p>
                  </div>
                  <Switch
                    checked={notifications.expenseSubmitted}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, expenseSubmitted: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Approval Required</Label>
                    <p className="text-sm text-[#6B7280]">When your approval is needed</p>
                  </div>
                  <Switch
                    checked={notifications.approvalRequired}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, approvalRequired: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Status Updates</Label>
                    <p className="text-sm text-[#6B7280]">When expense status changes</p>
                  </div>
                  <Switch
                    checked={notifications.statusUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, statusUpdates: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-[#6B7280]">Receive weekly expense summaries</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, weeklyReports: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="card-3d border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="w-5 h-5 mr-2 text-[#174871]" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={preferences.theme} onValueChange={(value) => setPreferences({ ...preferences, theme: value })}>
                  <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center">
                        <Sun className="w-4 h-4 mr-2" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center">
                        <Moon className="w-4 h-4 mr-2" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="auto">
                      <div className="flex items-center">
                        <Palette className="w-4 h-4 mr-2" />
                        Auto
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={preferences.language} onValueChange={(value) => setPreferences({ ...preferences, language: value })}>
                  <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                    <SelectItem value="fr">🇫🇷 French</SelectItem>
                    <SelectItem value="de">🇩🇪 German</SelectItem>
                    <SelectItem value="ja">🇯🇵 Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={preferences.currency} onValueChange={(value) => setPreferences({ ...preferences, currency: value })}>
                    <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}>
                    <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select value={preferences.timeZone} onValueChange={(value) => setPreferences({ ...preferences, timeZone: value })}>
                  <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">GMT</SelectItem>
                    <SelectItem value="Europe/Paris">CET</SelectItem>
                    <SelectItem value="Asia/Tokyo">JST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="card-3d border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-[#174871]" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-[#6B7280]">Add an extra layer of security</p>
                </div>
                <Switch
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => 
                    setSecurity({ ...security, twoFactorAuth: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Select 
                  value={security.sessionTimeout.toString()} 
                  onValueChange={(value) => setSecurity({ ...security, sessionTimeout: parseInt(value) })}
                >
                  <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Password Expiry (days)</Label>
                <Select 
                  value={security.passwordExpiry.toString()} 
                  onValueChange={(value) => setSecurity({ ...security, passwordExpiry: parseInt(value) })}
                >
                  <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button variant="outline" className="w-full border-white/30 hover:bg-white/20">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full border-white/30 hover:bg-white/20">
                  Download Account Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save All Button */}
      <Card className="card-3d border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3>Save Changes</h3>
              <p className="text-sm text-[#6B7280]">Apply all your settings changes</p>
            </div>
            <Button className="bg-gradient-to-r from-[#43A047] to-[#66BB6A] hover:from-[#66BB6A] hover:to-[#43A047] text-white shadow-lg glow-effect">
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;