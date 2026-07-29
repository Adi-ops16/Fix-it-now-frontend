import Image from 'next/image';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
    priority?: boolean;
}

const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    custom: '',
};

const Logo = ({ className = '', size = 'md', priority = false }: LogoProps) => {
    return (
        <div className={`relative shrink-0 ${sizeClasses[size]} ${className}`}>
            <Image
                src="/logo.png"
                alt="Fix-It Now Logo"
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                className="object-cover"
                loading='eager'
            />
        </div>
    );
};

export default Logo;