import { createProject, logout, changePassword } from "@/lib/api/api";
import css from "./PortfolioPanel.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import toast from "react-hot-toast";
import { useState } from "react";
import ModalWindow from "@/components/ModalWindow/ModalWindow";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import AddProjectForm from "../AddProjectForm/AddProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangePasswordRequest } from "@/types/apiTypes";


export default function PortfolioPanel() {
  const [addProjOpen, setAddProjOpen] = useState<boolean>(false);
  const [changePassOpen, setChangePassOpen] = useState<boolean>(false);
  const openAddProj = () => setAddProjOpen(true);
  const closeAddProj = () => setAddProjOpen(false);
  const openChangePass = () => setChangePassOpen(true);
  const closeChangePass = () => setChangePassOpen(false);
  const router = useRouter();
  const handleLogout = async () => {
    const res = await logout();
    if (res.status === 200) {
      useAuthStore.getState().setIsAuthenticated(false);
      router.push("/admin");
    } else {
      toast.error("logout failed");
    }
  };
    const queryClient = useQueryClient();

  const addNewProject = useMutation({
    mutationFn: (data: FormData) => createProject(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['Projects'] });
        closeAddProj();
      }
  });
    
    const handleChangePassword = async (data: ChangePasswordRequest) => {
        try {
            const res = await changePassword(data);
            if (res.status === 200) {
                console.log("change password");  
            }
        }
        catch (err) {
            console.log(err);
                    }
    };
    
    
  return (
    <div className={css.wrapper}>
      <button className={css.btn} onClick={openAddProj}>
        Add Project
      </button>
      <button className={css.btn} onClick={openChangePass}>
        Change Password
      </button>
      <button className={css.btn} onClick={handleLogout}>
        Logout
      </button>
      {addProjOpen && (
        <ModalWindow onClose={closeAddProj} isOpen={addProjOpen}>
          <div>
            <AddProjectForm onSubmit={addNewProject.mutate}/>
          </div>
        </ModalWindow>
      )}
      {changePassOpen && (
        <ModalWindow onClose={closeChangePass} isOpen={changePassOpen}>
          <div>
            <ChangePasswordForm onSubmit={handleChangePassword}/>
          </div>
        </ModalWindow>
      )}
    </div>
  );
}
