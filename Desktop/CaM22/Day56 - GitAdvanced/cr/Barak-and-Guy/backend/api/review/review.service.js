const dbService = require('../../services/db.service')
const userService = require('../user/user.service')
const toyService = require('../toy/toy.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const criteria = {}

        const collection = await dbService.getCollection('review')

        // const reviews = await collection.find(criteria).toArray()
        // console.log('reviews:',reviews)

        // var test = await collection.find().toArray()

        var reviews = await collection
            .aggregate([
                {
                    $match: criteria,
                },
                {
                    $lookup: {
                        // localField: 'byUserId',
                        localField: 'userId',
                        from: 'user',
                        foreignField: '_id',
                        as: 'byUser',
                    },
                },
                {
                    $unwind: '$byUser',
                },
                {
                    $lookup: {
                        // localField: 'aboutUserId',
                        localField: 'toyId',
                        from: 'toy',
                        foreignField: '_id',
                        as: 'aboutToy',
                    },
                },
                {
                    $unwind: '$aboutToy',
                },
            ])
            .toArray()
    

        // reviews = reviews.map(review => {
        //     review.byUser = { _id: review.byUser._id, fullname: review.byUser.fullname }
        //     review.aboutUser = { _id: review.aboutUser._id, fullname: review.aboutUser.fullname }
        //     delete review.byUserId
        //     delete review.aboutUserId
        //     return review
        // })
        // console.log('reviews:', reviews)
        reviews.map((review) =>{
            delete review.byUser._id
            delete review.byUser.username
            delete review.byUser.password
            delete review.byUser.isAdmin
            delete review.byUser.score
            delete review.aboutToy._id
        })
        // delete toy._id
        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }
}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!loggedinUser.isAdmin)
            criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}

async function add(review) {
    try {
        const reviewToAdd = {
            userId: ObjectId(review.userId),
            toyId: ObjectId(review.toyId),
            content: review.content,
            rate: review.rate,
        }

        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        
        // console.log('testttttttttttttttttttttttttttttt')        
        // console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu:',userService.getById(review.userId))        
        // OREN HELP US!!!
        // console.log('review.......... (review service:add:', reviewToAdd)
        // reviewToAdd.byUser = userService.getById(review.userId)
        // console.log('byUser:',reviewToAdd.byUser)        
        // reviewToAdd.aboutToy = toyService.getById(review.toyId)
        // console.log('aboutToy:',reviewToAdd.aboutToy)
        // console.log('review.......... (review service:add:', reviewToAdd)

        return reviewToAdd
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

module.exports = {
    query,
    remove,
    add,
}
