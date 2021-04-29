import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, ItemGroup, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { format } from 'date-fns'

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    return (
        <Segment.Group>
            <Segment>
                <ItemGroup>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>

                            <Item.Description>
                                Hosted by Bob
                        </Item.Description>
                        </Item.Content>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <Icon name='clock' /> {format(activity.date, 'h:mm a')}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
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