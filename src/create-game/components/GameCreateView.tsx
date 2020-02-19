import { Player, Teams, Game } from 'common/models';
import React from 'react';
import {
  Segment,
  Container,
  Grid,
  Button,
  Header,
  Form,
  Dropdown
} from 'semantic-ui-react';
import PlayerCard from 'common/components/PlayerCard';
import styled from 'styled-components';

const ValidationMessage = styled.div`
  color: #db2828;
`;

export interface GameCreateViewProps {
  onSelect: (id: number) => void;
  players: Player[];
  onAdd: (team: Teams) => void;
  onSave: () => void;
  onClear: () => void;
  game: Game;
  isGameValid: boolean;
}

export const GameCreateView: React.FC<GameCreateViewProps> = ({
  onSelect,
  players,
  onAdd,
  onSave,
  onClear,
  game,
  isGameValid
}: GameCreateViewProps) => {
  const searchOptions = players.map(p => ({
    key: p.id,
    text: p.name,
    value: p.id
  }));

  return (
    <Container>
      <Segment vertical clearing>
        <Header as="h1">Create game</Header>
        <Form.Group>
          <Dropdown
            onChange={(e, { value }) => onSelect(value as number)}
            options={searchOptions}
            placeholder="Invite Player"
            search
            selection
          />
          <Button.Group>
            <Button color="blue" onClick={() => onAdd(Teams.TEAM_A)}>
              Add to Team A
            </Button>
            <Button color="green" onClick={() => onAdd(Teams.TEAM_B)}>
              Add to Team B
            </Button>
          </Button.Group>
          <Button floated="right" color="red" onClick={() => onClear()}>
            Clear
          </Button>
        </Form.Group>
      </Segment>
      <Segment vertical>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Header as="h3" color="blue">
                Team A
              </Header>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Header as="h3" color="green">
                Team B
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <PlayerCard player={game[Teams.TEAM_A][0]?.player ?? null} />
            </Grid.Column>

            <Grid.Column>
              <PlayerCard player={game[Teams.TEAM_B][0]?.player ?? null} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <PlayerCard player={game[Teams.TEAM_A][1]?.player ?? null} />
            </Grid.Column>

            <Grid.Column>
              <PlayerCard player={game[Teams.TEAM_B][1]?.player ?? null} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment vertical textAlign="center">
        <Button disabled={!isGameValid} primary onClick={() => onSave()}>
          Save
        </Button>
        {!isGameValid && (
          <ValidationMessage>Teams are incomplete!</ValidationMessage>
        )}
      </Segment>
    </Container>
  );
};
