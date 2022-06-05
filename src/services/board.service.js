import { storageService } from './async-storage.service'
import getAverageColor from 'get-average-color'
import { httpService } from './http.service'
import { userService } from './user-service'
import { createApi } from 'unsplash-js'
let tommyImg = 'https://res.cloudinary.com/ddlztsqql/image/upload/v1654117856/tommyImg_fcp4fb.png'
let yotamImg = 'https://res.cloudinary.com/ddlztsqql/image/upload/v1654119142/yotamImg_mddok7.png'
let shaharImg = 'https://res.cloudinary.com/ddlztsqql/image/upload/v1654119196/shaharImg_qlkyzl.png'
let rotemImg = 'https://res.cloudinary.com/ddlztsqql/image/upload/v1654119219/rotemImg_src4ts.png'





const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    saveTask,
    addNewBoard,
    saveBox,
    getDefaultBgs,
    editBoardStyle,
    boxFilterByTaskAtt,
    toggleBoardStarred,
    getBoardColorTheme,
    editBoardTitle,
    editBoxes,
    getLabelById,
    getMemberById,
    addLabelToTask,
    getTaskById,
    findBoxByTaskId,
    editComment,
    removeComment,
    addComment,
    deleteTask,
    updateUserImgInBoards,
    addActivity,
    addBoardMember
}

async function getImgsFromUnsplash() {
    const unsplash = createApi({
        accessKey: 'sKw1zGI6ZkoC69QrYw38NLcezGA9lznBoBhk02lBHNA',
    })
    const imgs = await unsplash.photos.list(1, 1)
        .then(res => res.response.results.map(photo => {
            return photo.urls.raw
        }))
    return imgs
}

async function addLabelToTask(task, box, labelId, boardId) {
    let board = await getById(boardId)
    let currBox = board.boxes.find(currBox => currBox.id === box.id)
    let currTask = currBox.tasks.find(t => t.id === task.id)
    currTask.labelIds.push(labelId)

    return save(board)
}

async function addActivity(boardId, activity) {
    const board = await getById(boardId)
    const newBoard = { ...board, activities: [...board.activities, activity] }
    save(newBoard)
    return newBoard
}

async function saveBox(boardId, box) {
    return await httpService.put(`board/updateBox/${boardId}`, box)
}

async function editBoxes(boardId, boxes) {
    let board = await getById(boardId)
    boxes.map(box => {
        let currBoxIdx = board.boxes.findIndex(currBox => currBox.id === box.id)
        board.boxes[currBoxIdx] = box
    })
    return await httpService.put(`board/${boardId}`, board)
}

async function editTaskDesc(boardId, box, task, newDesc) {
    let board = await getById(boardId)
    let boxIdx = board.boxes.findIndex(currBox => currBox.id === box.id)
    let taskIdx = board.boxes[boxIdx].tasks.findIndex(currTask => currTask.id === task.id)
    board.boxes[boxIdx].tasks[taskIdx].description = newDesc
    return save(board)
}

async function editComment(boardId, boxId, task, comment) {
    const board = await getById(boardId)
    const boxIdx = board.boxes.findIndex(currBox => currBox.id === boxId)
    const taskIdx = board.boxes[boxIdx].tasks.findIndex(currTask => currTask.id === task.id)
    const commentIdx = board.boxes[boxIdx].tasks[taskIdx].comments.findIndex(currComment => currComment.id === comment.id)
    if (commentIdx === -1) return board
    board.boxes[boxIdx].tasks[taskIdx].comments[commentIdx].txt = comment.txt
    await save(board)
    return board.boxes[boxIdx].tasks[taskIdx]
}
async function deleteTask(boardId, boxId, taskId) {
    await httpService.delete(`board/${boardId}/${boxId}/${taskId}`)
    const newBoard = await getById(boardId)
    save(newBoard)
}

async function saveTask(boardId, task, boxId) {
    const newBoard = await httpService.put(`board/updateTask/${boardId}/${boxId}`, task)
    return save(newBoard)
}



async function query() {
    return await httpService.get('board/')
    // console.log(boards)
    // const boards = await storageService.query(STORAGE_KEY)
    // return boards
}

async function getById(boardId) {
    return await httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    await httpService.delete(`board/${boardId}`)
}

async function addNewBoard(board) {
    let newBoard = _createBoard(board)
    // console.log(newBoard)
    return await httpService.post('board/', newBoard)
}

async function getDefaultBgs() {
    const image = await defaultBgs.image()
    const color = defaultBgs.color
    // console.log(image)
    return { image, color }
    // return defaultBgs
}

async function save(board) {
    var savedBoard
    if (board._id) {
        return await httpService.put(`board/${board._id}`, board)
    } else {
        // Later, owner is set by the backend
        return await httpService.post(`board/${board._id}`, board)
    }
}

async function addComment(boardId, boxId, task) {
    return await httpService.put(`board/updateTask/${boardId}/${boxId}`, task)
}

async function removeComment(boardId, box, task, comment) {
    task.comments = task.comments.filter(currComment => comment.id !== currComment.id)
    await httpService.put(`board/updateTask/${boardId}/${box.id}`, task)
    return task
}

function getLabelById(labelId, board) {
    return board.labels.find(label => label.id === labelId)
}

function getMemberById(memberId, board) {
    return board.members.find(member => member.id === memberId)
}

function _createBoard(userBoard) {
    const user = userService.getLoggedinUser()
    return ({

        "title": userBoard.title,
        "activities": [],
        "isStarred": false,
        "archivedAt": null,
        "createdAt": Date.now(),
        "createdBy": user||'',
        "style": userBoard.style,
        "labels": [
            {
                "id": "l107",
                "title": "Get team leaders approval ",
                "color": "#54E346"
            },
            {
                "id": "l101",
                "title": "Copy Request",
                "color": "#F5DD29"
            },
            {
                "id": "l103",
                "title": "Priority",
                "color": "#eb5a46"
            },
            {
                "id": "l102",
                "title": "One more step",
                "color": "orange"
            },
            {
                "id": "l104",
                "title": "Design Team",
                "color": "#c377e0"
            },
            {
                "id": "l105",
                "title": "Product Marketing",
                "color": "#0079bf"
            },
            {
                "id": "l106",
                "title": "Tredux Tip",
                "color": "#00c2e0"
            },
        ],
        "members": [user]
        ,
        "boxes": [],
    })
}

async function addBoardMember(member, boardId) {
    const board = await getById(boardId)
    const check = board.members.find(currMember => { if (currMember._id === member._id) return member })
    if (check) {
        const idx = board.members.findIndex(currMember => currMember._id === member._id)
        board.members.splice(idx, 1)
        return save(board)
    }
    board.members.push(member)
    return save(board)

}

async function editBoardStyle(boardId, field, change) {
    const board = await getById(boardId)
    board.style = {
        [field]: change
    }
    return save(board)
}

async function editBoardTitle(boardId, field, change) {
    let board = await getById(boardId)
    board = { ...board, [field]: change }
    return save(board)
}

async function toggleBoardStarred(boardId) {
    const board = await getById(boardId)
    board.isStarred = !board.isStarred
    return save(board)
}

async function boxFilterByTaskAtt(boxes, filter = {}) {
    const filteredBoxes = boxes.filter(box => {
        return box.tasks.some(task => {
            if (filter.value) {
                return task[filter.filterBy].includes(filter.value)
            } else return true
        })
    })
    return filteredBoxes
}

async function getTaskById(boardId, boxId, taskId) {
    const board = await getById(boardId)
    let currBox = board.boxes.find(currBox => currBox.id === boxId)
    return currBox.tasks.find(t => t.id === taskId)
}

async function findBoxByTaskId(boardId, taskId) {
    const board = await getById(boardId)
    let foundBox = null
    board.boxes.forEach((box) => {
        const task = box.tasks.find((task) => task.id === taskId)
        if (task) {
            foundBox = box
            return
        }
    })
    return foundBox
}

async function updateUserImgInBoards(user) {
    const boards = await query()
    boards.forEach(async board => {
        const memberIdx = board.members.findIndex(member => member.id === user._id)
        if (memberIdx === -1) return
        board.members[memberIdx].avatar = user.avatar
        await save(board)
    })
    return await query()
}
async function getBoardColorTheme(img, isColor = false) {

    const cleanUrl = img.substring(4, img.length - 1)
    const rgb = await getAverageColor(cleanUrl)
    const isDark = _isColorDark(rgb)

    return { rgb, isDark }
}

function _isColorDark({ r, b, g }) {
    const hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    )

    return (hsp < 127.5)
}


// localStorage.clear()

// TEST DATA
// storageService.post(STORAGE_KEY, BOARD)


const board = {

    "_id": "",
    "title": 'Project Management',
    "archivedAt": null,
    "createdAt": Date.now(),
    "createdBy": {},
    "labels": [
        {
            "id": "l107",
            "title": "Get team leaders approval ",
            "color": "#54E346"
        },
        {
            "id": "l101",
            "title": "Copy Request",
            "color": "#F5DD29"
        },
        {
            "id": "l103",
            "title": "Priority",
            "color": "#eb5a46"
        },
        {
            "id": "l102",
            "title": "One more step",
            "color": "orange"
        },
        {
            "id": "l104",
            "title": "Design Team",
            "color": "#c377e0"
        },
        {
            "id": "l105",
            "title": "Product Marketing",
            "color": "#0079bf"
        },
        {
            "id": "l106",
            "title": "Tredux Tip",
            "color": "#00c2e0"
        },
    ],
    "members": [
        { id: 'u101', userName: 'Rotem Spivak', fullname: 'Rotem Spivak', init: 'RS', avatar: '' },
        { id: 'u102', userName: 'Yotam Tsamir', fullname: 'Yotam Tsamir', init: 'YT', avatar: '' },
        { id: 'u103', fullname: 'Shahar Cohen', userName: 'Shahar Cohen', init: 'SC', avatar: '' },
        { fullname: 'Tommy Irmia', id: 'u104', userName: 'Tommy Irmia', init: 'TI', avatar: '' }
    ],
}

const defaultBgs = {
    image: getImgsFromUnsplash,
    // image: [
    //     "https://images.unsplash.com/photo-1653819305873-c3abd024d89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
    //     "https://images.unsplash.com/photo-1653641563300-742183619684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
    //     "https://images.unsplash.com/photo-1653592328269-09c14b3628f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
    //     "https://images.unsplash.com/photo-1653419831613-56ed2a1c8ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDV8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
    //     "https://images.unsplash.com/photo-1653450283266-c788c2ca4ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDZ8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
    //     "https://images.unsplash.com/photo-1653496905343-b1fc1277e3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDh8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
    //     "https://images.unsplash.com/photo-1652543549421-ea252bd209f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDd8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
    //     "https://images.unsplash.com/photo-1653216977227-fa2ae9547f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDEyfDMxNzA5OXx8fHx8Mnx8MTY1MzkzNjc2MA&ixlib=rb-1.2.1&q=80&w=2000",
    // ],
    color: [
        "rgb(0, 121, 191)",
        "rgb(210, 144, 52)",
        "rgb(81, 152, 57)",
        "rgb(176, 70, 50)",
        "rgb(137, 96, 158)",
        "rgb(205, 90, 145)",
        "rgb(75, 191, 107)",
        "rgb(0, 174, 204)",
        "rgb(131, 140, 145)",
        "#4500DD",
        "#A736D8",
        "#CE36D8",
        "#D836CC",
    ]
}

// console.log(defaultBgs)

// {
//     "id": "b101",
//     "title": "Project Resources",
//     "archivedAt": null,
//     "tasks": [
//         {
//             "id": "c101",
//             "title": "Project Teamwork Dream Work launch timeline",
//             "description": "Everything that should happen for the project to launch.",
//             "comments": [],
//             "date": [
//                 {"isComplete": ''}
//                 ],
//             "labels": [
//                 {
//                     "id": "l107",
//                     "title": "Get team leaders approval ",
//                     "color": "#54E346"
//                 },
//                 {
//                     "id": "l101",
//                     "title": "Copy Request",
//                     "color": "#F5DD29"
//                 },
//             ]
//         }

//     ],
// },
//     {
//         "id": "b102",
//         "title": "Questions For Next Meeting",
//         "archivedAt": null,
//         "date": [
//             {"isComplete": ''}
//             ],
//         "tasks": [{
//             "id": "c104",
//             "title": "Who is the best peron to fic my HTML snag?",
//             "status": "in-progress",
//             "description": "Issues with HTML, who are my best options?",
//             "date": [
//                 {"isComplete": ''}
//                 ],
//         "comments": [
//         {
//             "id": "ZdPnm",
//             "txt": "Check with Simon or Leo.F",
//             "createdAt": 1590999817436.0,
//             "byMember": {
//                 "_id": "u102",
//                 "fullname": "Yotam Tsamir",
//                 "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//             }
//         },

//         ],
//         "checklists": [
//             {
//                 "id": "YEhmF",
//                 "title": "Checklist",
//                 "comments": [],
//                 "description": "",
//                 "todos": [
//                     {
//                         "id": "212jX",
//                         "title": "To Do 1",
//                         "isDone": false
//                     }
//                 ]
//             }
//         ],
//         "memberIds": ["u101"],
//         "labels": [
//             {
//             "id": "l107",
//             "title": "Get team leaders approval ",
//             "color": "#54E346"
//             },
//             {
//                 "id": "l102",
//                 "title": "One more step",
//                 "color": "orange"
//             },

//         ],
//         "createdAt": 1590999730348,
//         "dueDate": 16156215211,
//         "byMember": {
//             "_id": "u101",
//             "username": "Rotem Spivak",
//             "fullname": "Rotem Spivak",
//             "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//         },
//         "style": {
//             "bgColor": "#26de81"
//         }
//     }]

// },
// {
//     "id": "b101",
//     "title": "Project Resources",
//     "archivedAt": null,
//     "tasks": [
//         {
//             "id": "c101",
//             "title": "Project Teamwork Dream Work launch timeline",
//             "description": "Everything that should happen for the project to launch.",
//             "comments": [],
//             "date": [
//                 {"isComplete": ''}
//                 ],
//         },
//         {
//             "id": "c102",
//             "title": "Project Management Basics",
//             "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/"",
//             "attachments": [],
//             "isDueDate": null,
//             "comments": [],
//             "date": [
//                 {"isComplete": ''}
//                 ],

//         },
//     ]
// }, {
//                 "id": "b102",
//                 "title": "Questios For Next Meeting",
//                 "archivedAt": null,
//                 "date": [
//                     {"isComplete": ''}
//                     ],
//                 "tasks": [{
//                     "id": "c104",
//                     "title": "Who is the best peron to fic my HTML snag?",
//                     "status": "in-progress",
//                     "description": "Issues with HTML, who are my best options?",
//                     "date": [
//                         {"isComplete": ''}
//                         ],
//                     "comments": [
//                     {
//                         "id": "ZdPnm",
//                         "txt": "Check with Simon or Leo.F",
//                         "createdAt": 1590999817436.0,
//                         "byMember": {
//                             "_id": "u102",
//                             "fullname": "Yotam Tsamir",
//                             "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                         }
//                     },

//                     ],
//                     "checklists": [
//                         {
//                             "id": "YEhmF",
//                             "title": "Checklist",
//                             "comments": [],
//                             "description": "",
//                             "todos": [
//                                 {
//                                     "id": "212jX",
//                                     "title": "To Do 1",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "memberIds": ["u101"],
//                     "labelIds": ["l101", "l102"],
//                     "createdAt": 1590999730348,
//                     "dueDate": 16156215211,
//                     "byMember": {
//                         "_id": "u101",
//                         "username": "Rotem Spivak",
//                         "fullname": "Rotem Spivak",
//                         "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                     },
//                     "style": {
//                         "bgColor": "#26de81"
//                     }
//                 }]
//             }
//         ],

// }

// localStorage.clear()

// TEST DATA
// storageService.post(STORAGE_KEY, BOARD)














