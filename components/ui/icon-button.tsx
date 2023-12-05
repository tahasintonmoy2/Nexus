import React, {MouseEventHandler, useState, useEffect} from 'react'
import { cn } from '@/lib/utils'

interface IconButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
    icon: React.ReactElement;
    className?: string
}

const IconButton:React.FC<IconButtonProps> = ({
    onClick,
    icon,
    className
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=> {
      setIsMounted(true)
    },[]);

    if (!isMounted) {
        return null
    }

  return (
    <button
        onClick={onClick}
        className={cn(
            "rounded-full bg-white flex items-center justify-center border shadow-md p-2 hover:scale-110 transition",
            className
        )}
    >
        {icon}
    </button>
  )
}

export default IconButton