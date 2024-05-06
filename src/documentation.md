
# Project Documentation

## Introduction

This project aims to build a B2B service platform with three main user roles:

1. **Admin**: No restrictions, can perform any action including inviting new users, updating company profile, and managing teams.
2. **Manager**: Limited to requesting services, can send OTP invites to Shift Coordinators but can't modify the company profile.
3. **Shift Coordinator**: Can execute tasks assigned to them.

## Supabase User Management

Supabase offers robust user management features, including:

- Sign Up
- Log In with Email/Password
- Log In with Magic Link via Email
- Phone-based authentication
- Third-Party OAuth
- Forgotten Password Recovery
- User Updates
- User Logout
- User Invitations

### Relevant Supabase Functions

- `supabase.auth.signUp`: For signing up new users.
- `supabase.auth.signInWithPassword`: For email/password-based login.
- `supabase.auth.signInWithOtp`: For OTP-based login.
- `supabase.auth.resetPasswordForEmail`: For password recovery.
- `supabase.auth.updateUser`: For updating user details.

## Database Schema

### Roles Table

This table will store information about the different roles in the system.

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id          | UUID      | Unique identifier for each role |
| role_name   | ENUM      | Role name ('Admin', 'Manager', 'Shift Coordinator') |
| description | TEXT      | Description of the role |

### Company Table

This table will store the company information.

| Column Name   | Data Type | Description |
|---------------|-----------|-------------|
| id            | UUID      | Unique identifier for each company |
| name          | TEXT      | Name of the company |
| admin_user_id | UUID      | Reference to the Admin who created the company |

### Company User Profile Table

This table will store information about the users.

| Column Name   | Data Type | Description |
|---------------|-----------|-------------|
| id            | UUID      | Unique identifier for each user |
| first_name    | TEXT      | First name of the user |
| last_name     | TEXT      | Last name of the user |
| email         | TEXT      | Email address |
| contact_number| TEXT      | Contact number |
| role_id       | UUID      | Reference to the Roles Table |
| company_id    | UUID      | Reference to the Company Table |

## Error Messages

- **Type "role_name_enum" already exists**: This error occurs when trying to recreate an existing ENUM type.
- **Column "id" referenced in foreign key constraint does not exist**: This error indicates that a foreign key reference is pointing to a non-existent column or table.


