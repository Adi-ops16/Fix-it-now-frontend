import React from 'react'
import { getOverview } from '../../_actions/manageUserActions';
import OverviewDashboard from '../../_components/OverviewDashboard';

export default async function OverViewPage() {
    const result = await getOverview()

    if (!result?.data) {
        return (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
                Loading overview metrics...
            </div>
        );
    }
    return <OverviewDashboard result={result} />
}
