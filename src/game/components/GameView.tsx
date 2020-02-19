import { Teams, Game } from 'common/models';
import React from 'react';
import {
  Segment,
  Container,
  Grid,
  Button,
  Header,
  Input,
  InputOnChangeData,
  Dimmer
} from 'semantic-ui-react';
import PlayerCard from 'common/components/PlayerCard';
import styled from 'styled-components';

const ShortInput = styled(Input)`
  max-width: 60px;
  min-width: 60px;
  margin-top: 10px;
`;

export interface GameViewProps {
  onScoreChange: (team: Teams, idx: number, scores: number) => void;
  onSave: () => void;
  onReturnToCreate: () => void;
  winner: Teams | null;
  game: Game;
}

export const GameView: React.FC<GameViewProps> = ({
  onSave,
  onScoreChange,
  onReturnToCreate,
  game,
  winner
}: GameViewProps) => {
  return (
    <Container>
      <Segment vertical clearing>
        <Header as="h1">Game</Header>
      </Segment>
      <Segment vertical>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Header as="h3" color="blue">
                Team A
              </Header>
              {winner === Teams.TEAM_A && 'Won'}
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Header as="h3" color="green">
                Team B
              </Header>
              {winner === Teams.TEAM_B && 'Won'}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <PlayerCard player={game[Teams.TEAM_A][0]?.player ?? null} />
              <div>
                Goals Scored{' '}
                <ShortInput
                  type="number"
                  disabled={!game[Teams.TEAM_A][0]}
                  value={game[Teams.TEAM_A][0]?.score ?? 0}
                  min="0"
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                    { value }: InputOnChangeData
                  ) => onScoreChange(Teams.TEAM_A, 0, +value)}
                />
              </div>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <PlayerCard player={game[Teams.TEAM_B][0]?.player ?? null} />
              <div>
                Goals Scored{' '}
                <ShortInput
                  type="number"
                  disabled={!game[Teams.TEAM_B][0]}
                  value={game[Teams.TEAM_B][0]?.score ?? 0}
                  min="0"
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                    { value }: InputOnChangeData
                  ) => onScoreChange(Teams.TEAM_B, 0, +value)}
                />
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column textAlign="center">
              <PlayerCard player={game[Teams.TEAM_A][1]?.player ?? null} />
              <div>
                Goals Scored{' '}
                <ShortInput
                  type="number"
                  disabled={!game[Teams.TEAM_A][1]}
                  value={game[Teams.TEAM_A][1]?.score ?? 0}
                  min="0"
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                    { value }: InputOnChangeData
                  ) => onScoreChange(Teams.TEAM_A, 1, +value)}
                />
              </div>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <PlayerCard player={game[Teams.TEAM_B][1]?.player ?? null} />
              <div>
                Goals Scored{' '}
                <ShortInput
                  type="number"
                  disabled={!game[Teams.TEAM_B][1]}
                  value={game[Teams.TEAM_B][1]?.score ?? 0}
                  min="0"
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                    { value }: InputOnChangeData
                  ) => onScoreChange(Teams.TEAM_B, 1, +value)}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment vertical textAlign="center">
        <Button primary disabled={!game.id} onClick={() => onSave()}>
          Save
        </Button>
      </Segment>
      <Dimmer active={!game.id} page>
        <Header as="h2" inverted>
          No game available
        </Header>
        <Button onClick={() => onReturnToCreate()}>Create</Button>
      </Dimmer>
    </Container>
  );
};
