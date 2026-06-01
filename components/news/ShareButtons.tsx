'use client'

import React, { useEffect, useState } from 'react';
import { Facebook, Twitter, Send, Link2, Check, Share2 } from 'lucide-react';

interface ShareButtonsProps {
    title?: string;
}

const ShareButtons = ({ title = '' }: ShareButtonsProps) => {
    const [url, setUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [canNativeShare, setCanNativeShare] = useState(false);

    useEffect(() => {
        setUrl(window.location.href);
        setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
    }, []);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API unavailable — silently ignore
        }
    };

    const handleNativeShare = async () => {
        try {
            await navigator.share({ title, url });
        } catch {
            // User dismissed the share sheet — no action needed
        }
    };

    const links = [
        {
            label: 'Share on Facebook',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            Icon: Facebook,
        },
        {
            label: 'Share on X',
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            Icon: Twitter,
        },
        {
            label: 'Share on WhatsApp',
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            Icon: Send,
        },
    ];

    return (
        <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-gray-100">
            <span className="text-sm font-bold text-gray-900 mr-1">Share this article</span>

            {links.map(({ label, href, Icon }) => (
                <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex items-center justify-center w-10 h-10 border border-gray-200 text-gray-700 transition-colors duration-300 hover:bg-[#F47321] hover:border-[#F47321] hover:text-white"
                >
                    <Icon size={18} />
                </a>
            ))}

            <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy link"
                title={copied ? 'Link copied' : 'Copy link'}
                className="flex items-center justify-center w-10 h-10 border border-gray-200 text-gray-700 transition-colors duration-300 hover:bg-[#F47321] hover:border-[#F47321] hover:text-white"
            >
                {copied ? <Check size={18} className="text-green-600" /> : <Link2 size={18} />}
            </button>

            {canNativeShare && (
                <button
                    type="button"
                    onClick={handleNativeShare}
                    aria-label="Share"
                    title="Share"
                    className="flex items-center justify-center w-10 h-10 border border-gray-200 text-gray-700 transition-colors duration-300 hover:bg-[#F47321] hover:border-[#F47321] hover:text-white"
                >
                    <Share2 size={18} />
                </button>
            )}
        </div>
    );
};

export default ShareButtons;
