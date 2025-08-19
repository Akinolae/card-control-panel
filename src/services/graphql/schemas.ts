const roles = /* GraphQL */ `
    role_id
    role_name
    createdAt
`;

const school_admins = /* GraphQL */ `
    role_id
    user_id
    school_id
`;

const classes = /* GraphQL */ `
    school_id
    class_id
    label
`;

const students = /* GraphQL */ `
    student_id
    firstName
    middleName
    lastName
    class_id
    dateOfBirth
    guardianEmail
    studentImage
    guardianPhone
    gender
    createdAt
`;
const user = /* GraphQL */ `
    user_id
    school_name
    email
    address
    createdAt
    email_verified
    phone_verified
    phone
    name
    middle_name
    gender
    role
  `;

const admins = /* GraphQL */ `
    school_id
  	role_id
  	user_id
  	name
  	email
  	middle_name
  `;

const pricing = /* GraphQL */ `
    plan_active
    plan_id
    startDate
`;
const school_config = /* GraphQL */ `
    school_id
    admins {
        ${admins}
    }
    classes {
        ${classes}
    }
    students {
        ${students}
    }
    pricingConfig {
        ${pricing}
    }
`;

export { roles, school_admins, classes, students, user, school_config };
