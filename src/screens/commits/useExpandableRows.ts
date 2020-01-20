import { useState } from 'react';

interface UseExpandableRowsProps {
  readonly toggleRowCollapse: (id: string) => void;
  readonly collapseAll: () => void;
  readonly expandedRows: string[];
}

export default (): UseExpandableRowsProps => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRowCollapse = (id: string): void => {
    const arrIndex = expandedRows.findIndex((elm): boolean => elm === id);
    if (arrIndex > -1) {
      setExpandedRows([...expandedRows.slice(0, arrIndex), ...expandedRows.slice(arrIndex + 1)]);
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const collapseAll = (): void => {
    setExpandedRows([]);
  };

  return {
    toggleRowCollapse,
    collapseAll,
    expandedRows,
  };
};
