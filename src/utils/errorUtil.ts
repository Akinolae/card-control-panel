const parseError = (error: any): string => {
  return error.toString().split(":")[2];
};

const errors = {
  email: "Email is required",
  password: "Password is required",
  phoneNumber: "Phone number is required",
  fullName: "Full name is required",
  firstName: "First name is required",
  lastName: "Last name is required",
  role: "role is required",
  roleName: "Role name is required",
  school: "School name is required",
  schoolAddress: "School address is required",
  invalidEmail: "Email must be valid",
  passworMatch: "Passwords don't match",
  permissions: "Role must include atleast one permission",
};

export { parseError, errors };
