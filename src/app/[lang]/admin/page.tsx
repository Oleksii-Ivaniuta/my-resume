'use client'
import LoginForm from "@/components/AdminPanels/LoginForm/LoginForm";
import css from "./Admin.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();
  if (useAuthStore.getState().isAuthenticated) {
    router.push('/portfolio');
  }
 
  return (
    <div className={css.wrapper}>
      <LoginForm/>
    </div>
  )
};