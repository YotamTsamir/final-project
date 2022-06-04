import moment from 'moment'

export const TimeAgo = (timestamp) => {

    const timeAgo = moment(timestamp).fromNow()
    return  timeAgo
}




