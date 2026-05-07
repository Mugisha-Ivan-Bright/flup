import React, { useState } from 'react';
import { useRegister } from '@refinedev/core';
import { useForm } from 'react-hook-form';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

interface SignUpFormProps {
    onSwitch: (screen: 'login' | 'signup' | 'forgot') => void;
}

interface SignUpFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitch }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const registerMutation = useRegister<{
        email: string;
        password: string;
        fullName: string;
    }>();
    const registerUser = registerMutation.mutate;
    const isLoading = (registerMutation as any).isLoading || false;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpFormData>();

    const password = watch('password');

    const onSubmit = (data: SignUpFormData) => {
        registerUser({
            email: data.email,
            password: data.password,
            fullName: data.fullName,
        });
    };

    return (
        <div className="auth-form">
            <div className="auth-header">
                <h1 className="auth-title">Create your account</h1>
                <p className="auth-subtitle">Join your team on Flup</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form-fields">
                <div className="form-field">
                    <label className="field-label">Full name</label>
                    <input
                        type="text"
                        {...register('fullName', {
                            required: 'Full name is required',
                        })}
                        className={`field-input ${errors.fullName ? 'error' : ''}`}
                        placeholder="John Appleseed"
                    />
                    {errors.fullName && <span className="field-error">{errors.fullName.message}</span>}
                </div>

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
                        placeholder="you@company.com"
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
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                            })}
                            className={`field-input ${errors.password ? 'error' : ''}`}
                            placeholder="Create a password"
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
                </div>

                <div className="form-field">
                    <label className="field-label">Confirm password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (value) =>
                                    value === password || 'Passwords do not match',
                            })}
                            className={`field-input ${errors.confirmPassword ? 'error' : ''}`}
                            placeholder="Repeat password"
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className="field-error">{errors.confirmPassword.message}</span>}
                </div>

                <button
                    type="submit"
                    className="auth-button primary"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="button-spinner" />
                    ) : (
                        'Create account'
                    )}
                </button>

                <div className="auth-footer">
                    <span className="footer-text">
                        Already have an account?{' '}
                        <button
                            type="button"
                            className="footer-link"
                            onClick={() => onSwitch('login')}
                        >
                            Sign in
                        </button>
                    </span>
                </div>

                <div className="auth-copyright">
                    ©2021 all rights reserved
                </div>
            </form>
        </div>
    );
};