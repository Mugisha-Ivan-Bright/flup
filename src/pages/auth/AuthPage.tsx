import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { FlupLogo } from '../../components/FlupLogo';
import { AuthIllustration } from '../../components/AuthIllustration';
import './auth.css';

type AuthScreen = 'login' | 'forgot';

export const AuthPage: React.FC = () => {
    const [screen, setScreen] = useState<AuthScreen>('login');
    const [direction, setDirection] = useState<1 | -1>(1);

    const switchScreen = (newScreen: AuthScreen) => {
        if (newScreen === screen) return;

        // Determine direction based on navigation flow
        if (screen === 'login' && newScreen === 'forgot') {
            setDirection(1); // forward (entering from right)
        } else if (screen === 'forgot' && newScreen === 'login') {
            setDirection(-1); // backward (entering from left)
        } else {
            setDirection(1); // default forward
        }

        setScreen(newScreen);
    };

    const variants = {
        enter: (dir: number) => ({
            rotateY: dir * 90,
            opacity: 0,
            x: dir * 60,
        }),
        center: {
            rotateY: 0,
            opacity: 1,
            x: 0,
        },
        exit: (dir: number) => ({
            rotateY: dir * -90,
            opacity: 0,
            x: dir * -60,
        }),
    };

    const renderForm = () => {
        switch (screen) {
            case 'login':
                return <LoginForm onSwitch={switchScreen} />;
            case 'forgot':
                return <ForgotPasswordForm onSwitch={switchScreen} />;
            default:
                return <LoginForm onSwitch={switchScreen} />;
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Left Panel - Static */}
                <div className="auth-left-panel">
                    <FlupLogo />
                    <div className="auth-headline">
                        <div className="headline-line-1">Streamline Your</div>
                        <div className="headline-line-2">
                            Furniture <span className="highlight">Logistics</span>
                        </div>
                    </div>
                    <AuthIllustration />
                </div>

                {/* Right Panel - Animated */}
                <div className="auth-right-panel">
                    <div className="auth-form-container">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={screen}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    duration: screen === 'login' ? 0.4 : 0.35,
                                    ease: screen === 'login' ? [0.0, 0, 0.2, 1] : [0.4, 0, 0.2, 1],
                                    delay: screen === 'login' ? 0.15 : 0,
                                }}
                                style={{
                                    transformOrigin: 'center center',
                                    backfaceVisibility: 'hidden',
                                }}
                                className="auth-form-wrapper"
                            >
                                {renderForm()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};