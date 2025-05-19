// contexts/StudentContext.tsx
import React, { createContext, useState } from 'react';

export interface Student {
  id: string;
  name: string;
  checkedIn: boolean;
}

export const StudentContext = createContext<{
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}>({
  students: [],
  setStudents: () => {},
});

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([
    { id: 'meudeus1', name: 'John Doe', checkedIn: false },
    { id: 'meudeus2', name: 'Jane Smith', checkedIn: false },
    { id: 'meudeus3', name: 'Robert Johnson', checkedIn: false },
    { id: 'meudeus4', name: 'Emily Williams', checkedIn: false },
    { id: 'meudeus5', name: 'Michael Brown', checkedIn: false },
  ]);

  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
};
