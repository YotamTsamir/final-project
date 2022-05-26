const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        // const criteria = {}
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    console.log('toyId, controller:',toyId)
    
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        console.log('toyId, controller:',toyId)
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        console.log('toyyyyyyyyyyyyyyyyyyyyyyyy:',toy)
        
        const collection = await dbService.getCollection('toy')
        const addedToy = await collection.insertOne(toy)
        return addedToy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}
async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: id }, { $set: { ...toy } })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

// function _buildCriteria(filterBy) {
function _buildCriteria(queryParams) {
    //////
    const filterBy = {
        txt: queryParams.txt || '',
        minPrice: queryParams.minPrice || 0,
        maxPrice: queryParams.maxPrice || 9999,
        inStock: queryParams.inStock || 'all',
        labels: queryParams.labels || '',
        // pageIdx: queryParams.pageIdx || 0,
    }
    /////

    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                name: txtCriteria,
            },
            {
                description: txtCriteria,
            },
        ]
    }
    const minPrice = filterBy.minPrice ? +filterBy.minPrice : 0
    const maxPrice = filterBy.maxPrice > 1 ? +filterBy.maxPrice : Infinity
    criteria.$and = [
        {
            price: { $gte: minPrice },
        },
        {
            price: { $lte: maxPrice },
        },
    ]
    
    if(!filterBy.labels) return criteria
    const labels = filterBy.labels.split(',')
    criteria.$and = [...criteria.$and, {labels:{$in:labels}}]
    return criteria
}
// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.txt) {
//         const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
//         criteria.$or = [
//             {
//                 username: txtCriteria
//             },
//             {
//                 fullname: txtCriteria
//             }
//         ]
//     }
//     if (filterBy.minBalance) {
//         criteria.balance = { $gte: filterBy.minBalance }
//     }
//     return criteria
// }

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}
