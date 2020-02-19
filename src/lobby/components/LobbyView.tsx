import React from 'react';
import PlayerCard from 'common/components/PlayerCard';
import { Player } from 'common/models';
import {
  Grid,
  Dimmer,
  Loader,
  Segment,
  Container,
  Header,
  Button
} from 'semantic-ui-react';
import _ from 'lodash';

export interface LobbyViewProps {
  loading: boolean;
  players: Player[] | null;
  onCreate: () => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  loading,
  players,
  onCreate
}: LobbyViewProps) => {
  const rows = _.chunk(players, 2);

  return (
    <Container>
      <Segment vertical clearing>
        <Header floated="left" as="h1">
          Players
        </Header>
        <Button primary onClick={() => onCreate()} floated="right">
          Create
        </Button>
      </Segment>
      <Segment vertical>
        <Grid stackable columns={2}>
          {rows.map(row => (
            <Grid.Row key={`${row[0]?.id}_${row[1]?.id || ''}`}>
              {row.map(player => (
                <Grid.Column key={player.id}>
                  <PlayerCard player={player} />
                </Grid.Column>
              ))}
            </Grid.Row>
          ))}
        </Grid>
      </Segment>
      <Dimmer active={loading} page>
        <Loader />
      </Dimmer>
    </Container>
  );
};
