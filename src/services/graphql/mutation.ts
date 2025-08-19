const REGISTER = /* GraphQL */ `
  mutation register($createUserInput: CreateUserInput!) {
    register(input: $createUserInput)
  }
`;

const UPDATE_REGISTERED_USER = /* GraphQL */ `
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(input: $updateUserInput)
  }
`;

const FORGOT_PASSWORD = /* GraphQL */ `
  mutation ForgotUserPassword($email: String!) {
    forgotUserPassword(input: $email)
  }
`;

const CONFIRM_SIGNUP = /* GraphQL */ `
  mutation ConfirmSignUp($email: String!, $code: String!) {
    confirmSignUp(input: { email: $email, code: $code })
  }
`;

const CHANGE_PASSWORD = /* GraphQL */ `
  mutation ForgotPasswordChange(
    $email: String!
    $code: String!
    $password: String!
  ) {
    forgotPasswordChange(
      input: { email: $email, code: $code, password: $password }
    )
  }
`;

const createStudents = /* GraphQL */ `
  mutation AddStudent($studentInput: StudentInput!) {
    addStudent(input: $studentInput)
  }
`;

const CREATE_CLASS = /* GraphQL */ `
  mutation CreateClass($createClass: String!) {
    createClass(input: $createClass) {
      school_id
      class_id
      label
    }
  }
`;

const ADD_ADMIN = /* GraphQL */ `
  mutation AddAdmin($role: String!, $user_id: String!) {
    addAdmin(input: { role: $role, user_id: $user_id })
  }
`;

const LOGIN = /* GraphQL */ `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      refreshToken
    }
  }
`;

export {
  REGISTER,
  CONFIRM_SIGNUP,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  UPDATE_REGISTERED_USER,
  CREATE_CLASS,
  createStudents,
  ADD_ADMIN,
  LOGIN,
};
