import React from 'react';

export interface DataWrapperProps<T> {
  children: React.ReactNode | ((data: T) => React.ReactNode);
  data?: T | null | undefined;
  isLoading: boolean;
  error: Error | null;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode | ((error: Error) => React.ReactNode);
  noDataComponent?: React.ReactNode;
}

/**
 * DataWrapper - A component that handles loading, error, and empty states
 *
 * This ensures that child components only render when data exists,
 * eliminating the need for null checks in child components.
 *
 * @example
 * ```tsx
 * // Basic usage
 *
 * // With render prop pattern
 * <DataWrapper data={userData} isLoading={loading} error={error}>
 *   {(user) => <UserProfile user={user} />}
 * </DataWrapper>
 *
 * // With custom loading/error components
 * <DataWrapper
 *   data={userData}
 *   isLoading={loading}
 *   error={error}
 *   loadingComponent={<Spinner />}
 *   errorComponent={(err) => <CustomError error={err} />}
 * >
 *   <UserProfile user={userData} />
 * </DataWrapper>
 * ```
 */
export function DataWrapper<T>({
  children,
  isLoading,
  data,
  error,
  loadingComponent,
  errorComponent,
  noDataComponent,
}: DataWrapperProps<T>) {
  if (isLoading) {
    return (
      loadingComponent || (
        <div className='flex items-center justify-center p-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
          <span className='ml-2'>Loading...</span>
        </div>
      )
    );
  }

  if (error) {
    return typeof errorComponent === 'function'
      ? errorComponent(error)
      : errorComponent || (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
            <strong>Error:</strong> {error.message}
          </div>
        );
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      noDataComponent || (
        <div className='text-gray-500 text-center p-8'>
          <p>No data available</p>
        </div>
      )
    );
  }

  // Data exists - children can safely access it without null checks
  return typeof children === 'function' ? children(data) : children;
}

// Specialized wrapper for arrays
export function ArrayDataWrapper<T>({
  children,
  data,
  isLoading,
  error,
  emptyMessage = 'No items found',
  ...props
}: Omit<DataWrapperProps<T[]>, 'noDataComponent'> & {
  emptyMessage?: string;
}) {
  return (
    <DataWrapper
      data={data}
      isLoading={isLoading}
      error={error}
      noDataComponent={
        <div className='text-gray-500 text-center p-8'>
          <p>{emptyMessage}</p>
        </div>
      }
      {...props}
    >
      {children}
    </DataWrapper>
  );
}

// Hook for consistent data wrapper patterns
export function useDataWrapper<T>(
  data: T | null | undefined,
  isLoading: boolean,
  error: Error | null
) {
  return {
    data,
    isLoading,
    error,
    hasData: !isLoading && !error && data != null,
    isEmpty: !isLoading && !error && data == null,
  };
}
