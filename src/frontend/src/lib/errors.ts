export function normalizeError(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    // Check for authorization errors
    if (error.message.includes('Unauthorized') || error.message.includes('trap')) {
      if (error.message.includes('Only authenticated users')) {
        return 'Please log in to access this feature.';
      }
      if (error.message.includes('Only candidates')) {
        return 'This action is only available to candidates.';
      }
      if (error.message.includes('Only employers')) {
        return 'This action is only available to employers.';
      }
      if (error.message.includes('Only admins')) {
        return 'This action requires admin privileges.';
      }
      if (error.message.includes('Can only')) {
        return 'You do not have permission to perform this action.';
      }
      return 'You do not have permission to perform this action.';
    }

    // Check for validation errors
    if (error.message.includes('already exists')) {
      return error.message;
    }
    if (error.message.includes('not found')) {
      return error.message;
    }

    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}
