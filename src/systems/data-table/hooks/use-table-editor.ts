'use client';

import { useState } from 'react';

interface UseTableEditorProps<TData> {
  onDataUpdate?: (updatedData: TData) => void;
}

export function useTableEditor<TData>({ onDataUpdate }: UseTableEditorProps<TData>) {
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Record<string, unknown>>({});

  const startEditing = (rowId: string, rowData: Partial<TData>) => {
    setEditingRow(rowId);
    setEditedData({ ...rowData } as Record<string, unknown>);
  };

  const cancelEditing = () => {
    setEditingRow(null);
    setEditedData({});
  };

  const saveEditing = (originalRow: Partial<TData>) => {
    const updatedData = { ...originalRow, ...editedData } as TData;
    if (onDataUpdate) {
      onDataUpdate(updatedData);
    }
    setEditingRow(null);
    setEditedData({});
  };

  const handleFieldChange = (key: string, value: unknown) => {
    setEditedData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const getCurrentValue = (columnId: string, originalValue: unknown) => {
    return editedData[columnId] !== undefined ? editedData[columnId] : originalValue;
  };

  return {
    editingRow,
    editedData,
    startEditing,
    cancelEditing,
    saveEditing,
    handleFieldChange,
    getCurrentValue,
  };
}
