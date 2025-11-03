// Mock API functions for the myCistern Trial Workday application

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
}

export interface WorkdayData {
  company: string;
  status: string;
  lastUpdated: string;
  totalEmployees: number;
}

export interface TimeEntry {
  id: number;
  userId: number;
  date: string;
  hoursWorked: number;
  projectName: string;
}

/**
 * Mock API function to fetch users
 * Simulates a network delay and returns mock user data
 */
export const fetchUsers = async (): Promise<User[]> => {
  // Simulate network delay
  await delay(500);
  
  return [
    {
      id: 1,
      name: "Georg Dornaus",
      email: "georg.dornaus@mycistern.com",
      role: "Hardware Engineer",
      department: "Engineering"
    },
    {
      id: 2,
      name: "Christian Schaefer",
      email: "christian.schaefer@mycistern.com",
      role: "Product Manager",
      department: "Product"
    },
    {
      id: 3,
      name: "Ganesh Balaraju",
      email: "ganesh.balaraju@mycistern.com",
      role: "Designer and Frontend Developer",
      department: "Design"
    },
    {
      id: 4,
      name: "Suraj Kumar",
      email: "suraj.kumar@mycistern.com",
      role: "Backend Engineer",
      department: "Engineering"
    }
  ];
};

/**
 * Mock API function to fetch workday data
 * Returns general workday information
 */
export const fetchWorkdayData = async (): Promise<WorkdayData> => {
  await delay(300);
  
  return {
    company: "myCistern",
    status: "Active",
    lastUpdated: new Date().toLocaleDateString(),
    totalEmployees: 150
  };
};

/**
 * Mock API function to fetch time entries
 * Returns time tracking data for employees
 */
export const fetchTimeEntries = async (userId?: number): Promise<TimeEntry[]> => {
  await delay(400);
  
  const allEntries: TimeEntry[] = [
    {
      id: 1,
      userId: 1,
      date: "2025-11-01",
      hoursWorked: 8,
      projectName: "Project Alpha"
    },
    {
      id: 2,
      userId: 1,
      date: "2025-11-02",
      hoursWorked: 7.5,
      projectName: "Project Beta"
    },
    {
      id: 3,
      userId: 2,
      date: "2025-11-01",
      hoursWorked: 8,
      projectName: "Project Gamma"
    }
  ];
  
  if (userId) {
    return allEntries.filter(entry => entry.userId === userId);
  }
  
  return allEntries;
};

/**
 * Mock API function to create a new user
 * Simulates creating a user in the system
 */
export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  await delay(600);
  
  // Simulate generating a new ID
  const newUser: User = {
    id: Math.floor(Math.random() * 10000),
    ...userData
  };
  
  console.log('Created new user:', newUser);
  return newUser;
};

/**
 * Mock API function to update user information
 * Simulates updating an existing user
 */
export const updateUser = async (userId: number, updates: Partial<User>): Promise<User> => {
  await delay(500);
  
  // Simulate fetching and updating user
  const updatedUser: User = {
    id: userId,
    name: updates.name || "Updated User",
    email: updates.email || "updated@mycistern.com",
    role: updates.role || "Employee",
    department: updates.department || "General"
  };
  
  console.log('Updated user:', updatedUser);
  return updatedUser;
};

/**
 * Mock API function to delete a user
 * Simulates deleting a user from the system
 */
export const deleteUser = async (userId: number): Promise<{ success: boolean; message: string }> => {
  await delay(400);
  
  console.log('Deleted user with ID:', userId);
  return {
    success: true,
    message: `User ${userId} successfully deleted`
  };
};

/**
 * Mock API function to submit time entry
 * Simulates submitting a new time entry
 */
export const submitTimeEntry = async (entry: Omit<TimeEntry, 'id'>): Promise<TimeEntry> => {
  await delay(500);
  
  const newEntry: TimeEntry = {
    id: Math.floor(Math.random() * 10000),
    ...entry
  };
  
  console.log('Submitted time entry:', newEntry);
  return newEntry;
};

/**
 * Utility function to simulate network delay
 */
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
