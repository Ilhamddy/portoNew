"use client";

import { useEffect, useState } from "react";

const EDIT_EVENT = "ilhamddy-admin-edit-mode-change";

export function useAdminEditMode() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const sync = () => {
      const hasSession =
        localStorage.getItem("ilhamddy-admin-session") === "true" ||
        sessionStorage.getItem("ilhamddy-admin-session") === "true";
      setIsAdmin(hasSession);
      setEditMode(localStorage.getItem("ilhamddy-admin-edit-mode") === "true");
    };

    sync();
    window.addEventListener(EDIT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EDIT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { isAdmin, editMode };
}

export function setAdminEditMode(enabled) {
  localStorage.setItem("ilhamddy-admin-edit-mode", String(enabled));
  window.dispatchEvent(new Event(EDIT_EVENT));
}

export default function InlineEdit({
  value,
  onSave,
  as: Tag = "span",
  multiline = false,
  className = "",
  children,
}) {
  const { isAdmin, editMode } = useAdminEditMode();
  const [draft, setDraft] = useState(value || "");

  useEffect(() => {
    queueMicrotask(() => setDraft(value || ""));
  }, [value]);

  const save = () => {
    const nextValue = draft.trim();
    if (nextValue && nextValue !== value) {
      onSave(nextValue);
    }
  };

  if (!isAdmin || !editMode) {
    return <Tag className={className}>{children ?? value}</Tag>;
  }

  return (
    <Tag
      className={`${className} outline outline-1 outline-dashed outline-night-bordeaux-500/60 dark:outline-dark-cyan-400/60 outline-offset-4 cursor-text`}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      title="Klik untuk edit konten"
      onInput={(event) => setDraft(event.currentTarget.textContent || "")}
      onBlur={save}
      onKeyDown={(event) => {
        if (!multiline && event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
    >
      {draft}
    </Tag>
  );
}
