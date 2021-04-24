import { CSSProperties, FC, memo } from 'react'
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { DropTarget } from 'react-dnd'

const style: CSSProperties = {
  height: '2vh',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}

export interface DustbinProps {
  accepts: string[]
  answer:string
  lastDroppedItem?: any
  onDrop: (item: any) => void

  // Collected Props
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

export const Dustbin: FC<DustbinProps> = memo(function Dustbin({
  accepts,
  isOver,
  connectDropTarget,
  lastDroppedItem,
  answer
}) {
  const isActive = isOver

  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } 

  return connectDropTarget(
    <div
          ref={connectDropTarget}
      style={{ ...style, backgroundColor}}
    > {answer}
      {lastDroppedItem && (
        <div>{lastDroppedItem.name}</div>
      )}
    </div>,
  )
})

export default DropTarget(
  (props: DustbinProps) => props.accepts,
  {
    drop(props: DustbinProps, monitor: DropTargetMonitor) {
      props.onDrop(monitor.getItem())
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(Dustbin)
