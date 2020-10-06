import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { useSelector } from 'react-redux';

export default function DrillTimeline() {
    const drills = useSelector(state => state.data.session.drills)
    return (
        <Timeline>
            {drills.map((drill) => (
            <TimelineItem key={drill.drillId}>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
            <TimelineContent>{drill.name}</TimelineContent>
            </TimelineItem>
            )
            )}
            </Timeline>
    )
}