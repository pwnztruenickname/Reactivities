import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, ItemGroup, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { format } from 'date-fns'
import ActivityListItemAttendees from './ActivityListItemAttendees'

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    const host = activity.attendees.filter(x => x.isHost)[0]
    return (
        <Segment.Group>
            <Segment>
                <ItemGroup>
                    <Item>
                        <Item.Image size='tiny' circular src={host.image || '/assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                            <Item.Description>Hosted by {host.displayName}</Item.Description>
                            {activity.isHost &&
                            <Item.Description>
                                <Label
                                    basic
                                    color='orange'
                                    content='You are hosting this activity' />
                            </Item.Description>}
                            {activity.isGoing && !activity.isHost &&
                            <Item.Description>
                                <Label
                                    basic
                                    color='green'
                                    content='You are going to this activity' />
                            </Item.Description>}
                        </Item.Content>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <Icon name='clock' /> {format(activity.date, 'h:mm a')}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendees attendees={activity.attendees} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link} to={`/activities/${activity.id}`}
                    floated='right'
                    content='view'
                    color='blue' />

            </Segment>
        </Segment.Group>

    )
}

export default ActivityListItem