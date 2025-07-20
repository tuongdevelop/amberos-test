import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  full_name: z.string().min(3, 'Full name is required'),
  email: z.string().email('Enter a valid email address'),
  password: z.string()
    .min(8, 'Password must contain 8 characters')
    .regex(/\d.*\d/, 'Password must have at least 2 numbers')
    .regex(/[^a-zA-Z0-9].*[^a-zA-Z0-9]/, 'Password must have at least 2 symbols'),
  reEnterPassword: z.string(),
}).refine(data => data.password === data.reEnterPassword, {
  message: "Passwords must match",
  path: ["reEnterPassword"],
});
type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            const { reEnterPassword, ...apiData } = data;
            await apiClient.post('/register', apiData);
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (error: any) {
            const message = error.response?.data?.message || "Registration failed.";
            toast.error(message);
        }
    };
    const inputClass = (field: keyof RegisterFormInputs) => `w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${errors[field] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register for Domain Checker</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="register-full-name" className="text-sm font-medium text-gray-700">Full Name</label>
                        <input id="register-full-name" type="text" {...register('full_name')} className={inputClass('full_name')} />
                        {errors.full_name && <p className="mt-1 text-xs text-red-600">{errors.full_name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="register-email" className="text-sm font-medium text-gray-700">Email</label>
                        <input id="register-email" type="email" {...register('email')} className={inputClass('email')} />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="register-password" className="text-sm font-medium text-gray-700">Password</label>
                        <input id="register-password" type="password" {...register('password')} className={inputClass('password')} />
                        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="register-password-2" className="text-sm font-medium text-gray-700">Re-Enter Password</label>
                        <input id="register-password-2" type="password" {...register('reEnterPassword')} className={inputClass('reEnterPassword')} />
                        {errors.reEnterPassword && <p className="mt-1 text-xs text-red-600">{errors.reEnterPassword.message}</p>}
                    </div>
                    <div>
                        <button id="register-btn" type="submit" disabled={isSubmitting} className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50">
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login here.</Link>
                </p>
            </div>
        </div>
    );
};
export default Register;
