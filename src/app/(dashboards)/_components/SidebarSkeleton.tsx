import React from 'react';

const SideBarSkeleton = () => {
    return (
        <div className="space-y-2 p-2">
            <div className="h-8 w-full animate-pulse rounded bg-sidebar-accent/50" />
            <div className="h-8 w-full animate-pulse rounded bg-sidebar-accent/50" />
        </div>
    );
};

export default SideBarSkeleton;