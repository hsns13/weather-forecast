import React, { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    componentDidCatch(error, errorInfo) {
        // log error to service
    }

    render() {
        if(this.state.hasError) {
            return <h1>Ooops!!!</h1>
        }

        return this.props.children;
    }
}