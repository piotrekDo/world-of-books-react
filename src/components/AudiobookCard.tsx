import { type } from "@testing-library/user-event/dist/type";
import { AudiobookModel } from "../model/AudiobookModel";

type AudiobookCardProps = {
    audiobook: AudiobookModel;
}

const AudiobookCard: React.FC<AudiobookCardProps> = (props) => {
  return <div>{props.audiobook.name}</div>;
};

export default AudiobookCard;
