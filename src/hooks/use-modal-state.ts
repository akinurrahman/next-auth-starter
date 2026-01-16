'use client';

import { useState } from 'react';

export function useModalState<T>() {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<T | null>(null);

  const openModal = (value?: T) => {
    setItem(value ?? null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setItem(null);
  };

  return {
    open,
    item,
    openModal,
    closeModal,
    hasItem: item !== null,
  };
}
