const BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

export interface SignupData {
  username: string;
  email: string;
  dateofbirth: string;
  password: string;
}

export const signupUser = async (data: SignupData): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Signup failed');
    }

    return await response.json(); // Return the successful response data
  } catch (error) {
    throw error; // Throw the error to be handled in the component
  }
};
