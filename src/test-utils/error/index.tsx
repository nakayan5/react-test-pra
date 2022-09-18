import React, { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

type TError = {
  hasError: boolean;
  error: Error;
};

export class ErrorBoundary extends React.Component<TProps, TError> {
  state = { hasError: false, error: new Error() };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div data-testid="error">{this.state.error.message}</div>;
    }

    return this.props.children;
  }
}
