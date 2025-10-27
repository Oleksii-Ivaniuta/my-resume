"use client";
import { useState } from "react";
import css from "./ProjectEditPanel.module.css";
import ModalWindow from "@/components/ModalWindow/ModalWindow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectById, updateProjectById } from "@/lib/api/api";
import toast from "react-hot-toast";
import { Project } from "@/types/apiTypes";
import UpdateProjectForm from "../EditProjectForm/EditProjectForm";

interface EditProjectPanelProps {
  project: Project;
}

export default function EditProjectPanel({ project }: EditProjectPanelProps) {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const queryClient = useQueryClient();

  const openDeleteConfirm = () => setIsDeleteConfirmOpen(true);
  const closeDeleteConfirm = () => setIsDeleteConfirmOpen(false);
  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  const deleteProject = useMutation({
    mutationFn: () => deleteProjectById(project._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["Project", project._id] });
      toast.success("Project deleted successfully");
      closeDeleteConfirm();
    },
    onError: (e) => {
      toast.error(e?.message ?? "Failed to delete project");
    },
  });

  const editProject = useMutation({
    mutationFn: (data: FormData) => updateProjectById(project._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Project", project._id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project edited successfully");
      closeEdit();
    },
    onError: (e) => {
      toast.error(e?.message ?? "Failed to edit project");
    },
  });

  return (
    <div className={css.wrapper}>
      <span className={css.order}>{project.order}</span>

      <button className={css.btn} onClick={openEdit} disabled={editProject.isPending}>
        Edit
      </button>

      <button
        className={`${css.btn} ${css.btn_delete}`}
        onClick={openDeleteConfirm}
        disabled={deleteProject.isPending}
      >
        Delete
      </button>

      {isEditOpen && (
        <ModalWindow onClose={closeEdit} isOpen={isEditOpen}>
          <UpdateProjectForm
            initial={project}
            onSubmit={(fd) => editProject.mutate(fd)}
          />
        </ModalWindow>
      )}

      {isDeleteConfirmOpen && (
        <ModalWindow onClose={closeDeleteConfirm} isOpen={isDeleteConfirmOpen}>
          <div className={css.delete_wrapper}>
            <p>Sure, you want to delete project #{project.order}?</p>
            <div className={css.delete_btns_wrapper}>
              <button
                className={`${css.btn} ${css.btn_delete}`}
                onClick={() => deleteProject.mutate()}
                disabled={deleteProject.isPending}
              >
                {deleteProject.isPending ? "Deleting..." : "Yes"}
              </button>
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