import { storageService } from './async-storage.service'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    addTask,
    addNewBoard,
    addBox,
    getDefaultBgs,
    editTask,
    editBoardStyle,
    boxFilterByTaskAtt,
    toggleBoardStarred,

    editBoxes,
    addBox,
    editBox,
    // editTaskTitle,
    getLabelById,
    getMemberById,
    addLabelToTask,
    getTaskById,
    findBoxByTaskId,
    editComment,
    removeComment,
}



async function addLabelToTask(task, box, labelId, boardId) {
    let board = await getById(boardId)
    let currBox = board.boxes.find(currBox => currBox.id === box.id)
    let currTask = currBox.tasks.find(t => t.id === task.id)
    currTask.labelIds.push(labelId)
    return save(board)
}

function getLabelById(labelId, board) {
    return board.labels.find(label => label.id === labelId)
}
function getMemberById(memberId, board) {
    return board.members.find(member => member.id === memberId)
}


async function editBox(boardId, box) {
    let board = await getById(boardId)
    let currBoxIdx = board.boxes.findIndex(currBox => currBox.id === box.id)
    board.boxes[currBoxIdx] = box
    // currBox.title = newTitle
    return save(board)
}

async function editBoxes(boardId, boxes) {
    let board = await getById(boardId)
    boxes.map(box => {
        let currBoxIdx = board.boxes.findIndex(currBox => currBox.id === box.id)
        board.boxes[currBoxIdx] = box
    })
    // currBox.title = newTitle
    return save(board)
}

async function editTask(boardId, boxId, task) {
    let board = await getById(boardId)
    let currBox = board.boxes.find(currBox => currBox.id === boxId)
    let currTaskIdx = currBox.tasks.findIndex(currTask => currTask.id === task.id)
    currBox.tasks[currTaskIdx] = task
    return save(board)
}



async function editTaskDesc(boardId, box, task, newDesc) {
    let board = await getById(boardId)
    let boxIdx = board.boxes.findIndex(currBox => currBox.id === box.id)
    let taskIdx = board.boxes[boxIdx].tasks.findIndex(currTask => currTask.id === task.id)
    board.boxes[boxIdx].tasks[taskIdx].description = newDesc
    return save(board)
}

async function editComment(boardId, boxId, taskId, comment) {
    const board = await getById(boardId)
    const boxIdx = board.boxes.findIndex(currBox => currBox.id === boxId)
    const taskIdx = board.boxes[boxIdx].tasks.findIndex(currTask => currTask.id === taskId)
    const commentIdx = board.boxes[boxIdx].tasks[taskIdx].comments.findIndex(currComment => currComment.id === comment.id)
    if (commentIdx === -1) return board
    board.boxes[boxIdx].tasks[taskIdx].comments[commentIdx] = comment
    return save(board)
}


async function addBox(boardId, box) {
    let board = await getById(boardId)
    board.boxes.push(box)
    return save(board)
}

async function addTask(boardId, task, boxId) {
    let board = await getById(boardId)
    let box = board.boxes.find(box => box.id === boxId)
    box.tasks.push(task)
    return save(board)
}

async function query() {
    const boards = await storageService.query(STORAGE_KEY)
    return boards
}

async function getStarredBoards(boards) {

    boards = boards.filter(board => {
        if (board.isStarred) return board
    })
    console.log(boards)
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
    // return axios.get(`/api/car/${carId}`)
}
async function removeComment(boardId, boxId, taskId, commentId) {
    const board = await getById(boardId)
    const boxIdx = board.boxes.findIndex(box => boxId === box.id)
    const box = board.boxes[boxIdx]
    const taskIdx = box.tasks.findIndex(task => taskId === task.id)
    const task = box.tasks[taskIdx]
    const commentIdx = task.comments.findIndex(comment => comment.id === commentId)
    task.comments.splice(commentIdx, 1)
    board.boxes[boxIdx].tasks[taskIdx] = task
    return save(board)

}
async function remove(boardId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    await storageService.remove(STORAGE_KEY, boardId)
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }

    return savedBoard
}

async function addNewBoard(board) {
    let newBoard = _createBoard(board)
    return save(newBoard)
}

function getDefaultBgs() {
    return defaultBgs
}


function _createBoard(userBoard) {
    return {
        "_id": "",
        "title": userBoard.title,
        "isStarred": false,
        "archivedAt": null,
        "createdAt": Date.now(),
        "createdBy": {},
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
        "members": [{ id: 'u101', userName: 'Rotem Spivak', fullname: 'Rotem Spivak', init: 'RS' }, { id: 'u102', userName: 'Yotam Tsamir', fullname: 'Yotam Tsamir', init: 'YT' }, { fullname: 'Shachar Cohen', id: 'u103', userName: 'Shachar Cohen', init: 'SC' }, { fullname: 'Tommy Irmia', id: 'u104', userName: 'Tommy Irmia', init: 'TI' }],
        "boxes": []

    }
}
const defaultBgs = {
    image: [
        "https://images.unsplash.com/photo-1653819305873-c3abd024d89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
        "https://images.unsplash.com/photo-1653641563300-742183619684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
        "https://images.unsplash.com/photo-1653592328269-09c14b3628f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
        "https://images.unsplash.com/photo-1653419831613-56ed2a1c8ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDV8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
        "https://images.unsplash.com/photo-1653450283266-c788c2ca4ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDZ8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
        "https://images.unsplash.com/photo-1653496905343-b1fc1277e3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDh8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
        "https://images.unsplash.com/photo-1652543549421-ea252bd209f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDd8MzE3MDk5fHx8fHwyfHwxNjUzOTM2NzYw&ixlib=rb-1.2.1&q=80&w=2000",
        "https://images.unsplash.com/photo-1653216977227-fa2ae9547f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDEyfDMxNzA5OXx8fHx8Mnx8MTY1MzkzNjc2MA&ixlib=rb-1.2.1&q=80&w=2000",
    ],
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


async function editBoardStyle(boardId, field, change) {
    const board = await getById(boardId)
    board.style = {
        [field]: change
    }
    return save(board)
}

async function toggleBoardStarred(boardId) {
    const board = await getById(boardId)
    board.isStarred = !board.isStarred
    return save(board)
}

// async function addBox(boardId, box) {
async function editBoxTitle(boardId, box, newTitle) {
    let board = await getById(boardId)
    let currBox = board.boxes.find(currBox => currBox.id === box.id)
    currBox.title = newTitle

    // console.log(box.title)
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


// localStorage.clear()

// TEST DATA
// storageService.post(STORAGE_KEY, BOARD)


const board = {
    "_id": "b1000",
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
    "members": [{ userName: 'Rotem Spivak', init: 'RS' }, { userName: 'Yotam Tsamir', init: 'YT' }, { userName: 'Shachar Cohen', init: 'SC' }, { userName: 'Tommy Irmia', init: 'TI' }],
    "boxes": [
        {
            "id": "b101",
            "title": "Project Resources",
            "archivedAt": null,
            "tasks": [
                {
                    "id": "c101",
                    "title": "Project Teamwork Dream Work launch timeline",
                    "description": "Everything that should happen for the project to launch.",
                    "comments": [],
                    "date": [
                        { "isComplete": '' }
                    ],
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
                    ]
                }

            ],
        },
        {
            "id": "b102",
            "title": "Questions For Next Meeting",
            "archivedAt": null,
            "date": [
                { "isComplete": '' }
            ],
            "tasks": [{
                "id": "c104",
                "title": "Who is the best peron to fic my HTML snag?",
                "status": "in-progress",
                "description": "Issues with HTML, who are my best options?",
                "date": [
                    { "isComplete": '' }
                ],
                "comments": [
                    {
                        "id": "ZdPnm",
                        "txt": "Check with Simon or Leo.F",
                        "createdAt": 1590999817436.0,
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Yotam Tsamir",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    },

                ],
                "checklists": [
                    {
                        "id": "YEhmF",
                        "title": "Checklist",
                        "comments": [],
                        "description": "",
                        "todos": [
                            {
                                "id": "212jX",
                                "title": "To Do 1",
                                "isDone": false
                            }
                        ]
                    }
                ],
                "memberIds": ["u101"],
                "labels": [
                    {
                        "id": "l107",
                        "title": "Get team leaders approval ",
                        "color": "#54E346"
                    },
                    {
                        "id": "l102",
                        "title": "One more step",
                        "color": "orange"
                    },

                ],
                "createdAt": 1590999730348,
                "dueDate": 16156215211,
                "byMember": {
                    "_id": "u101",
                    "username": "Rotem Spivak",
                    "fullname": "Rotem Spivak",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                },
                "style": {
                    "bgColor": "#26de81"
                }
            }]

        },
        {
            "id": "b101",
            "title": "Project Resources",
            "archivedAt": null,
            "tasks": [
                {
                    "id": "c101",
                    "title": "Project Teamwork Dream Work launch timeline",
                    "description": "Everything that should happen for the project to launch.",
                    "comments": [],
                    "date": [
                        { "isComplete": '' }
                    ],
                },
                {
                    "id": "c102",
                    "title": "Project Management Basics",
                    "imageUrl": "data:image/jpeg;base64,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",
                    "attachments": [],
                    "isDueDate": null,
                    "comments": [],
                    "date": [
                        { "isComplete": '' }
                    ],

                },
            ]
        }, {
            "id": "b102",
            "title": "Questios For Next Meeting",
            "archivedAt": null,
            "date": [
                { "isComplete": '' }
            ],
            "tasks": [{
                "id": "c104",
                "title": "Who is the best peron to fic my HTML snag?",
                "status": "in-progress",
                "description": "Issues with HTML, who are my best options?",
                "date": [
                    { "isComplete": '' }
                ],
                "comments": [
                    {
                        "id": "ZdPnm",
                        "txt": "Check with Simon or Leo.F",
                        "createdAt": 1590999817436.0,
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Yotam Tsamir",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    },

                ],
                "checklists": [
                    {
                        "id": "YEhmF",
                        "title": "Checklist",
                        "comments": [],
                        "description": "",
                        "todos": [
                            {
                                "id": "212jX",
                                "title": "To Do 1",
                                "isDone": false
                            }
                        ]
                    }
                ],
                "memberIds": ["u101"],
                "labelIds": ["l101", "l102"],
                "createdAt": 1590999730348,
                "dueDate": 16156215211,
                "byMember": {
                    "_id": "u101",
                    "username": "Rotem Spivak",
                    "fullname": "Rotem Spivak",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                },
                "style": {
                    "bgColor": "#26de81"
                }
            }]
        }
    ],

}











