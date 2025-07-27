import PrivateRoute from "@/components/auth/PrivateRoute";

export default function PrivateLayout({ children }) {
    return (
        <>
            <PrivateRoute>
                {children}
            </PrivateRoute>
        </>
    );
}