import { CSSProperties, FC, memo } from "react";
import { ConnectDragSource, DragSourceMonitor } from "react-dnd";
import { DragSource, DragSourceConnector } from "react-dnd";

const style: CSSProperties = {
  height: '2vh',
  width: '6rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'black',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  border: `solid 1px black`,
  background: `white`

};

export interface BoxProps {
  name: string;
  type: string;
  isDropped: boolean;

  // Collected Props
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
    <div style={{ ...style, opacity}}>
      {name}
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
