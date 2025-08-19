import {
  roles,
  school_admins,
  classes,
  students,
  school_config,
  user,
} from "./schemas";

const ROLES = /* GraphQL */ `
query { getAminRoles{
    ${roles}
}}
`;

const SCHOOL_ADMINS = /* GraphQL */ `
query {getAdmins{
   ${school_admins}
}}
`;

const CLASSES = /* GraphQL */ `
query {
    getClasses {
        ${classes}
    }
}
`;

const getStudents = /* GraphQL */ `
query {
    getStudents {
        ${students}
    }
}
`;

const getSchoolConfig = /* GraphQL */ `
query {
    getSchoolConfig {
        ${school_config}
    }
}`;

const getNewToken = /* GraphQL */ `
  query GetRefreshToken($input: String!) {
    getRefreshToken(input: $input)
  }
`;

const fetchUserData = /* GraphQL */ `
query {
    fetchUserDetails {
        ${user}
    }}
`;

export {
  ROLES,
  SCHOOL_ADMINS,
  CLASSES,
  getStudents,
  getSchoolConfig,
  getNewToken,
  fetchUserData,
};
