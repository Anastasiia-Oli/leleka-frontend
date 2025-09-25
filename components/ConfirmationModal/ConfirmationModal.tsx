'use client'

import { useEffect } from 'react';
import css from './ConfirmationModal.module.css';
import Button from '../ui/Button';

interface ConfirmationModalProps {
    title: string;
    confirmButtonText: string;
    cancelButtonText: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
}

const ConfirmationModal = ({
    title,
    confirmButtonText = 'Так',
    cancelButtonText = 'Ні',
    onConfirm,
    onCancel,
    isOpen,
}:ConfirmationModalProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === 'Escape'){
                onCancel();
            }
        };
        if(isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <>
            <div className={css.modalBackdrop} onClick={onCancel}>
                <div className={css.modalWindow} onClick={(e) => e.stopPropagation()}>
                    <h2 className={css.modalTitle}>{title}</h2>
                    <div className={css.modalActions}>
                        <div onClick={onCancel}>
                            <Button
                                label={cancelButtonText}
                                style="primary"
                            />
                        </div>
                        <div onClick={onConfirm}>
                            <Button
                                label={confirmButtonText}
                                style="secondary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmationModal;