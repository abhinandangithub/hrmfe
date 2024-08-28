/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import IconButton from '@mui/material/IconButton'
import { MouseEvent } from 'react'

import Icon from '../icon'


const RowOptions = ({ id, row, tableAction }: { id: number | string, row?: any, tableAction: (e: any) => void }) => {
    // ** Hooks


    // ** State

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
        tableAction({ TYPE: 'EDIT', DATA: event, id, row })
    }
    // const handleRowOptionsClose = () => {
    //     console.log('close event')
    // }

    return (
        <>
            <IconButton size="small" onClick={handleRowOptionsClick}>
                <Icon icon="tabler:edit" fontSize={20} />
            </IconButton>
            {/* <IconButton size="small" onClick={handleRowOptionsClose}>
                <Icon icon="tabler:trash" fontSize={20} />
            </IconButton> */}
        </>
    )
}

export default RowOptions