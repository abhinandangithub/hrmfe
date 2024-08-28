/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import CustomAvatar from '../avatar/custom-avatar'
import {getInitials} from '../get-initials'


const RenderClient = (row: any) => {
    if (row.avatar?.length) {
        return <CustomAvatar src={row.avatar} sx={{mr: 2.5, width: 38, height: 38}}/>
    }
    return (
        <CustomAvatar
            skin="light"
            color={row.avatarColor}
            sx={{
                mr: 2.5,
                width: 38,
                height: 38,
                fontWeight: 500,
                fontSize: (theme) => theme.typography.body1.fontSize
            }}>
            {getInitials(row.clientName ? row.clientName : 'John Doe')}
        </CustomAvatar>
    )
}

export default RenderClient