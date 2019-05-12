import React from 'react';
import { Loader, Button, Icon, Card, Image } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <Card.Content textAlign="center">
                        <Image src='http://semantic-ui.com/images/wireframe/image.png' size='mini' centered circular />
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>
                            <Icon name="map marker alternate"></Icon>
                            {city}{", "}{country}
                        </Card.Meta>
                        <Card.Description>
                            {skills}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div>
                            <Icon name="phone"></Icon>{":  "}{phone}
                        </div>
                        <div>
                            <Icon name="mail"></Icon>{":  "}{email}
                        </div>
                    </Card.Content>
                </Card>
            </React.Fragment>
        )
    }
}