import { Player } from '../models';
import { Item } from 'semantic-ui-react';
import React from 'react';
import config from 'config';
import styled from 'styled-components';

const CardLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 5px;
  border: 1px solid rgba(34, 36, 38, 0.15);
  padding: 10px;
  margin-top: 10px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  float: left;
  margin-right: 10px;
  border-radius: 5px;
`;

const ImagePlaceholder = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 5px;
  background: #bbb;
`;

const TextPlaceholder = styled.div<{ width: number }>`
  width: ${props => `${props.width}px`};
  height: 1rem;
  background: #bbb;
`;

interface ImageWithFallback extends React.ImgHTMLAttributes<Element> {
  src: string;
  fallbackSrc: string;
}

const Details = styled.div`
  min-width: 180px;
`;

export interface PlayerCardProps {
  player: Player | null;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player
}: PlayerCardProps) => {
  return (
    <CardLayout>
      {player ? (
        <>
          <Image
            width="100"
            height="100"
            src={
              player.photo
                ? `${config.url}/${player.photo}`
                : 'empty-avatar.png'
            }
          />

          <Details>
            <Item.Header as="h3">{player.name}</Item.Header>
            <Item.Description>Level: {player.level}</Item.Description>
          </Details>
        </>
      ) : (
        <>
          <ImagePlaceholder />
          <div>
            <TextPlaceholder width={100} />
            <br />
            <TextPlaceholder width={50} />
          </div>
        </>
      )}
    </CardLayout>
  );
};

export default PlayerCard;
