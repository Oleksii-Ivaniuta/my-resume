"use client";
import { useState } from "react";
import css from "./ProjectEditPanel.module.css";
import ModalWindow from "@/components/ModalWindow/ModalWindow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectById } from "@/lib/api/api";
import toast from "react-hot-toast";

interface EditProjectPanelProps {
  projectId: string;
  projectOrder: number;
}

export default function EditProjectPanel({
  projectId,
  projectOrder,
}: EditProjectPanelProps) {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] =
    useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const QueryClient = useQueryClient();
    
  const openDeleteConfirm = () => setIsDeleteConfirmOpen(true);
  const closeDeleteConfirm = () => setIsDeleteConfirmOpen(false);
  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  const deleteProject = useMutation({
    mutationFn: () => deleteProjectById(projectId),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["Projects"] });
      toast.success("Project deleted successfully");
    },
  });

  return (
    <div className={css.wrapper}>
      <span className={css.order}>{projectOrder}</span>
      <button className={css.btn}>Edit</button>
      <button
        className={`${css.btn} ${css.btn_delete}`}
        onClick={openDeleteConfirm}
      >
        Delete
      </button>

      {isDeleteConfirmOpen && (
        <ModalWindow onClose={closeDeleteConfirm} isOpen={isDeleteConfirmOpen}>
          <div className={css.delete_wrapper}>
            <p>Sure, you want to delete project #{projectOrder}?</p>
            <div className={css.delete_btns_wrapper}>
              {" "}
              <button className={`${css.btn} ${css.btn_delete}`} onClick={() => deleteProject.mutate()}>Yes</button>
              <button className={css.btn} onClick={closeDeleteConfirm}>
                No
              </button>
            </div>
          </div>
        </ModalWindow>
      )}
    </div>
  );
}
