/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import IconButton from '@mui/material/IconButton'
import { MouseEvent } from 'react'

import Icon from '../../../Components/TableBoxGrid/icon'


const RowOptions = ({ id, row, tableAction }: { id: number | string, row?: any, tableAction: (e: any) => void }) => {
    // ** Hooks


    // ** State

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
        tableAction({ TYPE: 'EDIT', DATA: event, id, row })
    }
    const handleRowOptionsPassword = () => {
        tableAction({ TYPE: 'PASSWORD', id, row })
    }

    const handleRowOptionsInvite = () => {
        tableAction({ TYPE: 'INVITE', id, row })
    }

    return (
        <>
            <IconButton size="small" onClick={handleRowOptionsClick}>
                <Icon icon="tabler:edit" fontSize={20} />
            </IconButton>
            <IconButton size="small" onClick={handleRowOptionsPassword}>
                <Icon icon="ic:baseline-password" fontSize={20} />
            </IconButton>
            <IconButton size="small" onClick={handleRowOptionsInvite}>
                <Icon icon="ic:baseline-email" fontSize={20} />
            </IconButton>

        </>
    )
}

export default RowOptions