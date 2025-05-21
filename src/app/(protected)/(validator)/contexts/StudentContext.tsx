// contexts/StudentContext.tsx
import React, { createContext, useState } from "react";

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

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [students, setStudents] = useState<Student[]>([
    { id: "gabriel", name: "Gabriel Meira", checkedIn: false },
  ]);

  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
};
