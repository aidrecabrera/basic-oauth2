# @svene/basic-oauth2

![MIT License](https://img.shields.io/github/license/aidrecabrera/basic-oauth2)

I created this for my personal use for my side project, but feel free to use it if it fits your needs. It is a simple hook for handling OAuth2 authentication with the default .NET Identity EntityFrameworkCoree endpoints. It provides a simple interface to interact with automatically generated API endpoints for authentication and user management.

Not really that good, but it works for me.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Detailed Usage](#detailed-usage)
- [TypeScript Interfaces](#typescript-interfaces)
- [Error Handling](#error-handling)
- [Security Considerations](#security-considerations)
- [Customization](#customization)
- [Caveats and Limitations](#caveats-and-limitations)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the package, run:

```bash
npm install @svene/basic-oauth2
```

## Quick Start

1. Set up the API base URL:

```typescript
import { setApiBaseUrl } from '@svene/basic-oauth2';

setApiBaseUrl('https://{base-url}.com');
```

2. Use the `useAuth` hook in your components:

```typescript
import { useAuth } from '@svene/basic-oauth2';

function LoginComponent() {
  const { login, accessToken } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password123' });
      console.log('Logged in successfully');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      {accessToken ? 'Logged in' : 'Not logged in'}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
```

## API Reference

The `useAuth` hook returns an object with the following methods and properties:

| Method/Property | Type | Description |
|-----------------|------|-------------|
| register | `(data: RegisterRequest) => Promise<void>` | Registers a new user |
| login | `(data: LoginRequest) => Promise<void>` | Logs in a user |
| refresh | `(data: RefreshRequest) => Promise<void>` | Refreshes the access token |
| resendConfirmationEmail | `(data: ResendConfirmationEmailRequest) => Promise<void>` | Resends the confirmation email |
| forgotPassword | `(data: ForgotPasswordRequest) => Promise<void>` | Initiates the password reset process |
| resetPassword | `(data: ResetPasswordRequest) => Promise<void>` | Resets the user's password |
| manageTwoFactor | `(data: TwoFactorRequest) => Promise<any>` | Manages two-factor authentication settings |
| getInfo | `() => Promise<InfoResponse>` | Retrieves the user's information |
| updateInfo | `(data: InfoRequest) => Promise<InfoResponse>` | Updates the user's information |
| accessToken | `string \| null` | The current access token |
| refreshToken | `string \| null` | The current refresh token |
| setApiBaseUrl | `(url: string) => void` | Sets the base URL for API requests |

## Usage

### Registration

To register a new user:

```typescript
const { register } = useAuth();

try {
  await register({ email: 'newuser@example.com', password: 'securePassword123' });
  console.log('Registration successful');
} catch (error) {
  console.error('Registration failed', error);
}
```

### Login

To log in a user:

```typescript
const { login } = useAuth();

try {
  await login({ email: 'user@example.com', password: 'password123' });
  console.log('Login successful');
} catch (error) {
  console.error('Login failed', error);
}
```

### Two-Factor Authentication

To manage two-factor authentication:

```typescript
const { manageTwoFactor } = useAuth();

try {
  const result = await manageTwoFactor({ 
    enable: true, 
    twoFactorCode: '123456' 
  });
  console.log('Two-factor authentication updated', result);
} catch (error) {
  console.error('Failed to update two-factor authentication', error);
}
```

## TypeScript Interfaces

The package exports several TypeScript interfaces for type-safe usage:

- `RegisterRequest`
- `LoginRequest`
- `RefreshRequest`
- `ResendConfirmationEmailRequest`
- `ForgotPasswordRequest`
- `ResetPasswordRequest`
- `TwoFactorRequest`
- `InfoRequest`
- `AccessTokenResponse`
- `InfoResponse`

Import these as needed for type checking:

```typescript
import { LoginRequest, AccessTokenResponse } from '@svene/basic-oauth2';
```

## Error Handling

This doesn't handle errors internally. Wrap API calls in try-catch blocks and handle errors appropriately in your application:

```typescript
try {
  await login({ email: 'user@example.com', password: 'password123' });
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      console.error('Invalid credentials');
    } else {
      console.error('An error occurred:', error.message);
    }
  } else {
    console.error('An unexpected error occurred');
  }
}
```

## Caveats and Limitations

- **API Structure.** It is designed with a specific API structure in mind based on the default .NET Identity EntityFrameworkCore setup. You may need to customize it for other API structures.

- **Error handling.** It is quite minimal, so there is a need to implement more robust error handling.

- **State management.** It relies on React's useState. In more complex applications, you might want to integrate a state management library like Redux to handle state more effectively.

- **Token Management.** It doesn't handle token expiration or automatic refresh robustly. You'll need to implement this logic yourself.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

That's all. 
