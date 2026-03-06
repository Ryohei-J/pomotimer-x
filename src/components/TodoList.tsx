"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import type { Todo } from "@/hooks/useTodos";

interface Props {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onAdd, onToggle, onDelete }: Props) {
  const t = useTranslations("TodoList");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isComposingRef = useRef(false);

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input);
    setInput("");
    inputRef.current?.focus();
  };

  const pending = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div className="bg-surface rounded-2xl shadow-xl p-6 h-full">
      <h2 className="text-base font-semibold text-text-primary mb-4">{t("title")}</h2>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onCompositionStart={() => { isComposingRef.current = true; }}
          onCompositionEnd={() => { isComposingRef.current = false; }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposingRef.current) {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder={t("placeholder")}
          className="flex-1 bg-surface-alt rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary outline-none"
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-alt hover:bg-surface-alt/80 transition-colors text-text-secondary hover:text-text-primary disabled:opacity-40"
          aria-label={t("addAriaLabel")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Empty state */}
      {todos.length === 0 && (
        <p className="text-sm text-text-secondary text-center py-4">
          {t("emptyState")}
        </p>
      )}

      {/* Pending todos */}
      {pending.length > 0 && (
        <ul className="flex flex-col gap-1 mb-3">
          {pending.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              markDoneLabel={t("markDone")}
              markUndoneLabel={t("markUndone")}
              deleteLabel={t("deleteAriaLabel")}
            />
          ))}
        </ul>
      )}

      {/* Done todos */}
      {done.length > 0 && (
        <>
          {pending.length > 0 && <div className="border-t border-divider mb-3" />}
          <ul className="flex flex-col gap-1">
            {done.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                markDoneLabel={t("markDone")}
                markUndoneLabel={t("markUndone")}
                deleteLabel={t("deleteAriaLabel")}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
  markDoneLabel,
  markUndoneLabel,
  deleteLabel,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  markDoneLabel: string;
  markUndoneLabel: string;
  deleteLabel: string;
}) {
  return (
    <li className="flex items-center gap-3 group py-1.5 px-2 rounded-lg hover:bg-surface-alt transition-colors">
      <button
        onClick={() => onToggle(todo.id)}
        className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
        style={{
          borderColor: todo.done ? "var(--c-work)" : "var(--c-text-secondary)",
          backgroundColor: todo.done ? "var(--c-work)" : "transparent",
        }}
        aria-label={todo.done ? markUndoneLabel : markDoneLabel}
      >
        {todo.done && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2 6 5 9 10 3" />
          </svg>
        )}
      </button>

      <span
        className="flex-1 text-sm"
        style={{
          color: todo.done ? "var(--c-text-secondary)" : "var(--c-text-primary)",
          textDecoration: todo.done ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-text-secondary hover:text-text-primary shrink-0"
        aria-label={deleteLabel}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      </button>
    </li>
  );
}
