
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  User,
  Mail, 
  MapPin, 
  Calendar, 
  Phone,
  Globe,
  Briefcase,
  Settings, 
  Bookmark,
  Bell,
  CreditCard,
  Shield,
  HelpCircle 
} from 'lucide-react';

type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  phone: string | null;
  birthday: string | null;
  occupation: string | null;
};

const profileSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  full_name: z.string().min(2, { message: 'Full name must be at least 2 characters' }).optional().or(z.literal('')),
  avatar_url: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  bio: z.string().max(300, { message: 'Bio must be less than 300 characters' }).optional().or(z.literal('')),
  website: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  location: z.string().max(100).optional().or(z.literal('')),
  phone: z.string().max(20).optional().or(z.literal('')),
  birthday: z.string().optional().or(z.literal('')),
  occupation: z.string().max(100).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [savedArticles, setSavedArticles] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      full_name: '',
      avatar_url: '',
      bio: '',
      website: '',
      location: '',
      phone: '',
      birthday: '',
      occupation: '',
    },
  });

  useEffect(() => {
    async function getProfile() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, full_name, avatar_url, bio, website, location, phone, birthday, occupation')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setProfile(data);
          form.reset({
            username: data.username || '',
            full_name: data.full_name || '',
            avatar_url: data.avatar_url || '',
            bio: data.bio || '',
            website: data.website || '',
            location: data.location || '',
            phone: data.phone || '',
            birthday: data.birthday || '',
            occupation: data.occupation || '',
          });
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error.message);
        toast.error('Error fetching profile: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
    
    getProfile();
  }, [user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const updates = {
        id: user.id,
        ...values,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('profiles')
        .upsert(updates);
        
      if (error) throw error;
      
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name?: string | null) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() || 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Profile header */}
            <motion.div 
              className="mb-8 bg-white rounded-lg shadow-md overflow-hidden"
              variants={fadeIn}
            >
              {/* Banner */}
              <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              
              {/* Profile info */}
              <div className="relative px-6 pb-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 space-y-4 sm:space-y-0 sm:space-x-4">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                    <AvatarImage src={profile?.avatar_url || ''} alt={profile?.username || user?.email || 'User'} />
                    <AvatarFallback className="text-2xl bg-blue-600 text-white">
                      {getInitials(profile?.full_name || profile?.username)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center sm:text-left pt-4 sm:pt-0">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {profile?.full_name || profile?.username || user?.email?.split('@')[0] || 'User'}
                    </h1>
                    <p className="text-gray-600">{user?.email}</p>
                    {profile?.bio && (
                      <p className="mt-2 text-gray-700 max-w-xl">{profile.bio}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                      {profile?.location && (
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <MapPin size={16} className="mr-1" /> {profile.location}
                        </span>
                      )}
                      {profile?.website && (
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" 
                          className="inline-flex items-center text-sm text-blue-600 hover:underline">
                          <Globe size={16} className="mr-1" /> Website
                        </a>
                      )}
                      {profile?.occupation && (
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <Briefcase size={16} className="mr-1" /> {profile.occupation}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <motion.div variants={fadeIn}>
                <TabsList className="bg-white p-1 shadow-sm rounded-lg border">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User size={16} /> Profile 
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="flex items-center gap-2">
                    <Bookmark size={16} /> Saved Articles
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <Bell size={16} /> Notifications
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings size={16} /> Settings
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="profile" className="space-y-6">
                <motion.div 
                  className="bg-white shadow-md rounded-lg p-6"
                  variants={fadeIn}
                >
                  <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Edit Profile</h2>
                  
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your username" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="avatar_url"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Avatar URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://example.com/avatar.jpg" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://yourwebsite.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="City, Country" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="occupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Occupation</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your occupation" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="birthday"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Birthday</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about yourself" 
                                  className="h-32 resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            {loading ? 'Updating...' : 'Update Profile'}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="saved">
                <motion.div 
                  className="bg-white shadow-md rounded-lg p-6"
                  variants={fadeIn}
                >
                  <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Saved Articles</h2>
                  
                  <div className="text-center py-8">
                    <Bookmark size={64} className="mx-auto text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-600">No saved articles yet</h3>
                    <p className="mt-2 text-gray-500">Articles you save will appear here</p>
                    <Button 
                      className="mt-4 bg-blue-600 hover:bg-blue-700"
                      onClick={() => navigate('/')}
                    >
                      Browse Articles
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="notifications">
                <motion.div 
                  className="bg-white shadow-md rounded-lg p-6"
                  variants={fadeIn}
                >
                  <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Notifications</h2>
                  
                  <div className="text-center py-8">
                    <Bell size={64} className="mx-auto text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-600">No notifications</h3>
                    <p className="mt-2 text-gray-500">You don't have any notifications at this time</p>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="settings">
                <motion.div 
                  className="space-y-6"
                  variants={staggerContainer}
                >
                  <motion.div 
                    className="bg-white shadow-md rounded-lg p-6"
                    variants={fadeIn}
                  >
                    <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <Mail className="text-gray-600" />
                          <div>
                            <h3 className="font-medium">Email Preferences</h3>
                            <p className="text-sm text-gray-500">Manage your email notifications</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Manage</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="text-gray-600" />
                          <div>
                            <h3 className="font-medium">Subscription</h3>
                            <p className="text-sm text-gray-500">Manage your subscription plan</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Manage</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <Shield className="text-gray-600" />
                          <div>
                            <h3 className="font-medium">Privacy & Security</h3>
                            <p className="text-sm text-gray-500">Control your privacy settings</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Manage</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <HelpCircle className="text-gray-600" />
                          <div>
                            <h3 className="font-medium">Help & Support</h3>
                            <p className="text-sm text-gray-500">Get assistance or report an issue</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Contact</Button>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white shadow-md rounded-lg p-6"
                    variants={fadeIn}
                  >
                    <h2 className="text-xl font-semibold mb-6 text-red-600">Danger Zone</h2>
                    
                    <div className="space-y-4">
                      <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <h3 className="font-medium text-red-700">Delete Account</h3>
                        <p className="text-sm text-red-600 mt-1">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4 text-red-600 border-red-600 hover:bg-red-50"
                        >
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
