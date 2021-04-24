import { Card } from '@material-ui/core';
import React, { CSSProperties, FC, memo } from 'react';
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import { THEME } from '../atoms/constants/ThemeMUI';

const style: CSSProperties = {
  minHeight: '2rem',
  width: '60vh',
  color: 'white',
  textAlign: 'center',
  fontSize: '1.25rem',
  lineHeight: '2rem',
  float: 'left',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  wordWrap: 'break-word',
};

export interface DustbinProps {
  accepts: string[];
  answer: string;
  lastDroppedItem?: any;
  onDrop: (item: any) => void;

  // Collected Props
  canDrop: boolean;
  isOver: boolean;
  connectDropTarget: ConnectDropTarget;
}

export const Dustbin: FC<DustbinProps> = memo(function Dustbin({ accepts, isOver, connectDropTarget, lastDroppedItem, answer }) {

  return connectDropTarget(
    <div ref={connectDropTarget} style={{ ...style }}>
      <Card style={{ padding: '5%', marginBottom: '5%'}}>
        <div style={{marginBottom: '%'}}>{answer}</div>
        { <Card style={{backgroundColor: THEME.palette.primary.main, color: THEME.palette.primary.contrastText, width:'40vh'}}>{lastDroppedItem? lastDroppedItem.name: ""}</Card>}
      </Card>
    </div>,
  );
});

export default DropTarget(
  (props: DustbinProps) => props.accepts,
  {
    drop(props: DustbinProps, monitor: DropTargetMonitor) {
      props.onDrop(monitor.getItem());
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(Dustbin);
