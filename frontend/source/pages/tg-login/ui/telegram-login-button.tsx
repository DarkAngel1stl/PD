'use client';

import * as React from 'react';

export enum TLoginButtonSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export type TUser = Readonly<{
  auth_date: number;
  first_name: string;
  last_name?: string;
  hash: string;
  id: number;
  photo_url?: string;
  username?: string;
}>;

export type TelegramLoginButtonProps = Readonly<{
  botName: string;
  buttonSize: TLoginButtonSize;
  onAuthCallback?: (user: TUser) => void;
  redirectUrl?: string;
  cornerRadius?: number;
  requestAccess?: string;
}>;

export const TelegramLoginButton = (props: TelegramLoginButtonProps) => {
  const {
    botName,
    buttonSize,
    cornerRadius,
    requestAccess,
    onAuthCallback,
    redirectUrl,
  } = props;

  const _containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (onAuthCallback != null) {
      (window as any).TelegramOnAuthCb = (user: TUser) => onAuthCallback(user);
    }

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;

    script.setAttribute('data-telegram-login', botName);
    if (buttonSize != null) {
      script.setAttribute('data-size', buttonSize);
    }
    if (buttonSize != null) {
      script.setAttribute('data-radius', `${cornerRadius}`);
    }
    if (redirectUrl != null) {
      script.setAttribute('data-auth-url', redirectUrl);
    }
    if (onAuthCallback != null) {
      script.setAttribute('data-onauth', 'TelegramOnAuthCb(user)');
    }
    if (requestAccess != null) {
      script.setAttribute('data-request-access', requestAccess);
    }

    _containerRef.current!.appendChild(script);
  }, []);

  return <div className={`tlogin-button`} ref={_containerRef} />;
};
