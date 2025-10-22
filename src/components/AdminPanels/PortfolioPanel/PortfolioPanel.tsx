import { logout } from "@/lib/api/api";
import css from "./PortfolioPanel.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import toast from "react-hot-toast";

export default function PortfolioPanel() {
    const router = useRouter();
    const handleLogout = async () => {
        const res = await logout();
        if (res.status === 200)
        {
        useAuthStore.getState().setIsAuthenticated(false);
        router.push('/admin');
        }
        else {
            toast.error('logout failed');
}
    }
    return (<div className={css.wrapper}>
        <button className={css.btn}>Add Project</button>
        <button className={css.btn}>Change Password</button>
        <button className={css.btn} onClick={handleLogout}>Logout</button>
    </div>)
}