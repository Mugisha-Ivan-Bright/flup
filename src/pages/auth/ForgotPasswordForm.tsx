import React from 'react';
import { useForgotPassword } from '@refinedev/core';
import { useForm } from 'react-hook-form';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';

interface ForgotPasswordFormProps {
    onSwitch: (screen: 'login' | 'forgot') => void;
}

interface ForgotPasswordFormData {
    email: string;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitch }) => {
    const forgotPasswordMutation = useForgotPassword();
    const forgotPassword = forgotPasswordMutation.mutate;
    const isLoading = (forgotPasswordMutation as any).isLoading || false;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>();

    const onSubmit = (data: ForgotPasswordFormData) => {
        forgotPassword(data);
    };

    return (
        <div className="auth-form">
            <div className="auth-header">
                <div className="forgot-password-icon">
                    <MailOutlined />
                </div>
                <h1 className="auth-title">Reset your password</h1>
                <p className="auth-subtitle">We'll send a reset link to your email address</p>
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

                <button
                    type="submit"
                    className="auth-button primary"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="button-spinner" />
                    ) : (
                        'Send reset link'
                    )}
                </button>

                <div className="auth-footer">
                    <button
                        type="button"
                        className="back-to-login"
                        onClick={() => onSwitch('login')}
                    >
                        <ArrowLeftOutlined /> Back to login
                    </button>
                </div>

                <div className="auth-copyright">
                    ©2024 Flup Logistics. All rights reserved
                </div>
            </form>
        </div>
    );
};