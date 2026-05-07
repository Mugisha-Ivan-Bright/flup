import React, { useState } from 'react';
import { useLogin } from '@refinedev/core';
import { useForm } from 'react-hook-form';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

interface LoginFormProps {
    onSwitch: (screen: 'login' | 'forgot') => void;
}

interface LoginFormData {
    email: string;
    password: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useLogin();
    const login = loginMutation.mutate;
    const isLoading = (loginMutation as any).isLoading || false;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: 'admin@flup.com',
            password: 'flup2024',
        },
    });

    const onSubmit = (data: LoginFormData) => {
        login(data);
    };

    return (
        <div className="auth-form">
            <div className="auth-header">
                <h1 className="auth-title">Welcome to Flup</h1>
                <p className="auth-subtitle">Furniture Logistics Management Platform</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form-fields">
                <div className="form-field">
                    <label className="field-label">Email address</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Please enter a valid email',
                            },
                        })}
                        className={`field-input ${errors.email ? 'error' : ''}`}
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className="field-error">{errors.email.message}</span>}
                </div>

                <div className="form-field">
                    <label className="field-label">Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className={`field-input ${errors.password ? 'error' : ''}`}
                            placeholder="Enter password"
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </button>
                    </div>
                    {errors.password && <span className="field-error">{errors.password.message}</span>}
                    <button
                        type="button"
                        className="forgot-password-link"
                        onClick={() => onSwitch('forgot')}
                    >
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit"
                    className="auth-button primary"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="button-spinner" />
                    ) : (
                        'Sign In'
                    )}
                </button>

                <div className="auth-footer">
                    <span className="demo-credentials">
                        Demo credentials: admin@flup.com / flup2024
                    </span>
                </div>

                <div className="auth-copyright">
                    ©2026 Flup Logistics. All rights reserved
                </div>
            </form>
        </div>
    );
};