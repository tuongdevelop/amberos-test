import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../api';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { FaUserCircle, FaHome, FaBriefcase } from 'react-icons/fa';

interface UserProfile {
    full_name: string; email: string; phone_number?: string;
    address_line_1?: string; address_line_2?: string; city?: string;
    state?: string; country?: string; nok_name?: string; nok_phone_number?: string;
}
type ProfileFormInputs = Omit<UserProfile, 'full_name' | 'email'>;

const Dashboard = () => {
    const { logout, userId } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const { register, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm<ProfileFormInputs>();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) return;
            try {
                const response = await apiClient.get(`/profile/${userId}`);
                setProfile(response.data);
                reset(response.data);
            } catch (error) { toast.error("Failed to fetch profile."); }
        };
        fetchProfile();
    }, [userId, reset]);

    const onSubmit = async (data: ProfileFormInputs) => {
        try {
            await apiClient.put(`/profile/${userId}`, data);
            toast.success('Profile updated successfully!');
            reset(data, { keepValues: true, keepDirty: false });
        } catch (error) { toast.error("Failed to update profile."); }
    };

    if (!profile) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    const inputFieldClass = "w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500";
    const disabledInputFieldClass = "w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed";

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <div className="flex flex-col w-64 bg-gray-800 text-white">
                <div className="flex items-center justify-center h-20 border-b border-gray-700">
                    <h1 className="text-2xl font-bold">Domain Checker</h1>
                </div>
                <div className="flex flex-col flex-grow p-4 space-y-4">
                    <div className="flex items-center space-x-3">
                        <FaUserCircle className="w-10 h-10 text-gray-400" />
                        <div>
                            <p className="font-semibold">{profile.full_name}</p>
                            <button id="logout" onClick={logout} className="text-sm text-gray-400 hover:text-white focus:outline-none">Log out</button>
                        </div>
                    </div>
                    <nav className="flex-grow mt-5">
                        <a href="#" className="flex items-center px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"><FaHome className="w-5 h-5 mr-3" /> Home</a>
                        <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"><FaBriefcase className="w-5 h-5 mr-3" /> Projects</a>
                    </nav>
                </div>
            </div>

            <main className="flex-grow p-10 overflow-auto">
                <h2 className="text-3xl font-semibold text-gray-800">Profile</h2>
                <div className="mt-6 bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700">Overview</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                            <div><label className="text-gray-700">Full Name</label><input type="text" value={profile.full_name} disabled className={disabledInputFieldClass} /></div>
                            <div><label className="text-gray-700">Address Line #1</label><input type="text" {...register('address_line_1')} className={inputFieldClass} /></div>
                            <div><label className="text-gray-700">Email</label><input type="email" value={profile.email} disabled className={disabledInputFieldClass} /></div>
                            <div><label className="text-gray-700">Address Line #2</label><input type="text" {...register('address_line_2')} className={inputFieldClass} /></div>
                            <div><label className="text-gray-700">Phone Number</label><input type="text" {...register('phone_number')} className={inputFieldClass} /></div>
                            <div><label className="text-gray-700">City</label><input type="text" {...register('city')} className={inputFieldClass} /></div>
                            <div><label className="text-gray-700">N.O.K (Next of Kin)</label><input type="text" {...register('nok_name')} className={inputFieldClass} /></div>
                            <div><label className="text-gray-700">State</label><input type="text" {...register('state')} className={inputFieldClass} /></div>
                            <div><label className="text-gray-700">N.O.K Phone Number</label><input type="text" {...register('nok_phone_number')} className={inputFieldClass} /></div>
                            <div><label className="text-gray-700">Country</label><input type="text" {...register('country')} className={inputFieldClass} /></div>
                        </div>
                        <div className="flex justify-end mt-8">
                            <button type="submit" disabled={!isDirty || isSubmitting} className="px-6 py-2 font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
export default Dashboard;
