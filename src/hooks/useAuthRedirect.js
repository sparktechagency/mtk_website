
'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useAuthStore from '@/store/auth';

const useAuthRedirect = () => {
    const router = useRouter();
    const token = useAuthStore.getState().token;

    const redirectToAuthPage = (e, targetPath) => {
        if (!token) {
            e.preventDefault();
            toast.error("Please log in to proceed."); 
            return false;
        } else {
            router.push(targetPath);
            return true;
        }
    };

    return redirectToAuthPage;
};

export default useAuthRedirect;