import { Card } from "@material-ui/core";
import React, { CSSProperties, FC, memo } from "react";
import { ConnectDragSource, DragSourceMonitor } from "react-dnd";
import { DragSource, DragSourceConnector } from "react-dnd";
import { THEME } from "../atoms/constants/ThemeMUI";


const style: CSSProperties = {
  minHeight: '2rem',
  minWidth: '100%',
  width: '40vh',
  color: THEME.palette.primary.main,
  textAlign: 'center',
  fontSize: '1.25rem',
  lineHeight: '2rem',
  flexDirection: 'row',
  wordWrap: 'break-word',
};

export interface BoxProps {
  name: string;
  type: string;
  isDropped: boolean;

  connectDragSource: ConnectDragSource;
  isDragging: boolean;
}

export const Box: FC<BoxProps> = memo(function Box({
  name,
  isDropped,
  isDragging,
  connectDragSource
}) {
  const opacity = isDropped ? 0.4 : 1;
  return connectDragSource(
    <div style={{marginTop:'4vh'}}>
      <Card  style={{...style, opacity}}>
      {name}
      </Card>
    </div>
  );
});

export default DragSource(
  (props: BoxProps) => props.type,
  {
    beginDrag: (props: BoxProps) => ({ name: props.name })
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Box);
